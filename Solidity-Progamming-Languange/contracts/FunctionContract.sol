// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract HelloWorld {
    uint hasil;

    /*
        pure => menandakan funcsi ini tidak bisa membaca dan tidak mengubah state
    */
    function cetakHello() public pure returns(string memory) {
        return  'Hello World';
    }

    function tambah(uint a, uint b) public {
        uint temp  = a + b; //tempporary variable
        hasil = temp;      // assing ke state
    }

    function getHasil() public view returns (uint) {
        return  hasil;
    }
}


contract PayableContract {
    uint receivedAmount;

    /*
        payable => modifier khusus yang digunakan untuk memberitahu kontrak bahwa sebuah fungsi atau alamat (address) dapat menerima Ether
        msg.values = untuk mengambil values dari transaksi
    */
    function receivedEther() payable public {
        receivedAmount = msg.value;
    }

    function getTotalAmount() public view  returns (uint) {
        return  receivedAmount;
    }

    /*
        - overload = nama fungsi boleh sama, tetapi parameternya harus berbeda
        - returnnya harus di returns tidak boleh didalam bracket 
    */
    function tambah(uint a, uint b) public pure returns (uint hasil) {
        hasil = a + b;
    } 

    function tambah(uint a, uint b, uint c) public pure returns (uint hasil) {
        hasil = a + b + c;
    }
}


