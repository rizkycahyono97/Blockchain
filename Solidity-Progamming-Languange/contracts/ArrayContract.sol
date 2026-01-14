// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ArrayContract {

    /*
        - untuk membuat fixed array
    */
    function getArray() public pure returns (uint[5] memory) {
        uint[5] memory data = [uint(50), 60, 70, 80, 100];
        return data;
    }

    /*
        - untuk  mengambil index array
    */
    function getArrayIndex() public pure returns (uint) {
        uint[5] memory data = [uint(50), 60, 70, 80, 100];
        return data[1];
    }

    /*
        - mengambil array dari state
    */
    uint[5] dataState;
    function getArrayState() public returns (uint) {
        dataState = [uint(50), 60, 70, 80, 100];
        return dataState[1];
    }

    /*
        - dinamis array secara inline
    */
    uint[] dinamisArrayInline;
    function dinamisArray() public returns (uint[] memory) {
        dinamisArrayInline = [10,20,30,50];
        return  dinamisArrayInline;  
    }

    uint[] tambahArray;
    function tambahArrayFunc() public returns (uint[] memory) {
        tambahArray = new uint[](3);
        tambahArray[0] = 10;
        tambahArray[1] = 20;
        tambahArray[2] = 30;

        return (tambahArray);
    }

    /*
        - lenght untuk panjang array
    */
    uint[7] data;

    function arrayExample() public payable returns (uint[7] memory) {
        data = [10, 20,30, 40, 50, 60,70];
        return data;
    }

    //makai view karena state tidak diubah
    function arrayLength() public  view returns (uint) {
        uint x = data.length;
        return x;
    }

    /*
        - push array = menambah index array diakhir
    */
    uint[] pushArray;

    function pushArrayFunc() public returns (uint[] memory) {
        pushArray = [1,2,3];
        pushArray.push(4);
        pushArray.push(5);

        return pushArray;
    }

    /*
        - pop = menghapus index terakhir
    */
    uint[] popArray;

    function popArrayFunc() public returns (uint[] memory) {
        popArray = [1,2,3,4,5];
        popArray.pop();
        popArray.pop();

        return popArray;
    }
}