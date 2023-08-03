import { expect } from "chai";
import { Contract } from "ethers";
const { ethers } = require("hardhat");

/************************
 * COLLECTION CONTRACT TESTING *
 ************************/

//NOTE: Chai for unit testing
//NOTE: Mocha for the test runner -- UT, IT, ETET, COVERAGE -- testing files organization
//NOTE: SC Interaction: ethers.js
//NOTE: Hardhat Network

describe("NFT contract", function () {
  let deployedCollection: Contract;

  before(async function () {
    const Collection = await ethers.getContractFactory("Collection");

    deployedCollection = await Collection.deploy();
  });

  it("Deployment should verify that the number of collection is set to 0", async function () {
    const nbCollection = await deployedCollection.totalCollections();
    expect(nbCollection).to.equal(0);
  });

  //  Create collection

  //  Edit metadata

  //  Get user's all collection info

  //  Get one collection info

  //  Get total number of collections created
});
