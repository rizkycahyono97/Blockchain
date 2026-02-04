// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// from github
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    uint256 public minimumUSD = 50 * 1e18; //$50.000000000000000000

    address[] public funders;
    mapping(address =>  uint256) public addressToAmountFunded;

    function fund() public payable {
        require(getConversionRate(msg.value) >= minimumUSD, "Didn't send enough!"); // 1e18 == 1*10**18 == 1 ETH
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    /*
        - doc = https://docs.chain.link/data-feeds/api-reference
        - latestRoundData = Get the data from the latest round.
        - uint256(answer * 1e10) = untuk menyamanakan decimal dari oracel dengan WEI
    */
    function getPrice() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 answer,,,) = priceFeed.latestRoundData(); //terdapat koma-koma karena returnnya hanya membutuhkan answer
        return uint256(answer * 1e10);
    }

    /*
        - getVersion from external library chainlink AggregatorV3Interface
        - Address Sepolia ETH = 0x694AA1769357215DE4FAC081bf1f309aDC325306
    */
    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.version();
    }

    /*
        - Perkalian: (2000×1018)×(1×1018)=2000×1036.
        - Pembagian: (2000×1036)/1018=2000×1018.
    */
    function getConversionRate(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }
}