import {
  BrowserProvider,
  ethers
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.2/ethers.min.js';
import { abi, contractAddress } from './constant.js';

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    document.getElementById('connectButton').innerHTML = 'Connected';
  } else {
    document.getElementById('connectButton').innerHTML = 'Cant Connect';
  }
}

async function fund() {
  const ethAmount = '5';

  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // LOG
      const balance = await provider.getBalance(signer.address);
      console.log('Balance:', ethers.formatEther(balance));
      console.log('Contract address:', contractAddress);
      console.log('Signer address:', signer.address);
      console.log('Signer:', signer.address);
      const network = await provider.getNetwork();
      console.log('Chain ID:', network.chainId);

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const txResponse = await contract.fund({
        value: ethers.parseEther(ethAmount)
      });

      const txReceipt = await txResponse.wait(1);
      console.log(txReceipt.blockHash);
      console.log('Done');
    } catch (error) {
      console.log(error.message);
    }
  }
}
