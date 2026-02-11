import { expect } from 'chai';
import { network } from 'hardhat';

const { ethers, networkHelpers } = await network.connect();

describe('FundMe', function () {
  async function deployFundMeFixture() {
    const [deployer] = await ethers.getSigners();

    const DECIMALS = 8;
    const INITIAL_PRICE = 2000n * 10n ** 8n;

    const mock = await ethers.deployContract('MockV3AggregatorTest', [
      DECIMALS,
      INITIAL_PRICE
    ]);

    await mock.waitForDeployment();
    const mockAddress = await mock.getAddress();

    const fundMe = await ethers.deployContract('FundMe', [mockAddress]);

    await fundMe.waitForDeployment();

    return { fundMe, mockAddress, deployer };
  }

  describe('constructor', function () {
    it('sets the price feed address correctly', async function () {
      const { fundMe, mockAddress } =
        await networkHelpers.loadFixture(deployFundMeFixture);

      const storedPriceFeed = await fundMe.getPriceFeed();

      console.log('storedPriceFeed', storedPriceFeed);
      console.log('mockAddress: ', mockAddress);

      expect(storedPriceFeed).to.equal(mockAddress);
    });

    it('sets the deployer as the owner', async function () {
      const { fundMe, deployer } =
        await networkHelpers.loadFixture(deployFundMeFixture);

      const owner = await fundMe.i_owner();

      expect(owner).to.equal(deployer.address);
    });
  });

  describe('Fund', function () {
    it('reverts if not enough ETH is sent', async function () {
      const { fundMe } = await networkHelpers.loadFixture(deployFundMeFixture);

      await expect(fundMe.fund()).to.be.revertedWith("Didn't send enough!");
    });
  });
});
