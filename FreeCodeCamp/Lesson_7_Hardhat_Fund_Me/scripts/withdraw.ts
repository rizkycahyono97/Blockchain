import { network } from 'hardhat';

import deployed from '../ignition/deployments/chain-31337/deployed_addresses.json';

const { ethers } = await network.connect();

async function main() {
  const FUND_ME_ADDRESS = deployed['FundMeLocalModule#FundMe'];

  const [signer] = await ethers.getSigners();

  const fundMe = await ethers.getContractAt('FundMe', FUND_ME_ADDRESS, signer);

  const tx = fundMe.cheaperWithdraw();
  await (await tx).wait(1);

  console.log(`address ${signer.address} successfully `);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
