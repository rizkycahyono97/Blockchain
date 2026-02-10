import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const DECIMAL = 8;
const INITIAL_PRICE = 2000n * 10n ** 8n; // 200000000000 == $2000 (menentukan harga awal ETH)

export default buildModule('MockV3Aggregator', m => {
  const mockV3Aggregator = m.contract('MockV3Aggregator', [
    DECIMAL,
    INITIAL_PRICE
  ]);

  return { mockV3Aggregator };
});
