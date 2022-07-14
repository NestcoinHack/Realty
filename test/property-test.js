const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
// const helpers = require("hardhat-network-helpers");


describe("Property contract", function() {
  let contract;
  let Property;
  let tokenContract;
  let owner;
  let balb4;
  let balAft;
  let decimals;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    Property = await ethers.getContractFactory("Property");
    const Token = await ethers.getContractFactory("TestToken");

    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();


    contract = await Property.deploy();
    tokenContract = await Token.deploy();

    await contract.setPaymentToken("TUSDT", tokenContract.address);

    decimals = ethers.BigNumber.from(10 ** 9).pow(2)
    balb4 = await tokenContract.balanceOf(owner.address)
    const saleAmount = ethers.BigNumber.from(10).mul(decimals)

    await tokenContract.approve(contract.address, saleAmount)
    await contract.listProperty(
        "TestProp",
        saleAmount,
        "Trenches",
        "TUSDT"
    )
    balAft = await tokenContract.balanceOf(owner.address)

  });

  describe("Propery submission", function () {
    it("Should submit property", async function () {

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
        await contract.mintNFT(
          "someipfslink",
          "TestProp"
        )
        const hasMinted = await contract.hasMinted(owner.address, "TestProp");
        expect(hasMinted).to.equal(true)
        console.log("\n\tHas property been approved for purchase :", hasMinted)
    });
    it("Should return details of the successfully listed property", async function() {
      await contract.mintNFT(
        "someipfslink",
        "TestProp"
      )

      const list = await contract.getMyListedProperties()
      const listLength = list.length;

      expect(listLength).to.equal(7)
      console.log("\n\tProperty name : ",list[0][0])
      console.log("\tProperty owner : ",list[1][0])
      console.log("\tProperty cost : ",`${Number(list[2][0])/decimals} TUSDT`)
      console.log("\tListing time : ",list[3][0].toBigInt())
      console.log("\tProperty location : ",list[4][0])
      console.log("\tProperty ID : ",list[5][0].toBigInt())
      list[6][0].toString() === "0x000000000000000000000000000000000000dEaD" ? 
      console.log("\tPuchased? : Not yet") : console.log("Bought by:",list[6][0])
      
    })
  });

  describe("Property ownership", function () {
    beforeEach(async function () {
      await contract.mintNFT(
        "someipfslink",
        "TestProp"
      )
    })

    it("Should pay for a property", async function() {
      await contract.payForProperty(1, "USDT")
    });
  });

});
