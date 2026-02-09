// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory {
    // SimpleStorage public simpleStorage; //initialize object contract SimpleStorage
    SimpleStorage[] public simpleStorageArray; // initialize object can array

    // function createSimpleStorageContract() public {
    //     simpleStorage = new SimpleStorage();
    // }

    // contract array
    function createSimpleStorageArray() public {
        simpleStorageArray.push(new SimpleStorage());
    }

    // simpan lewat array tapi disimpan di SimpleStorage
    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
    }

    function sfRead(uint256 _simpleStorageIndex) public  view returns (uint256) {
        return simpleStorageArray[_simpleStorageIndex].retrieve();
    } 
}