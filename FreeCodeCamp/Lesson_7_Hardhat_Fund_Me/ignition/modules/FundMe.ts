import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import MockV3Aggregator from './MockV3Aggregator.js';

export default buildModule('FundMeModule', m => {
  const priceFeedAddress = m.getParameter('priceFeedAddress');

  const fundMe = m.contract('FundMe', [priceFeedAddress]);

  return { fundMe };
});
