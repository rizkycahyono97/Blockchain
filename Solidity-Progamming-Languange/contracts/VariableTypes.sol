// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; 

contract VariableTypes {
    // state variable / public variable
    uint sum; //uint tidak bisa minus / bil. bulat

    // penerapan local variable
    function tambah(uint num1, uint num2) public {
        //local variable
        uint temp  = num1 + num2;

        sum = temp; //assign ke sum supaya bisa diakses di luar
    }

    function getHasil() public view returns(uint) {
        return  sum;
    }
}

contract Types {
    bool public  valid = true;  //boolean

    int32 public angkaku = -32;  //kalau int bisa min, dan semua bilangan
    uint public angkamu = 1; //hanya bilangan bulat

    uint32 public ui_daa = 13_01_2026;  //hasilnya tetap int = 13012026

    uint result; //state

    function tambah() public {
        result = 3.5 + 1.5; //tetap bisa yang penting hasilnya bulat
    }

    // bytes 1-32
    bytes1 public huruf = "A"; //bytes lebih hemat gas
    string public kalimat = "i love you"; 

}

// Enum
contract EnumSaya {
    enum Jobs {pagi, siang, sore}

    function getJobs() public pure returns (Jobs) {
        return  Jobs.siang; //hasilnya mengembalikan array = 1
    }
}