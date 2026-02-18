import { expect } from 'chai';
import { network } from 'hardhat';

const { ethers } = await network.connect();

describe('Raffle - deployment', function () {
  let raffle: any;
  let deployer: any;

  const entraceFee = ethers.parseEther('0.1');
  const interval = 60;
  const keyHash =
    '0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae';
  const subscriptionId =
    '81002506649389566401102351510037004838750721837094787803680786457673035293785';
  const callBackGasLimit = 500000;
  const vrfCoordinator = '0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B';
  const enableNativePayment = true;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    deployer = signers[0];

    // deploy mock
    const VRFCoordinatorV2_5MockFactory = await ethers.getContractFactory(
      'VRFCoordinatorV2_5MockWrapper'
    );
    const vrfCoordinatorV2_5Mock = await VRFCoordinatorV2_5MockFactory.deploy(
      ethers.parseEther('0.1'),
      1e9,
      4e15
    );

    //create subscription
    const tx = await vrfCoordinatorV2_5Mock.createSubscription();
    const txReceipt = await tx.wait(1);
    const subId = (txReceipt?.logs[0] as any).args.subId;
    await vrfCoordinatorV2_5Mock.fundSubscription(
      subId,
      ethers.parseEther('100')
    );

    //deploy rafle
    const raffleFactory = await ethers.getContractFactory('Raffle');
    raffle = await raffleFactory.deploy(
      await vrfCoordinatorV2_5Mock.getAddress(), //local
      entraceFee,
      keyHash,
      subId,
      callBackGasLimit,
      interval,
      enableNativePayment
    );

    // await raffle.waitForDeployment();
    await vrfCoordinatorV2_5Mock.addConsumer(subId, await raffle.getAddress());
  });

  describe('Constructor', function () {
    it('should deploy successfully', async function () {
      const address = await raffle.getAddress();
      expect(address).to.not.equal(ethers.ZeroAddress);
    });

    it('should initialize raffle state as OPEN', async function () {
      const raffleState = await raffle.getRaffleState();
      expect(raffleState).to.equal(0); // 0 = open
    });

    it('should set the correct entrance fee', async function () {
      const fee = await raffle.getEntrance();
      expect(fee).to.equal(entraceFee);
    });

    it('should set the correct interval', async function () {
      const contractInterval = await raffle.getInterval();
      expect(contractInterval).to.equal(interval);
    });

    it('should set lastTimeStamp to current block timestamp', async function () {
      const raffleTimeStamp = await raffle.getLastestTimeStamp();
      const block = await ethers.provider.getBlock('latest');

      const blockTimeStamp = block!.timestamp;

      expect(raffleTimeStamp).to.closeTo(Number(blockTimeStamp), 5);
    });
  });

  describe('EnterRaffle', function () {
    it('reverts when not enough ETH is sent', async function () {
      await expect(
        raffle.enterRaffle({ value: 0 })
      ).to.be.revertedWithCustomError(raffle, 'Raffle__notEnoughETHEntered');
    });

    it('records player when they enter', async function () {
      await raffle.enterRaffle({ value: entraceFee });
      const playerFromContract = await raffle.getPlayer(0);
      expect(playerFromContract).to.equal(deployer.address);
    });

    it('emits event on enter', async function () {
      await expect(raffle.enterRaffle({ value: entraceFee })).to.emit(
        raffle,
        'RaffleEnter'
      );
    });

    it('reverts when raffle is not open', async function () {
      await raffle.enterRaffle({ value: entraceFee });

      await ethers.provider.send('evm_increaseTime', [interval + 1]);
      await ethers.provider.send('evm_mine');

      await raffle.performUpkeep('0x');

      await expect(
        raffle.enterRaffle({ value: entraceFee })
      ).to.revertedWithCustomError(raffle, 'Raffle__RaffleNotOpen');
    });
  });
});
