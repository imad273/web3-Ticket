const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonicPhrase = "solve donate immense tool disorder idea silver labor scene lobster pyramid truck"
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Localhost (default: none)
      port:  7545,  // Standard Ethereum port (default: none)
      network_id: "*",  // Any network (default: none)
    },
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase
          },
          providerOrUrl: "https://ropsten.infura.io/v3/9e86c35201ef48a8871aef1abecdbe9d",
        }),
      network_id: '3',
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",  // Use "0.5.1" you've installed locally with docker (default: false)
    }
  },

  
};
