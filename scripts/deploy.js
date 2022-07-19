const main  = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("The contract is being deployed with account: ", deployer.address);
    console.log("Account Balance: ", accountBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("WavePortal Contract Address:", waveContract.address);
    //deployed address placeholder: 0x398F11Ea3936Deca3dab4ff47f4d1926aA8A28e0  0x67706eDB010932D16069e9eE9177da670c8DCF8B

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



