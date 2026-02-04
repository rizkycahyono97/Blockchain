// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUSD = 50 * 1e18; //$50.000000000000000000

    address public  owner;
    address[] public funders;
    mapping(address =>  uint256) public addressToAmountFunded;

    constructor() {
        owner = msg.sender;
    }

    /*
        - function untuk mengirim uang ke smartcontract
    */
    function fund() public payable {
        require(msg.value.getConversionRate() >= minimumUSD, "Didn't send enough!"); // 1e18 == 1*10**18 == 1 ETH
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value; //ditambah terus di addressToAmountFunded
    }

    /*
        - function untuk mereset funders dan mengirimnya ke address kita
    */
    function withdraw() public {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0; //reset money
        }
        funders = new address[](0); //reset array

        //transfer ke address kita
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call not success");
    }
}