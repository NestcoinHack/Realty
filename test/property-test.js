const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Property contract", function() {
  async function Propss() {
    const Realty = await ethers.getContractFactory("Realty");
    const Token = await ethers.getContractFactory("TestToken");

    const [owner, addr1] = await ethers.getSigners();


    const contract = await Realty.deploy();
    const tokenContract = await Token.deploy();

    await contract.deployed();
    await tokenContract.deployed()

    await contract.setPaymentToken("TUSDT", tokenContract.address);

    const decimals = ethers.BigNumber.from(10 ** 9).pow(2)
    const balb4 = await tokenContract.balanceOf(owner.address)
    const saleAmount = ethers.BigNumber.from(10).mul(decimals)

    await tokenContract.approve(contract.address, saleAmount)
    await contract.listProperty(
        "TestProp",
        saleAmount,
        "Trenches",
        "TUSDT",
        "Well furnished 2bedroom whatever",
        "some_ipfs_link"
    )
    const balAft = await tokenContract.balanceOf(owner.address)

    return { 
      tokenContract, contract, 
      owner, addr1,
      balb4, balAft, decimals, saleAmount
    };
  }



  describe("Propery submission", function () {
    it("Should submit property", async function () {
      const { contract, owner, 
        balb4, balAft, decimals } = await loadFixture(Propss);

        console.log("\tBalance before submitting:", `${Number(balb4)/decimals} TUSDT`)
        console.log("\tBalance after submitting:", `${Number(balAft)/decimals} TUSDT`)
        console.log("\tProperty listed for", `${Number(balb4)/decimals - Number(balAft)/decimals} TUSDT`)

        const isListed = await contract.isListed(owner.address, "TestProp");
        const hasMinted = await contract.hasMinted(owner.address, "TestProp");

        expect(isListed).to.equal(true);
        expect(hasMinted).to.equal(false)

        console.log("\n\tProperty has been submitted:", isListed);
        console.log("\tProperty has been approved for purchase :", hasMinted)
    });

    it("Should mint nft for Property", async function () {
      const { contract, owner} = await loadFixture(Propss);

        await contract.mintNFT(
          "TestProp"
        )
        const hasMinted = await contract.hasMinted(owner.address, "TestProp");
        expect(hasMinted).to.equal(true)
        console.log("\n\tHas property been approved for purchase :", hasMinted)
    });


    it("Should return details of the successfully listed property", async function() {
      const { contract, decimals } = await loadFixture(Propss);

      await contract.mintNFT(
        "TestProp"
      )

      const list = await contract.getMyListedProperties()
      const listLength = list.length;

      expect(listLength).to.equal(8)
      console.log("\n\tProperty name : ",list[0][0])
      console.log("\tProperty owner : ",list[1][0])
      console.log("\tProperty cost : ",`${Number(list[2][0])/decimals} TUSDT`)
      console.log("\tProperty ID : ",Number(list[3][0]))
      console.log("\tProperty location : ",list[4][0])
      console.log("\tProperty description : ",list[5][0])
      list[6][0].toString() === "0x000000000000000000000000000000000000dEaD" ? 
      console.log("\tPuchased? : Not yet") : console.log("Bought by:",list[6][0])
      console.log("\tProperty cid : ",list[7][0])

      

      
    })
  
    it("Should pay for a property", async function() {
      const { contract, addr1, owner, tokenContract, decimals, saleAmount } = await loadFixture(Propss);

      await contract.connect(owner).mintNFT(
        "TestProp"
      )
      const list = await contract.connect(owner).getMyListedProperties()
      const listLength = list.length;
      console.log("\tProperty cost : ",`${Number(list[2][0])/decimals} TUSDT`)


      await tokenContract.connect(owner).transfer(addr1.address, saleAmount)

      await tokenContract.connect(addr1).approve(contract.address, saleAmount)
      
      const bal = await tokenContract.connect(addr1).balanceOf(addr1.address)
      console.log("\tbalance before payment : ",`${bal/decimals} USDT`)

      await contract.connect(addr1).payForProperty(Number(list[3][0]), "TUSDT")
      const balAfter = await tokenContract.connect(addr1).balanceOf(addr1.address)

      console.log("\tbalance after payment : ",`${balAfter/decimals} TUSDT`)

    });
    });

  

});
