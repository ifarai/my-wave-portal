// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    // declaire variables 
    uint256 totalWaves;

    
    constructor() {
        console.log("A constructor has been initialised, this is an OPTIONAL special function that initialises the state variables of a contract.");
        // Properties of contructors, can only have one, initialised at the start of the contract, they are not included in the final code.
        // if not defined, the defailt constructor is used.
        
        //I wrote my name on the blockchain bitch! Farai
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved", msg.sender); //outputs a string
    }

    function getTotalWaves() public view returns (uint256) {
        //public keyword makes the function available publicly, i.e. on Etherscan as a way to interact with the contract.
        //view ensures that the functions interaction with the contract will not change state.
        //other custom modifier functions can also be added.


        console.log("We have %d total waves!", totalWaves); //outputs an int
        return totalWaves;
    }
}