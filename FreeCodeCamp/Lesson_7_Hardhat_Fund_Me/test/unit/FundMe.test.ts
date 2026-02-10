import { network } from 'hardhat';
import { assert } from 'chai';

let publicClient: any;
let deployer: any;
let otherAccount: any;
let fundMe: any;
let mockV3AggregatorFactory: any;

describe('FundMe', async function () {
  beforeEach(async function () {
    const { viem } = await network.connect();
    publicClient = await viem.getPublicClient();

    const walletClients = await viem.getWalletClients();
    deployer = walletClients[0];
    otherAccount = walletClients[1];

    const mockV3AggregatorFactory = await viem.deployContract(
      'MockV3Aggregator',
      [8, 2000_00000000n]
    );

    fundMe = await viem.deployContract('Fundme', [
      mockV3AggregatorFactory.address
    ]);
    console.log('Deployed FundMe contract to: ', fundMe.target);
  });

  it('Should set the aggregator addresses correctly', async function () {
    const response = await fundMe.getPriceFeed();
    assert.equal(response, mockV3AggregatorFactory.address);
  });
});
