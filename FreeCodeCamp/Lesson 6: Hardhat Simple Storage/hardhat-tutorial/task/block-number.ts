import { HardhatRuntimeEnvironment } from 'hardhat/types/hre';

interface AccountTaskArguments {
  // No argument in this case
}

/*
    - ./node_modules/.bin/hardhat block-number 
    - ./node_modules/.bin/hardhat block-number --network sepolia
*/
export default async function (
  taskArguments: AccountTaskArguments,
  hre: HardhatRuntimeEnvironment
) {
  const { provider } = await hre.network.connect();

  const blockNumberHex = await provider.request({
    method: 'eth_blockNumber'
  });

  const blockNumber = Number(blockNumberHex);

  console.log('Current block number: ', blockNumber);
}
