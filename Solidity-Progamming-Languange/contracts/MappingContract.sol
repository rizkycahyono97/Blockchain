// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/*
    - mapping biasa
*/
contract MappingContract {

    // mapping = key => value
    mapping (address => uint) public  myMap; 

    // fungsi untuk menyimpan mapping, paramaternya key dan value
    function set(address _addr, uint _i) public {
        myMap[_addr] = _i; //masukan ke map myMap
    }

    //function untuk memanggil key dari map
    function get(address _addr) public view returns (uint) {
        return myMap[_addr];
    }
}


/*
    - Nested Mapping
*/
contract MappingNestedContract {
    /*
        sekarang nested address -> uint
                                    |_> bool
    */
    mapping (address => mapping(uint => bool)) public nestedMapping;

    function set(address _addr, uint _i, bool _bool) public  {
        nestedMapping[_addr][_i] = _bool;
    }

    function get(address _addr, uint _i) public  view returns (bool) {
        return nestedMapping[_addr][_i];
    }
}