// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract AddressContract {
    // ====================== //
    // cara pertama 
    // ====================== //
    /*
        - smart contract punya address sendiri
        - address dibagi manjadi send dan transfer
    */
    // address public caller;

    // function getCallerAddress() public returns (address) {
    //     caller = msg.sender;    //msg.sender bawaan dari solidity

    //     return  caller;
    // }

    // ====================== //
    // cara kedua => untuk melihat address account sender
    // ====================== //
    // function getCallerAddress2() public view returns (address caller) {
    //     caller = msg.sender;
    // }

    // ====================== //
    // cara ketiga => untuk melihat address dari smart contractnya
    // ====================== //
    // function getCallerAddress3() public view returns (address) {
    //     address smartContractAdd = address(this);
    //     return smartContractAdd;
    // }


    // ====================== //
    // studi kasus = testing pengiriman dan penerimaan 
    // ====================== //
    uint receivedEther;
    /*
        - variable _address adalah address tujuan yang akan dikirim ether
        - function transfer bawaand dari solidity, jika gagal  maka otomatis revert
        - INGAT msg.value mengambil dari value remix
    */
    function transferFund(address payable _address) public payable {
        _address.transfer(msg.value);
    }

    /*
        - send seperti function transfer tetapi returnnya bool
        - data masuk ke kontrak baru dikirimkan 
    */
    function sendFund(address payable _address) public payable  {
        bool success = _address.send(msg.value);
        require(success, "pengiriman gagal");   //pengecekan jika gagal, karena send itu bool
    }

    /*
        - sama seperti function sendFund tetap ada value di remix dan juga parameter nominal harus diisi
        - parameter nominal menggunakan satuan gas
    */
    function sendFund2(address payable _address, uint nominal) public payable {
        require(msg.value == nominal, "Nominal tidak sesuai");

        (bool success, ) = _address.call{value: nominal}("");
        require(success, "pengiriman gagal");
    }

    /*
        - function menerima tranferan ether dan dimasukin ke state
    */
    function receiveEther() payable  public {
        receivedEther = msg.value;  //ambil dari state
    }  

    function cekSaldoKontrak() public view returns (uint) {
        return  address(this).balance;
    }
}   