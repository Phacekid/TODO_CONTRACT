const hre = require("hardhat");

async function main() {
  const todo = await hre.ethers.deployContract("todo");
  await todo.waitForDeployment();
  console.log(`Contract deployed to ${todo.target} `)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
