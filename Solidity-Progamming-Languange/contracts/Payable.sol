// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

// custom error
error TransferFailed(address target, uint amount);

/*
    urutan testing:
    1. owner
    2. deposit
    3. getAmount
    4. transfer
    5. withdraw
*/
contract Payable {
    address payable  public  owner;

    constructor() payable {
        owner = payable(msg.sender);
    }   

    function deposit() public  payable {}

    /*
        - untuk melihat jumlah ether yang sudah di deposit kedalam smart contract
    */
    function getAmount() public  view returns (uint) {
        uint amount = address(this).balance;    //balance = mengambil saldo ether di dalam smart contract
        return amount;
    }

    /*
        - fungsi untuk menarik sejumlah amount di smartcontract ke owner yang sudah dideklarasikan
    */
    function withdraw() public  {
        uint amount = address(this).balance;

        (bool succes, ) = owner.call{value: amount}("");    //kirim sejumlah amount ke owner 
        if (!succes) {
            revert TransferFailed(owner, amount);
        }
    }

    /*
        - function untuk mengirim ether ke parameter _to
    */
    function transfer(address payable _to, uint _amount) public {
        (bool success,) = _to.call{value: _amount}("");
        if (!success) {
            revert TransferFailed(_to, _amount);
        }
    }
}