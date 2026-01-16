// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
        Contract A---------Contract B
            |                  |
            |                  |
        Contract C--------------
*/
contract A {
    uint internal a;

    function getA(uint _value) external {
        a = _value;
    }
}

contract B {
    uint internal b;

    function getB(uint _value) external {
        b = _value;
    }
}

contract C is A,B {
    function getValueOfSum() external view returns (uint) {
        return a + b;
    }
}

// caller
contract Caller {
    C contractC = new C();

    function wariskan() public returns (uint) {
        contractC.getA(10);
        contractC.getB(20);

        return contractC.getValueOfSum();
    }
}