// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ArrayAndContract {

    /*
        STRUCT
    */
    People public person1 = People({
        favoriteNumber: 20,
        name: "Rizky"
    });

    People public person2 = People({
        favoriteNumber: 30,
        name: "Cahyono"
    });

    struct People {
        uint favoriteNumber;
        string name;
    }


    /*
        ARRAY
    */
    People[] public peopleArray;

    function addPeopleArray(uint _fn, string memory _name) public {
        People memory newPerson = People({favoriteNumber: _fn, name: _name});
        peopleArray.push(newPerson);
    }


}