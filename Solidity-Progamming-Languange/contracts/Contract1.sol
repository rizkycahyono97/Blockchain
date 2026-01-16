// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract ContohSatu {
    uint value;

    constructor() {
        value = 10;
    }

    function getConstructor() public  view returns (uint) {
        return value;
    }
}

contract contohDua {
    int totalSupply;

    address private owner = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;

    constructor(int _totalSupply) {
        if (msg.sender == owner) {
            totalSupply = _totalSupply;
        }
    }

    function getSupply() public  view returns (int) {
        return totalSupply;
    }
}