import sys
import hashlib
import json

from time import time
from uuid import uuid4

from flask import Flask, jsonify, request

import requests
from urllib.parse import urlparse

class Blockchain(object):
    difficulty_target = "0000"

    def hash_block(self, block):
        # supaya hash di current_block itu sendiri tidak di hash lagi
        block_copy = block.copy()
        block_copy.pop('hash', None)

        block_encoded = json.dumps(block_copy, sort_keys=True).encode()  # harus di json dump dahulu baru di encode baru bisa di hash
        return hashlib.sha256(block_encoded).hexdigest() #hexdigest merubah dari hash sha256 menjadi hex string

    # genesis block / block pertama
    def __init__(self):
        self.nodes = set() #tempat untuk nodes
        self.chain = []
        self.current_transactions = [] #mempool (jadi transaction baru tidak masuk ke current_block, tetapi mempool)

        genesis_block = {
            'index': 1,
            'timestamps': time(),
            'transactions': [],
            'nonce': 0,
            'hash_of_previous_block': "0"
        }

        genesis_block['hash'] = self.hash_block(genesis_block)

        self.chain.append(genesis_block)

    # fungsi untuk menambah node komputer lain
    def add_node(self, address):
        parse_url = urlparse(address)
        self.nodes.add(parse_url.netloc)
        print(parse_url.netloc)

    # POW disini, loop sampai nonce ketemu
    def proof_of_work(self, index, hash_of_previous_block, transactions):
        nonce = 0

        # nonce akan di looping terus sampai noncenya ketemu
        while self.valid_proof(index, hash_of_previous_block, transactions, nonce) is False:
            nonce += 1
        return nonce
    
    # aturan konsensus pow
    def valid_proof(self, index, hash_of_previous_block, transactions, nonce):
        content = f'{index}{hash_of_previous_block}{transactions}{nonce}'.encode()

        content_hash = hashlib.sha256(content).hexdigest()

        return content_hash[:len(self.difficulty_target)] == self.difficulty_target
    
    def append_block(self, nonce, hash_of_previous_block):
        block = {
            "index": len(self.chain) + 1,   #urutan block
            "timestamp": time(),
            "transaction": self.current_transactions,    #mempool
            "nonce": nonce,
            "hash_of_previous_block": hash_of_previous_block,
        }

        block['hash'] = self.hash_block(block)  # hash di block itu sendiri

        # reset block
        self.current_transactions = []

        self.chain.append(block)
        return block
    
    # validasi previous hash harus sama dengan hash
    def is_chain_valid(self, chain):
        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]

            if block['hash_of_previous_block'] != self.hash_block(last_block):
                return False

            if not self.valid_proof(
                current_index,
                block['hash_of_previous_block'],
                block['transaction'],
                block['nonce'],
            ):
                return False
        
            last_block = block
            current_index += 1

        return True
        
    
    def update_blockchain(self):
        neighbours = self.nodes
        new_chain = None

        max_length = len(self.chain)

        for node in neighbours:
            response  = requests.get(f'http://{node}/blockchain')

            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                if length > max_length and self.is_chain_valid(chain):
                    max_length = length
                    new_chain = chain

                if new_chain:
                    self.chain = new_chain
                    return True

        return False 

    
    # contoh untuk menambahkan transaction, hanya transaction bukan membuat block
    def add_transaction(self, sender, recipient, amount):
        self.current_transactions.append({
            'amount': amount,
            'recipient': recipient,
            'sender': sender
        })
        return self.last_block['index'] + 1 #transaction ditambahkan di last block
    
    @property
    def last_block(self):
        return self.chain[-1]
    

#################    
# API make flask
################
app = Flask(__name__)

node_identifier = str(uuid4()).replace('-', "")

# inisialisasi object class Blockchain
blockchain = Blockchain()

# GET semua block
@app.route('/blockchain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain)
    }
    
    return jsonify(response), 200

# nambang
@app.route('/mine', methods=['GET'])
def mine_block():
    # rewards karena sudah bisa menemukan block
    blockchain.add_transaction(
        sender="0",
        recipient=node_identifier,
        amount=1 #jumlah yang dikirim, misalkan 1 btc
    )

    last_block_hash = blockchain.last_block['hash']

    index = len(blockchain.chain)
    
    # baru nambang
    nonce = blockchain.proof_of_work(index, last_block_hash, blockchain.current_transactions)

    # kalau berhasil baru ditambahkan ke network block
    block = blockchain.append_block(nonce, last_block_hash)

    response = {
        'message': 'Blockchain berhasil di tambang',
        'index': block['index'],
        'hash_of_previous_block': block['hash_of_previous_block'],
        'hash': block['hash'],
        'nonce': block['nonce'],
        'transaction': block['transaction']
    }

    return jsonify(response), 200

# kirim transaction
@app.route('/transaction/new', methods=['POST'])
def new_transaction():
    values = request.get_json()

    required_fields = ['sender', 'recipient', 'amount']
    if not all(k in values for k in required_fields):
        return ('Missing Fields', 400)

    index = blockchain.add_transaction(
        values['sender'],
        values['recipient'],
        values['amount']
    )

    response = {'message': f'Transaksi akan ditambahkan di block: {index}'}

    return (jsonify(response), 201)

# menambahkan node ke network
@app.route('/nodes/add_nodes', methods=['POST'])
def add_node():
    values = request.get_json()
    nodes = values.get('nodes')

    if nodes is None:
        return "Error node is missinh", 400

    for node in nodes:
        blockchain.add_node(node)

    response = {
        'message': 'NOde baru telah ditambahkan',
        'nodes': list(blockchain.nodes)
    }

    return (jsonify(response), 201)

@app.route('/nodes/sync', methods=['GET'])
def sync():
    updated_node = blockchain.update_blockchain()

    if updated_node:
        response = {
            'message': 'NOde berhasil di sync',
            'blockchain': blockchain.chain
        }   
    else:
        response = {
            'message': 'Node sudah paling baru',
            'blockchain': blockchain.chain
        }

    return jsonify(response), 200


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(host='127.0.0.1', port=port, debug=True)