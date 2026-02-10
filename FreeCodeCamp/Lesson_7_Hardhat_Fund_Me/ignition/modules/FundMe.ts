import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import MockV3Aggregator from './MockV3Aggregator.js';

export default buildModule('FundMeModule', m => {
  const priceFeedParameter = m.getParameter('priceFeedAddress');

  let priceFeedAddress;

  if (priceFeedParameter === undefined) {
    console.log('Parameter tidak ditemukan, mendeploy Mock...');
    const { mockV3Aggregator } = m.useModule(MockV3Aggregator);
    priceFeedAddress = mockV3Aggregator;
  } else {
    priceFeedAddress = priceFeedParameter;
  }

  const fundMe = m.contract('FundMe', [priceFeedAddress]);

  return { fundMe };
});
