// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
    - single inheritance
*/
contract ParentSingle {
    uint internal id;

    function setValue(uint _id) external {
        id = _id;
    }
}

contract ChildSingle is ParentSingle {
    function getValue() external  view returns (uint) {
        return id;
    }
}

// contrak untuk pemanggil
contract Caller {
    ChildSingle caller = new ChildSingle();    //object initialize

    function wariskan(uint _id) public returns (uint) {
        caller.setValue(_id);       //bisa mengambil function lain karena external
        return caller.getValue();
    }
}