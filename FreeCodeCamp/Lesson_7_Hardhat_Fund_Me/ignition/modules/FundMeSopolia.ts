import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('FundMeSepoliaModule', m => {
  const priceFeedAddress = m.getParameter('priceFeedAddress');

  const FundMeSepolia = m.contract('FundMe', [priceFeedAddress]);

  return { FundMeSepolia };
});
