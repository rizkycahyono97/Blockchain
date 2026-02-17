import { expect } from 'chai';
import { timeStamp } from 'console';
import { ContractTransactionResponse } from 'ethers';
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
    const [deployer] = await ethers.getSigners();

    const Raffle = await ethers.getContractFactory('Raffle');

    raffle = await Raffle.deploy(
      vrfCoordinator,
      entraceFee,
      keyHash,
      subscriptionId,
      callBackGasLimit,
      interval,
      enableNativePayment
    );

    await raffle.waitForDeployment();
  });

  describe('Constructor', async function () {
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

      expect(raffleTimeStamp).to.equal(blockTimeStamp);
    });
  });
});
