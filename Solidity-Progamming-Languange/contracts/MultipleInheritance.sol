// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
    contract A  (parent)
        | 
    contract B  (child)
        |
    contract C  (sub child)
*/
contract A {
    function getValueA() external pure returns (string memory) {
        return "Contract A dipanggil";
    }
}

contract B is A{
    function getValueB() external pure returns (string memory) {
        return "Contract B dipanggil";
    }
}

contract C is B{
    function getValueC() external pure returns (string memory) {
        return "Contract C dipanggil";
    }
}

// caller
contract Caller {
    C contractC = new C();  //object initialize

    function warisan() public view returns (string memory, string memory, string memory) {
        return (contractC.getValueA(), contractC.getValueB(), contractC.getValueC());
    }
}