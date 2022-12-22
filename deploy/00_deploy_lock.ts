// deploy/00_deploy_lock.js
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployFunction: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("deployer", deployer);

  const res = await deploy("Lock", {
    from: deployer,
    log: true,
    args: [Date.now() + 1000],
  });

  // Example to get an instance of the contract and call methods
  // const lockInstance = await ethers.getContract("Lock", deployer);
  //
  // const tx = await lockInstance.withdraw();
  // console.log("transaction hash: ", tx.hash);
  //
  // Wait until the transaction is mined before continuing
  // await tx.wait()
};

export default deployFunction;
deployFunction.tags = ["test"];
