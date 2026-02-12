import { network } from 'hardhat';

import deployed from '../ignition/deployments/chain-31337/deployed_addresses.json';

const { ethers } = await network.connect();

async function main() {
  const FUND_ME_ADDRESS = deployed['FundMeLocalModule#FundMe'];

  const [signer] = await ethers.getSigners();

  console.log('Funding Contract: ', FUND_ME_ADDRESS);
  console.log('Funding Address: ', signer.address);

  const fundMe = await ethers.getContractAt('FundMe', FUND_ME_ADDRESS, signer);

  const tx = await fundMe.fund({
    value: ethers.parseEther('0.1')
  });

  await tx.wait(1);

  console.log(`Fund from address ${signer.address} success`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
