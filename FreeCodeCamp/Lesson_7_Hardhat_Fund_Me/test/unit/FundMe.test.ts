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

      // console.log('storedPriceFeed', storedPriceFeed);
      // console.log('mockAddress: ', mockAddress);

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

    it('updates the amount funded mapping', async function () {
      const { fundMe, deployer } =
        await networkHelpers.loadFixture(deployFundMeFixture);

      const sendValue = ethers.parseEther('1');

      await fundMe.fund({ value: sendValue });

      const amountFunded = await fundMe.s_addressToAmountFunded(
        deployer.address
      );

      expect(amountFunded).to.be.equal(sendValue);
    });

    it('adds funder to funders array', async function () {
      const { fundMe, deployer } =
        await networkHelpers.loadFixture(deployFundMeFixture);

      const sendValue = ethers.parseEther('1');

      await fundMe.fund({ value: sendValue });

      const funder = await fundMe.s_funders(0);

      expect(funder).to.equal(deployer.address);
    });

    it('allows funding via receive()', async function () {
      const { fundMe, deployer } =
        await networkHelpers.loadFixture(deployFundMeFixture);

      const sendValue = ethers.parseEther('1');

      await deployer.sendTransaction({
        to: fundMe.getAddress(),
        value: sendValue
      });

      const amountFunded = await fundMe.s_addressToAmountFunded(
        deployer.address
      );

      expect(amountFunded).to.equal(sendValue);
    });
  });

  describe('Withdraw', function () {
    it('only allows the owner to withdraw', async function () {
      const { fundMe } = await networkHelpers.loadFixture(deployFundMeFixture);

      const account = await ethers.getSigners();
      const attacker = account[1];

      await expect(
        fundMe.connect(attacker).withdraw()
      ).to.be.revertedWithCustomError(fundMe, 'FundMe_NotOwner');
    });

    it('withdraws ETH from a single funder', async function () {
      const { fundMe, deployer } =
        await networkHelpers.loadFixture(deployFundMeFixture);

      const sendValue = ethers.parseEther('1');

      await fundMe.fund({ value: sendValue });

      const startingOwnerBalance = await ethers.provider.getBalance(
        await deployer.getAddress()
      );

      const startingContractBalance = await ethers.provider.getBalance(
        await fundMe.getAddress()
      );

      // withdraw
      const txResponse = await fundMe.withdraw();
      const txReceipt = await txResponse.wait();

      const gasUsed = txReceipt!.gasUsed;
      const gasPrice = txReceipt!.gasPrice;
      const gasCost = gasUsed * gasPrice;

      const endingOwnerBalance = await ethers.provider.getBalance(
        deployer.getAddress()
      );

      const endingContractBalance = await ethers.provider.getBalance(
        await fundMe.getAddress()
      );

      //contract balance harus 0
      expect(endingContractBalance).to.equal(0n);

      expect(endingOwnerBalance).to.equal(
        startingOwnerBalance + startingContractBalance - gasCost
      );
    });

    it('withdraws ETH with multiple funders', async function () {
      const { fundMe, deployer } =
        await networkHelpers.loadFixture(deployFundMeFixture);

      const account = await ethers.getSigners();

      const sendValue = ethers.parseEther('1');

      for (let i = 1; i < 4; i++) {
        await fundMe.connect(account[i]).fund({ value: sendValue });
      }

      const startingContractBalance = await ethers.provider.getBalance(
        await fundMe.getAddress()
      );

      await fundMe.withdraw();

      const endingContractBalance = await ethers.provider.getBalance(
        await fundMe.getAddress()
      );

      expect(endingContractBalance).to.equal(0n);

      for (let i = 1; i < 4; i++) {
        const funded = await fundMe.s_addressToAmountFunded(account[i].address);
        expect(funded).to.equal(0n);
      }

      await expect(fundMe.s_funders(0)).to.be.revert(ethers);
    });
  });

  describe('Cheaper Withdraw', function () {
    it('only allows the owner to withdraw', async function () {
      const { fundMe } = await networkHelpers.loadFixture(deployFundMeFixture);

      const account = await ethers.getSigners();
      const attacker = account[1];

      await expect(
        fundMe.connect(attacker).cheaperWithdraw()
      ).to.be.revertedWithCustomError(fundMe, 'FundMe_NotOwner');
    });

    it('withdraws ETH from a single funder', async function () {
      const { fundMe, deployer } =
        await networkHelpers.loadFixture(deployFundMeFixture);

      const sendValue = ethers.parseEther('1');

      await fundMe.fund({ value: sendValue });

      const startingOwnerBalance = await ethers.provider.getBalance(
        await deployer.getAddress()
      );

      const startingContractBalance = await ethers.provider.getBalance(
        await fundMe.getAddress()
      );

      // withdraw
      const txResponse = await fundMe.cheaperWithdraw();
      const txReceipt = await txResponse.wait();

      const gasUsed = txReceipt!.gasUsed;
      const gasPrice = txReceipt!.gasPrice;
      const gasCost = gasUsed * gasPrice;

      const endingOwnerBalance = await ethers.provider.getBalance(
        deployer.getAddress()
      );

      const endingContractBalance = await ethers.provider.getBalance(
        await fundMe.getAddress()
      );

      //contract balance harus 0
      expect(endingContractBalance).to.equal(0n);

      expect(endingOwnerBalance).to.equal(
        startingOwnerBalance + startingContractBalance - gasCost
      );
    });

    // it('withdraws ETH with multiple funders', async function () {
    //   const { fundMe, deployer } =
    //     await networkHelpers.loadFixture(deployFundMeFixture);

    //   const account = await ethers.getSigners();

    //   const sendValue = ethers.parseEther('1');

    //   for (let i = 1; i < 4; i++) {
    //     await fundMe.connect(account[i]).fund({ value: sendValue });
    //   }

    //   const startingContractBalance = await ethers.provider.getBalance(
    //     await fundMe.getAddress()
    //   );

    //   await fundMe.cheaperWithdraw();

    //   const endingContractBalance = await ethers.provider.getBalance(
    //     await fundMe.getAddress()
    //   );

    //   expect(endingContractBalance).to.equal(0n);

    //   for (let i = 1; i < 4; i++) {
    //     const funded = await fundMe.s_addressToAmountFunded(account[i].address);
    //     expect(funded).to.equal(0n);
    //   }

    //   console.log('log => ', await fundMe.s_funders(0));

    //   await expect(fundMe.s_funders(0)).to.be.revert(ethers);
    // });
  });
});
