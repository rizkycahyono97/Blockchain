// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
    - Abstract = blueprint
    - virtual = supaya bisa dipakai sebagai abstrak di function lain
*/
abstract contract Abstract {
    function getAngka(uint a, uint b) public virtual; 

    function hitung() public virtual view returns (uint);
}

/*
    - implementasi abstract = semua function harus diimplementasikan
    - ovverride = jika nama fungsi yang mengimplementasikan abstrak sama namanya 
*/
contract Hitung is Abstract {
    uint panjang;
    uint lebar;

    function getAngka(uint a, uint b) public override {
        panjang = a;
        lebar = b;
    }

    function hitung() public override view returns (uint) {
        uint result = panjang * lebar;
        return result;
    }
}