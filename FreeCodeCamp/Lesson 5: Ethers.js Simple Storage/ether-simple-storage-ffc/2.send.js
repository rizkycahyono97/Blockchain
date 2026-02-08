import { ethers } from 'ethers';
import fs from 'fs';
import 'dotenv/config';

const artifact = JSON.parse(fs.readFileSync('./C.json', 'utf-8'));

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); //connect to local Ganache instance
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider); //connect wallet with private key

// deploy
async function deploy() {
  try {
    console.log('Deploying...');

    const factory = new ethers.ContractFactory(
      artifact.abi,
      artifact.byteCode,
      wallet
    );

    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const deploymentReceipt = await contract.deploymentTransaction().wait(1); // wait for 1 confirmation

    // ====================== //
    //  send transaction
    // ====================== //
    console.log('Mengirim transaksi...');
    const nonce = await wallet.getTransactionCount();
    const tx = {
      nonce: nonce,
      gasPrice: 200000000,
      gasLimit: 1000000,
      to: null,
      value: 0,
      data: '0xb85824f1294ee69d09df6574c7a60820f958c7e8634f4892bebeeb23c63436b7'
    };
    const sendTxResponse = await wallet.sendTransaction(tx);
    const transactionReceipt = await sendTxResponse.wait(1);
    console.log('transactionReceipt:', transactionReceipt);
  } catch (e) {
    console.error('Gagal karena:', e);
  }
}

deploy();
