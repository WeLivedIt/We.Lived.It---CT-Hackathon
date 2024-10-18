require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: '0.8.0', 
  networks: {
    arbitrumTestnet: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY ],
    },
  },
};
