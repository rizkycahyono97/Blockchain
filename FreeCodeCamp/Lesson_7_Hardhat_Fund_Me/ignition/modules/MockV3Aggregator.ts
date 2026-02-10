import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const DECIMAL = 8;
const INITIAL_PRICE = 2000n * 10n ** 8n; // 200000000000 == $2000 (menentukan harga awal ETH)

export default buildModule('MockV3AggregatorModule', m => {
  const mockV3Aggregator = m.contract(
    'contracts/test/MockV3Aggregator.sol:MockV3AggregatorTest',
    [DECIMAL, INITIAL_PRICE]
  );

  return { mockV3Aggregator };
});
