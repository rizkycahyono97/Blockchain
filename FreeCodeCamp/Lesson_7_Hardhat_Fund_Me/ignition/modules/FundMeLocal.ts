import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import MockV3Aggregator from './MockV3Aggregator.js';

export default buildModule('FundMeLocalModule', m => {
  const { mockV3Aggregator } = m.useModule(MockV3Aggregator);

  const FundMeLocal = m.contract('FundMe', [mockV3Aggregator]);

  return { FundMeLocal };
});
