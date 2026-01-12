// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //solidity version

contract BasicSyntaxContract {
    uint storedData;

    // function untuk set data
    function set(uint x) public {
        storedData = x;
    }

    /* 
        function untuk get data
        view => hanya melihat jadi tidak butuh gas
        returns => menandakan function ini ada returnnya dengan tipe data uint
    */
    function get() public view returns (uint) {
        return  storedData;
    }
}

