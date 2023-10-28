const hre = require("hardhat");



async function main() {
  
  const buyMeCoffee = await hre.ethers.deployContract("BuyMeCoffee")
  await buyMeCoffee.waitForDeployment()


  console.log(`BuyMeCoffee deployed to ${buyMeCoffee.target}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
