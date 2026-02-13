import {
  BrowserProvider,
  ethers
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.2/ethers.min.js';
import { abi, contractAddress } from './constant.js';

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');
const balance = document.getElementById('getBalance');
const wd = document.getElementById('withdraw');

connectButton.onclick = connect;
fundButton.onclick = fund;
balance.onclick = getBalance;
wd.onclick = withdraw;

let currentAccount = null;

async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    const account = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    currentAccount = account[0];

    document.getElementById('connectButton').innerHTML = 'Connected';
  } else {
    document.getElementById('connectButton').innerHTML = 'Cant Connect';
  }
}

async function fund() {
  const ethAmount = '5';

  if (typeof window.ethereum !== 'undefined') {
    console.log('fund.....');
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // LOG
      //   const balance = await provider.getBalance(signer.address);
      //   console.log('Balance:', ethers.formatEther(balance));
      //   console.log('Contract address:', contractAddress);
      //   console.log('Signer address:', signer.address);
      //   console.log('Signer:', signer.address);
      //   const network = await provider.getNetwork();
      //   console.log('Chain ID:', network.chainId);

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const txResponse = await contract.fund({
        value: ethers.parseEther(ethAmount)
      });

      const txReceipt = await txResponse.wait(1);
      console.log('Blockhash: ', txReceipt.blockHash);
      console.log('Done');
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function getBalance() {
  if (window.ethereum !== 'undefined') {
    console.log('getBalance........');

    try {
      const provider = new BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(contractAddress);

      console.log(ethers.formatEther(balance), 'ETH');
    } catch (error) {
      console.log(error.message);
    }
  }
}

// only owner
async function withdraw() {
  if (typeof window.ethereum !== 'undefined') {
    console.log('withdraw......');

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const txResponse = await contract.withdraw();
      const txReceipt = await txResponse.wait(1);
      console.log('Blockhash: ', txReceipt.blockHash);
      console.log('Done');
    } catch (error) {
      console.log(error);
    }
  }
}
