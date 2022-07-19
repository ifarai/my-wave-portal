// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    /// @notice declare variables 
    uint256 public totalWaves;

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
    
    constructor() {
        console.log("A constructor has been initialised, this is an OPTIONAL special function that initialises the state variables of a contract.");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved and said %s", msg.sender, _message); //outputs a string

        ///@notice add the message to the "waves" array
        waves.push(Wave(msg.sender, _message, block.timestamp));


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