const hre = require("hardhat");

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    
    console.log("deploying contracts with account ", deployer.address);
    console.log("account balance ", accountBalance.toString());
    
    const PropertyNftContractFactory = await hre.ethers.getContractFactory("Property");
    const PropertyNftContract = await PropertyNftContractFactory.deploy();
    
    await PropertyNftContract.deployed();
    
    console.log("Property nft address: ", PropertyNftContract.address)
    
    }
    
    const runMain = async () => {
        try {
            await main();
            process.exit(0)
        } catch (error) {
            console.log(error);
            process.exit(1)
        }
    }
    
    runMain();