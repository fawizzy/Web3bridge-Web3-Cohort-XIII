import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("TimeNFT", function () {
  it("Should emit the Increment event when calling the inc() function", async function () {
    const timeNFT = await ethers.deployContract("TimeNFT");
    const tx = await timeNFT.waitForDeployment();

    
  });

  
});
