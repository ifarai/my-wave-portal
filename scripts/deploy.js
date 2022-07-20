const main  = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("The contract is being deployed with account: ", deployer.address);
    console.log("Account Balance: ", accountBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value : hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    console.log("WavePortal Contract Address:", waveContract.address);
    //deployed address placeholder: 0x2502ddfca4BfA9c84BC122b4B8D275f5d2238A98
    // 30 sec : 0xA67Ba59788E2D8d341b52AA479f563BC6C17c9Dd

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



