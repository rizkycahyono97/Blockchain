// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

/**
 * 1. Raffle
 * 2. enter the lottery (paying some amount)
 * 3. pick a random winner
 * 4. the winner to be selected every x minutes
 * 5. chainlink oracle -> automatic executing
 */

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

error Raffle__notEnoughETHEntered();

contract Raffle is VRFConsumerBaseV2Plus {
    // state variabel
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    //event
    event RaffleEnter(address indexed player);

    constructor(
        address vRFConsumerBaseV2Plus,
        uint256 entranceFee
    ) VRFConsumerBaseV2Plus(vRFConsumerBaseV2Plus) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) revert Raffle__notEnoughETHEntered();
        s_players.push(payable(msg.sender));
        emit RaffleEnter(msg.sender);
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] calldata _randomWords
    ) internal override {}

    /**
     * @notice getter for i_entranceFee
     */
    function getEntrance() public view returns (uint256) {
        return i_entranceFee;
    }

    /**
     * @notice getter for s_players[index]
     */
    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
