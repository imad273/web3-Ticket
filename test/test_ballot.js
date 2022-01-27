const Tesrt = artifacts.require("Tesrt");

contract('Tesrt', () => {
   it("should return the list of getAllProposals", async () => {
      const instance = await Tesrt.deployed();
      const value = await instance.getAllSenders();
      console.log(value);
   });
})