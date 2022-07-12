const hre = require("hardhat");
const fs = require('fs')

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    
    console.log("deploying contracts with account ", deployer.address);
    
    const PropertyNftContractFactory = await hre.ethers.getContractFactory("Property");
    const PropertyNftContract = await PropertyNftContractFactory.deploy();

    const TestToken = await hre.ethers.getContractFactory("TestToken");
    const tokenContract = await TestToken.deploy();


    await PropertyNftContract.deployed();
    await tokenContract.deployed();


    const address = JSON.stringify({
      "contractAddress": PropertyNftContract.address,
    })
  
    console.log("Property nft address: ", PropertyNftContract.address)
    console.log("Token address:", tokenContract.address);

    console.log("account balance ", accountBalance.toString());

  
    const abi = fs.readFileSync(`./artifacts/contracts/PropertyNFT.sol/Property.json`);
  
    fs.writeFileSync('./src/contracts/abi.json', abi);
    fs.writeFileSync('./src/contracts/contract_address.json', address)
  
    
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

