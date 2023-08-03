import { expect } from "chai";
import { Contract } from "ethers";
const { ethers } = require("hardhat");

/************************
 * NFT CONTRACT TESTING *
 ************************/

//NOTE: Chai for unit testing
//NOTE: Mocha for the test runner -- UT, IT, ETET, COVERAGE -- testing files organization
//NOTE: SC Interaction: ethers.js
//NOTE: Hardhat Network

describe("NFT contract", function () {
  let deployedNFT: Contract;

  before(async function () {
    const NFT = await ethers.getContractFactory("NFT");

    deployedNFT = await NFT.deploy(
      "NFT",
      "TEST",
      "0x..."
    );
  });

  it("Deployment should verify that the owner has 0 token", async function () {
    const [owner] = await ethers.getSigners();

    const ownerBalance = await deployedNFT.balanceOf(owner.address);
    expect(await deployedNFT.totalSupply())
      .to.equal(ownerBalance)
      .to.equal(0);
  });

  //  User can withdraw

  //  Only creator can mint

  //  Get creator
});
