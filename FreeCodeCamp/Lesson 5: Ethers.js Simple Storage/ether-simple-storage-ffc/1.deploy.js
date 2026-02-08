import { ethers } from 'ethers';
import fs from 'fs';

const artifact = JSON.parse(fs.readFileSync('./C.json', 'utf-8'));

const provider = new ethers.JsonRpcProvider('http://0.0.0.0:7545'); //connect to local Ganache instance
const wallet = new ethers.Wallet(
  '0x196386a6c9b542e51b11d8a6e546bd9e6f7c26e045fdd72280923a05635d2a01',
  provider
); //connect wallet with private key

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
    //  show result from ABI
    // ====================== //
    // console.log(`Berhasil! Alamat: ${contract.target}`);
    // console.log(deploymentReceipt);

    // ====================== //
    //  send transaction
    // ====================== //
    // console.log('Mengirim transaksi...');
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //   nonce: nonce,
    //   gasPrice: 200000000,
    //   gasLimit: 1000000,
    //   to: null,
    //   value: 0,
    //   data: '0xb85824f1294ee69d09df6574c7a60820f958c7e8634f4892bebeeb23c63436b7'
    // };
    // const sendTxResponse = await wallet.sendTransaction(tx);
    // const transactionReceipt = await sendTxResponse.wait(1);
    // console.log('transactionReceipt:', transactionReceipt);
  } catch (e) {
    console.error('Gagal karena:', e);
  }
}

deploy();
