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
    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous  = self.chain[i -1]

            if current['hash_of_previous_block'] != previous['hash']:
                return False
            
            if not self.valid_proof(
                current['index'],
                current['hash_of_previous_block'],
                current['transactions'],
                current['nonce']
            ):
                return False
            
        return True

    
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

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(host='127.0.0.1', port=port, debug=True)