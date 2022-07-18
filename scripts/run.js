//not sure where the module hre is coming from without an import. Answered later in the docs https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment

const main  = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("The contract has been deployed to:", waveContract.address);
    console.log("The contract has been deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

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

