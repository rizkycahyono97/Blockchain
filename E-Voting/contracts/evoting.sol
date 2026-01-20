// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
    - 
*/
contract evoting {
    address public owner; //owner itu yang membuat/ketua voting tersebut
    bool public isSudahBisaVoting;
    bool public isVotingSelesai;

    constructor() {
        owner = msg.sender;
        isSudahBisaVoting  = false;
        isVotingSelesai = false;
    }

    struct Kandidat {
        address _addr;
        uint jumlahSuara;
    }

    Kandidat[] public  kandidat;    //variable untuk struct kandidat

    mapping(address => bool) public isKandidatTerdaftar;
    mapping (address => bool) public isUserSudahMemilih;

    /*
        - untuk mendaftarkan kandidat
        - hanya owner yang boleh mendaftarkan kandidat
        - owner tidak bileh menjadi kandidat
    */
    function daftarkanKandidat(address _addr) public {
        require(msg.sender == owner, "Anda bukan owner, hanya owner yang bisa mendaftarkan kandidat");
        require(_addr != owner, "Owner tidak boleh mendaftarkan dirinya sendiri");
        require(!isKandidatTerdaftar[_addr], "Kandidat sudah mendaftar");
        kandidat.push(Kandidat(_addr, 0));  //push ke struct kandidat
        isKandidatTerdaftar[_addr] = true;
    }

    /*
        - untuk mengetahui total kandidat yang sudah daftar
    */
    function totalKandidat() public  view returns (uint) {
        return kandidat.length;
    }

    /*
        - cek apakah sudah bisa voting
    */
    function mulaiVoting(bool _voting) public {
        require(msg.sender == owner, "Anda bukan owner, hanya owner yang bisa mendaftarkan kandidat");
        isSudahBisaVoting = _voting;
    }

    /*
        - untuk memilih kandidat
    */
    function voting(uint _urutanKandidat) public {
        require(isSudahBisaVoting == true, "Voting belum dimulai");
        require(_urutanKandidat < kandidat.length, "Kandidat tidak ditemukan");
        require(!isUserSudahMemilih[msg.sender], "User sudah memilih");
        kandidat[_urutanKandidat].jumlahSuara++;
        isUserSudahMemilih[msg.sender] = true;   //jadika true jika sudah memilih
    } 

    function votingSelesai() public {
        require(msg.sender == owner, "Anda bukan owner");
        isVotingSelesai = true;
        isSudahBisaVoting = false;
    }

    function pemenang() public  view returns (address, uint) {
        // require(isSudahBisaVoting, "Voting belum dimulai");
        require(kandidat.length >= 2, "Kandidat tidak ada");    //minimal ada 2 kandidat yang daftar
        require(isVotingSelesai, "Voting belum selesai");

        uint suaraTertinggi = 0;
        uint indexPemenang = 0;

        for (uint i = 0; i < kandidat.length; i++) {
            if (kandidat[i].jumlahSuara > suaraTertinggi) {
                suaraTertinggi = kandidat[i].jumlahSuara;
                indexPemenang = i;
            }
        }

        return (kandidat[indexPemenang]._addr, kandidat[indexPemenang].jumlahSuara);
    }
}