// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";

async function main() {
  console.log(`Running script against "${hre.network.name}" network`);

  const deployedLock = await hre.deployments.get("Lock");
  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.attach(deployedLock.address);

  const unlockTime = await lock.unlockTime();
  console.log("Unlock time is:", unlockTime.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
