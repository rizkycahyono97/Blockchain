// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
            Contract A
                |
        -----------------
        |               |
    Contract B      Contract C
*/
contract A {
    function getValueA() external pure returns (string memory) {
        return "Contract A dipanggil";
    }
}

contract B is A {}

contract C is A {}


// caller
contract caller {
    B contractB = new B();
    C contractC = new C();

    function warisan() public view returns (string memory, string memory) {
        return (contractC.getValueA(), contractB.getValueA());
    }
}