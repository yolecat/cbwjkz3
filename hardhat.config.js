require('dotenv').config()
require('@nomiclabs/hardhat-waffle')

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  //defaultNetwork: 'rinkeby',
  networks: {
    hardhat: {},
    rinkeby: {
      url: `${process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`]
    },
    stardust: {
      url: "https://stardust.metis.io/?owner=588",
      accounts:
        process.env.METAMASK_PRIVATE_KEY !== undefined ? [process.env.METAMASK_PRIVATE_KEY] : [],
    },
    andromeda: {
      url: "https://andromeda.metis.io/?owner=1088",
      accounts:
        process.env.METAMASK_PRIVATE_KEY !== undefined ? [process.env.METAMASK_PRIVATE_KEY] : [],
    }
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    //apiKey: `${process.env.ETHERSCAN_API_KEY}`
    apiKey: 'api-key'
  }
}