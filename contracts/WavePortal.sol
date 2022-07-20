// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    /// @notice declare variables 
    uint256 public totalWaves;

    //private seed for making the pseudo-random harder to crack 
    uint256 private seed;

    /// @notice event to trigger when a new message has been stored 
    event NewWave(address indexed from, uint256 timestamp, string message);

    /// @notice set up a stucture for storing messages from users and when they were received.
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    // declare the variable waves that allows for setting up an array of waves.
    Wave [] waves;  //FYI,  mappings are cheaper than arrays in gas if you can avoid them.

    //mapping to store address of users and the block they last waved at
    mapping (address => uint256) public lastWavedAt;
    
    constructor() payable {
        console.log("A constructor has been initialised, and hopefully funded.");

        //initialise the seed
        seed = (block.timestamp + block.difficulty) % 100;
        console.log ("Initialised with the following seed: %d", seed);
        }

    function wave(string memory _message) public {
        ///@notice require that the user can only wave once every 30 seconds.
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Wait 30 seconds mfer, it aint that long");
        lastWavedAt[msg.sender] = block.timestamp;


        totalWaves += 1;
        console.log("%s has waved and said %s", msg.sender, _message); //outputs a string

        ///@notice add the message to the "waves" array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        //create random number and select winner if less than the number 50
        seed =  (block.timestamp + block.difficulty + seed) % 100;
        console.log ("Generated seed: %d", seed);

        if (seed < 50){
            console.log("You won mfer! %s", msg.sender);

             //check that the contract has enough money to payout, then payout to the contract caller.
            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "The contract does not have enough ballance, Sorry!");
            (bool success, ) = (msg.sender).call{ value: prizeAmount}(""); // this does not feel right.
            require(success, "Failed to withdraw fromn contract");
        }


        ///@notice send a notification that the message has been stored.
        emit NewWave(msg.sender, block.timestamp, _message);

       

    }

    /// @notice get all the waves stored in the said array.
    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }

    /// @notice get total number of waves
    function getTotalWaves() public view returns (uint256) {
        /// @dev public keyword makes the function available publicly, i.e. on Etherscan as a way to interact with the contract.
        /// @dev view ensures that the functions interaction with the contract will not change state.
        /// @dev other custom modifier functions can also be added.
        console.log("We have %d total waves!", totalWaves); // "%d" outputs an int
        return totalWaves;
    }
}