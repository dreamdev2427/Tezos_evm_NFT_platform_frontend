// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import * as fs from "fs";
import { ethers } from "hardhat";

async function main(): Promise<void> {
  // We get the contracts to deploy
  const Market = await ethers.getContractFactory("Market");
  const market = await Market.deploy();
  await market.deployed();

  // const NFT = await ethers.getContractFactory("NFT");
  // const nft = await NFT.deploy(market.address);
  // await nft.deployed();

  const Collection = await ethers.getContractFactory("Collection");
  const collection = await Collection.deploy();
  await collection.deployed();

  const config = `
  export const marketAddress = "${market.address}"
  export const collectionAddress = "${collection.address}"
  `;

  //  Create a TS file that stores the addresses of the deployed contracts
  const data = JSON.stringify(config);
  fs.writeFileSync("cache/deploy.ts", JSON.parse(data));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
