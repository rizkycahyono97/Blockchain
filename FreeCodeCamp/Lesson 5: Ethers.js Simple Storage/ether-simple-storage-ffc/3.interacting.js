import { ethers } from 'ethers';
import fs from 'fs';

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

const wallet = new ethers.Wallet(
  '0x95530aa825c70292095e7ff529d96513eded3b0faaaabc544b81d83d93b72767',
  provider
);

const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8');
const bytecode = fs.readFileSync(
  './SimpleStorage_sol_SimpleStorage.bin',
  'utf-8'
);

async function main() {
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  console.log('Deploying...');

  const contract = await factory.deploy({
    gasPrice: 20000000000,
    gasLimit: 1000000
  });
  await contract.deployed();

  // =============================
  // Interacting with the contract
  // =============================

  //retrieve
  const currentNumber = await contract.retrieve();
  console.log('Current number:', currentNumber.toString());

  //store
  const transactionResponse = await contract.store('42');
  await transactionResponse.wait(1);

  const updatedNumber = await contract.retrieve();
  console.log('Updated number:', updatedNumber.toString());
}

main();
