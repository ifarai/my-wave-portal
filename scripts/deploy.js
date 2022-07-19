const main  = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("The contract is being deployed with account: ", deployer.address);
    console.log("Account Balance: ", accountBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("WavePortal Contract Address:", waveContract.address);
    //deployed address placeholder: 0xB9734c58f27De708a76E69Ed06ceE9D73Bef28bf

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



