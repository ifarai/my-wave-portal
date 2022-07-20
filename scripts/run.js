//not sure where the module hre is coming from without an import. Answered later in the docs https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment

const main  = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value : hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    console.log("The contract has been deployed to:", waveContract.address);
    console.log("The contract has been deployed by:", owner.address);

    // Get first contract balance 
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));



    //Send the waaaaave 

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave("A friendly message from meatspace #1");
    await waveTxn.wait();

    // let waveTxn2 = await waveContract.wave("A friendly message from meatspace mc meaaty #2");
    // await waveTxn2.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("A hostile message from meatspace, comeback from the metaverse!");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

     // Get final contract balance 
     contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
     console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));



    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves)


};

const runMain = async () => {
    try {
        await main();
        process.exit(0); //exit node process without error??
        
    } catch (error) {
        console.log(error);
        process.exit(1); //read stackoverflow to understand these https://stackoverflow.com/questions/43147330/
    }
};

runMain();

