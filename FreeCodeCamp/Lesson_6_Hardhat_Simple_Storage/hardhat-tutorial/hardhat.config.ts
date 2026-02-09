import hardhatToolboxViemPlugin from '@nomicfoundation/hardhat-toolbox-viem';
import { configVariable, defineConfig, task } from 'hardhat/config';
import hardhatEthers from '@nomicfoundation/hardhat-ethers';

// task
const getBlockNumber = task('block-number', 'Get current blockNumber')
  .setAction(() => import('./task/block-number.js'))
  .build();

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin, hardhatEthers],
  solidity: {
    profiles: {
      default: {
        version: '0.8.28'
      },
      production: {
        version: '0.8.28',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    }
  },
  networks: {
    hardhatMainnet: {
      type: 'edr-simulated',
      chainType: 'l1'
    },
    hardhatOp: {
      type: 'edr-simulated',
      chainType: 'op'
    },
    sepolia: {
      type: 'http',
      chainType: 'l1',
      url: configVariable('SEPOLIA_RPC_URL'), //otomatis langsung ngarah ke .env
      accounts: [configVariable('SEPOLIA_PRIVATE_KEY')]
    }
  },
  verify: {
    etherscan: {
      apiKey: configVariable('ETHERSCAN_API_KEY')
    }
  },
  tasks: [getBlockNumber]
});
