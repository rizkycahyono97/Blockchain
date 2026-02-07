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

    console.log(`Berhasil! Alamat: ${contract.target}`);
    console.log(contract);
  } catch (e) {
    console.error('Gagal karena:', e);
  }
}

deploy();
