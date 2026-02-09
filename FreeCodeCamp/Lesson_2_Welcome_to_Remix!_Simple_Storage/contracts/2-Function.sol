// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Function {
    uint256 public favoriteNumber;

    function store(uint256 _fn) public {
        favoriteNumber = _fn;
    }

    /*
        - pure. no spend gas
        - view = dissalow change function
    */
    function retrive() public view returns (uint256) {
        return favoriteNumber;
    }
}