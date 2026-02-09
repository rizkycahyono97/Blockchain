// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Mapping {
    /*
        key => value
    */
    mapping(string => uint) public nameToFavoriteNumber;

    function addToMap(string calldata _name, uint _number) public {
        nameToFavoriteNumber[_name] = _number;
    }
}