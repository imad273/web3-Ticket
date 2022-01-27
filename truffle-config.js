module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Localhost (default: none)
      port:  7545,  // Standard Ethereum port (default: none)
      network_id: "*",  // Any network (default: none)
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",  // Use "0.5.1" you've installed locally with docker (default: false)
    }
  },

  
};
