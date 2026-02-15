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
error Raffle__TransferFailed();

contract Raffle is VRFConsumerBaseV2Plus {
    // state variabel
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;
    bytes32 private immutable i_keyhash;
    uint256 private immutable i_subscriptionId;
    uint16 private immutable i_requestConfirmations;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant NUMWORDS = 1;
    address private s_recentWinner;

    //event
    event RaffleEnter(address indexed player);
    event RequestSent(uint256 requestId);
    event PickedWinner(address recentWinner);

    constructor(
        address vRFConsumerBaseV2Plus,
        uint256 entranceFee,
        bytes32 keyhash,
        uint256 subscriptionId,
        uint16 requestConfirmations,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2Plus(vRFConsumerBaseV2Plus) {
        i_entranceFee = entranceFee;
        i_keyhash = keyhash;
        i_subscriptionId = subscriptionId;
        i_requestConfirmations = requestConfirmations;
        i_callbackGasLimit = callbackGasLimit;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) revert Raffle__notEnoughETHEntered();
        s_players.push(payable(msg.sender));
        emit RaffleEnter(msg.sender);
    }

    function requestRandomWords(bool enableNativePayment) external {
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: i_keyhash,
                subId: i_subscriptionId,
                requestConfirmations: i_requestConfirmations,
                callbackGasLimit: i_callbackGasLimit,
                numWords: NUMWORDS,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({
                        nativePayment: enableNativePayment
                    })
                )
            })
        );

        emit RequestSent(requestId);
    }

    function fulfillRandomWords(
        uint256,
        uint256[] calldata _randomWords
    ) internal override {
        uint256 indexOfWinner = _randomWords[0] % s_players.length;
        address payable recentWinner = s_players[indexOfWinner];
        s_recentWinner = recentWinner;
        s_players = new address payable[](0); //reset

        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        if (!success) {
            revert Raffle__TransferFailed();
        }

        emit PickedWinner(recentWinner);
    }

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
