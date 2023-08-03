import { expect } from "chai";
import { Contract } from "ethers";
const { ethers } = require("hardhat");

/************************
 * MARKET CONTRACT TESTING *
 ************************/

//NOTE: Chai for unit testing
//NOTE: Mocha for the test runner -- UT, IT, ETET, COVERAGE -- testing files organization
//NOTE: SC Interaction: ethers.js
//NOTE: Hardhat Network

describe("NFT contract", function () {
  let deployedMarket: Contract;

  before(async function () {
    const Market = await ethers.getContractFactory("Market");

    deployedMarket = await Market.deploy();
  });

  it("Deployment should verify that the market has 0 item", async function () {
    const nbItems = await deployedMarket.getNumberItems();
    expect(await nbItems).to.equal(0);
  });

  //  Create a market item for sale

  //  Create a market item for auction

  //  Create a bid for auction

  //  Finish a sale

  //  Finish an auction

  //  Fetch user bids for a market item

  //
});
