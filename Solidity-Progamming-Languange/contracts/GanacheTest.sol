// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ProofOfExcercise {
    mapping (bytes32 => bool) private proofs;

    function storeProof(bytes32 proof) private {
        proofs[proof] = true;
    }

    // function untuk masukin document ke memory di proofs
    function notarize(string memory document) public {
        storeProof(proofFor(document));
    }

    // helper untuk menrubah document sha256
    function proofFor(string memory document) private pure returns (bytes32) {
        return  sha256((bytes(document)));
    }

    function checkDocument(string memory document) public view returns (bool) {
        return proofs[proofFor(document)];
    }
}