// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {SimpleStorage} from "../src/SimpleStorage.sol";

contract SimpleStorageInteract is Script {
    address constant CONTRACT_ADDRESS =
        0x648A82073e227Fa25DD26e7aA03bC4630e0f219a;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        SimpleStorage simpleStorage = SimpleStorage(CONTRACT_ADDRESS);

        simpleStorage.store(77);

        simpleStorage.addPerson("Rizky Cahyono Putra", 10);

        vm.stopBroadcast();

        simpleStorage.retrieve();
    }
}
