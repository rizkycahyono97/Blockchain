// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {SimpleStorage} from "../src/SimpleStorage.sol";

contract DeployScript is Script {
    function run() public {
        vm.startBroadcast();

        new SimpleStorage();

        vm.stopBroadcast();
    }
}
