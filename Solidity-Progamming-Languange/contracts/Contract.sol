// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/*
    macam macam contract, ini bukan smart contract
    *data itu bisa function atau semuanya 

    - public = data bisa diakses dari semua contract
    - private = data hanya bisa diakses dari dalam contract tersebut
    - internal = data hanya bisa diakses dari dalam contract dan juga child dari contract tersebut
    - external = contract yang bisa mengakses data publik dari contract lain
*/
contract Parent {
    uint private data;

    uint public info;

    constructor() {
        info = 10;
    }

    // private
    function increment(uint a) private pure returns (uint) {
        return  a + 1;
    }

    // public
    function setIncrement() public pure returns (uint) {
        return increment(2);
    }

    // public
    function updateData(uint a) public {
        data = a;
    }
    function getData() public view returns (uint) {
        return data;
    }

    // internal
    function compute(uint a, uint b) internal pure returns (uint) {
        return a + b;
    }
}

// external
contract External {
    function readData() public returns (uint) {
        Parent p = new Parent();    //inisialisasi object class
        p.updateData(12);
        return p.getData();
    }
}

// contract child dari contract parent
contract Child is Parent {
    uint private result;
    Parent private p;

    constructor() {
        p = new Parent();
    }

    function getComputeResult() public  {
        result = compute(10, 20);   //compute dari parent, semua function internal dan public milik child juga
    }

    function getResult() public  view returns (uint) {
        return result;
    }

    function getDataBaru() public  view returns (uint) {
        return p.info();
    }
}