const hre = require("hardhat");
const fs = require('fs')

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    
    console.log("deploying contracts with account ", deployer.address);
    
    const PropertyNftContractFactory = await hre.ethers.getContractFactory("Property");
    const PropertyNftContract = await PropertyNftContractFactory.deploy();

    const SavingVaultContractFactory = await hre.ethers.getContractFactory("SavingVault");
    const SavingVaultContract = await SavingVaultContractFactory.deploy();

    const TestToken = await hre.ethers.getContractFactory("TestToken");
    const tokenContract = await TestToken.deploy();


    await PropertyNftContract.deployed();
    await tokenContract.deployed();
    await SavingVaultContract.deployed();

    const address = JSON.stringify({
      "contractAddress": PropertyNftContract.address,
    })
    const token_address = JSON.stringify({
        "contractAddress": tokenContract.address,
    })

    const vault_address = JSON.stringify({
        "contractAddress": SavingVaultContract.address,
    })
  
    console.log("Property nft address: ", PropertyNftContract.address);
    console.log("Token address:", tokenContract.address);
    console.log("SavingVaultContract", SavingVaultContract.address);

    console.log("account balance ", accountBalance.toString());

  
    const abi = fs.readFileSync(`./artifacts/contracts/PropertyNFT.sol/Property.json`);
    const token_abi = fs.readFileSync(`./artifacts/contracts/TestToken/test.sol/TestToken.json`);
    const vault_abi = fs.readFileSync(`./artifacts/contracts/Vault.sol/SavingVault.json`);
  
    fs.writeFileSync('./src/contracts/abi.json', abi);
    fs.writeFileSync('./src/contracts/contract_address.json', address)

    fs.writeFileSync('./src/contracts/token_abi.json', token_abi);
    fs.writeFileSync('./src/contracts/token_address.json', token_address)
  
    fs.writeFileSync('./src/contracts/vault_abi.json', vault_abi);
    fs.writeFileSync('./src/contracts/vault_address.json', vault_address)
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

