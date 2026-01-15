// SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0 <0.9.0;

contract Structure {
    struct Buku {
        string judul;
        string author;
        uint id;
        bool isReady;
    }


    /*
        - mencetak semua struct
    */
    Buku buku1; //inisialisasi struct

    function tambahBuku() public {
        buku1 = Buku("Bumi", "Tere Liye", 12, true);
    }

    function lihatBuku() public view returns (string memory, string memory, uint, bool) {
        return (buku1.author, buku1.judul,  buku1.id, buku1.isReady);
    }

    /*
        - mencetak salah satu Struct
    */
    Buku buku2 = Buku("Pemograman Blockchain", "Rizky", 13, false);

    function lihatBuku2() public view returns (string memory, uint) {
        return (buku2.author, buku2.id);
    }

    /*smart contract
        - membuat Struct menggunakan Array
    */
    Buku[] public buku3;

    // push parameter ke struct
    function newBook(string memory judul, string memory author, uint id, bool isReady) public {
        buku3.push(Buku(judul, author, id, isReady));
    }

    //unutk melihat struct array menggunakan index
    function infoBuku(uint _index) public view returns (string memory judul, string memory author) {
        Buku storage buku = buku3[_index];
        return (buku.judul, buku.author);
    } 
}