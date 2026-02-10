// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

/**
 * mocks chainlink = seperti local aggregator
 */
import "@chainlink/contracts/src/v0.8/shared/mocks/MockV3Aggregator.sol";

contract MockV3AggregatorTest is MockV3Aggregator {
    constructor(
        uint8 _decimals,
        int256 _initialAnswer
    ) MockV3Aggregator(_decimals, _initialAnswer) {}
}
