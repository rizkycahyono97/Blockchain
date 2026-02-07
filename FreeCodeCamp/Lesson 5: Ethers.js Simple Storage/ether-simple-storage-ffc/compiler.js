import solc from 'solc';
import fs from 'fs';

const input = {
  language: 'Solidity',
  sources: {
    'SimpleStorage.sol': {
      content: `
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.7;

        contract C {
          function f() public {}
        }
      `
    }
  },
  settings: {
    evmVersion: 'paris',
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contract = output.contracts['SimpleStorage.sol']['C'];

const artifact = {
  abi: contract.abi,
  byteCode: '0x' + contract.evm.bytecode.object
};

fs.writeFileSync('./C.json', JSON.stringify(artifact, null, 2));

console.log('Contract compiled and artifact saved to C.json');
