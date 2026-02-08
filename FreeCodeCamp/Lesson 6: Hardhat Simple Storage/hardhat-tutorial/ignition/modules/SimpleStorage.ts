import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('SimpleStorage', m => {
  const simpleStorage = m.contract('SimpleStorage');

  return { simpleStorage };
});
