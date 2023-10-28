const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


describe('BuyMeCoffee', () => {
  let buyMeCoffee, deployer, patron

  const patronName = "Alex"
  const patronMessage = "Enjoy it!"
  const patronDonation = hre.ethers.parseEther("0.1")


  beforeEach(async () => {
    buyMeCoffee = await hre.ethers.deployContract("BuyMeCoffee");
    await buyMeCoffee.waitForDeployment();

    [deployer, patron] = await hre.ethers.getSigners()
  })

  /*------- Development -------*/
  describe('Development', () => {
    it("Should set the right owner", async () => {
      expect(await buyMeCoffee.owner()).to.equal(deployer.address)
    })
  })

  /*------- Buying Coffee -------*/
  describe('Buying Coffee', () => {
    it("Should fail if msg.value is 0", async () => {
      await expect(buyMeCoffee.connect(patron).buyCoffee("Alex", "You will be a rich man soon", {value: hre.ethers.parseEther("0")})).to.be.revertedWith("Please pay more than 0")
    })

    it("Should add new patron", async () => {
      await buyMeCoffee.connect(patron).buyCoffee(patronName, patronMessage, { value: patronDonation })
      
      const newPatron = await buyMeCoffee.patrons(0)
      
      expect(newPatron.name).to.be.a("string").to.equal(patronName)
      expect(newPatron.message).to.be.a("string").to.equal(patronMessage)
      expect(Number(newPatron.time)).to.be.a("number").to.equal(await time.latest())
      expect(newPatron.from).to.be.a("string").to.equal(patron.address)
    })
    
    it("Should transfer Eth to the owner", async () => {
      const deployerBalanceBefore = await hre.ethers.provider.getBalance(deployer.address)

      await buyMeCoffee.connect(patron).buyCoffee(patronName, patronMessage, { value: patronDonation })

      expect(await hre.ethers.provider.getBalance(deployer.address)).to.be.greaterThan(deployerBalanceBefore)
    })


    it("Should emit CoffeeBought event", async () => {
      await expect(buyMeCoffee.connect(patron).buyCoffee(patronName, patronMessage, { value: patronDonation })).to.emit(buyMeCoffee, "CoffeeBought").withArgs(patron.address, patronDonation, anyValue)
    })
  })

  /*------- Getting Patrons -------*/
  describe("Getting Patrons", () => {
    it("Should return patrons", async () => {
      await buyMeCoffee.connect(patron).buyCoffee(patronName, patronMessage, { value: patronDonation })

      const thePatron = await buyMeCoffee.patrons(0)

      expect(thePatron.name).to.be.a("string").to.equal(patronName)
      expect(thePatron.message).to.be.a("string").to.equal(patronMessage)
      expect(Number(thePatron.time)).to.be.a("number").to.equal(await time.latest())
      expect(thePatron.from).to.be.a("string").to.equal(patron.address)
    })
  })
  
})
