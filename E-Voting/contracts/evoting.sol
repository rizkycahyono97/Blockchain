// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
    - 
*/
contract evoting {
    address public owner; //owner itu yang membuat/ketua voting tersebut

    constructor() {
        owner = msg.sender;
    }

    struct Kandidat {
        address _addr;
        uint jumlahSuara;
    }

    Kandidat[] public  kandidat;    //variable untuk struct kandidat
    mapping(address => bool) public kandidatTerdaftar;

    /*
        - untuk mendaftarkan kandidat
        - hanya owner yang boleh mendaftarkan kandidat
        - owner tidak bileh menjadi kandidat
    */
    function daftarkanKandidat(address _addr) public {
        require(msg.sender == owner, "Anda bukan owner, hanya owner yang bisa mendaftarkan kandidat");
        require(_addr != owner, "Owner tidak boleh mendaftarkan dirinya sendiri");
        require(!kandidatTerdaftar[_addr], "Kandidat sudah mendaftar");
        kandidat.push(Kandidat(_addr, 0));  //push ke struct kandidat
        kandidatTerdaftar[_addr] = true;
    }

    /*
        - untuk mengetahui total kandidat yang sudah daftar
    */
    function totalKandidat() public  view returns (uint) {
        return kandidat.length;
    }
}