// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "./PriceConverter.sol";

// custom error
error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18; //$50.000000000000000000, constant membuat gas lebih irit

    address public immutable i_owner; //memakai immutable biar irit GAS
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    constructor() {
        i_owner = msg.sender;
    }

    /*
        - function untuk mengirim uang ke smar tcontract
    */
    function fund() public payable {
        require(
            msg.value.getConversionRate() >= MINIMUM_USD,
            "Didn't send enough!"
        ); // 1e18 == 1*10**18 == 1 ETH
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value; //ditambah terus di addressToAmountFunded
    }

    /*
        - function untuk mereset funders dan mengirimnya ke address kita
    */
    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0; //reset money
        }
        funders = new address[](0); //reset array

        //transfer ke address kita
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call not success");
    }

    /*
        - modifier untuk hanya owner
    */
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NotOwner(); //custom error
        _; //jika semua true diatas, maka baru jalankan fungsi bawahnya
    }

    /*
        FALLBACK AND RECEIVE

        Explainer from: https://solidity-by-example.org/fallback/
        Ether is sent to contract
            is msg.data empty?
                /   \ 
                yes  no
                /     \
        receive()?  fallback() 
            /   \ 
        yes   no
        /        \
        receive()  fallback()
    */
    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
