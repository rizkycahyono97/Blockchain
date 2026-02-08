import { ethers } from 'ethers';
import fs from 'fs';
import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);

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
  const transactionResponse = await contract.store('45');
  await transactionResponse.wait(1);

  const updatedNumber = await contract.retrieve();
  console.log('Updated number:', updatedNumber.toString());
}

main();
