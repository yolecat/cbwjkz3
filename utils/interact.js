//const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('../scripts/whitelist.js')

//const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL)

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

import { config } from '../dapp.config'

const contract = require('../artifacts/contracts/CyberWojakz.sol/CyberWojakz.json')
const nftContract = new web3.eth.Contract(contract.abi, config.contractAddress)


// Calculate merkle root from the whitelist array
const leafNodes = whitelist.map((addr) => keccak256(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
const root = merkleTree.getRoot()

export const getTotalMinted = async () => {
  const totalMinted = await nftContract.methods.totalSupply().call()
  return totalMinted
}

export const getMaxSupply = async () => {
  const maxSupply = await nftContract.methods.maxSupply().call()
  return maxSupply
}

export const isPausedState = async () => {
  const paused = await nftContract.methods.paused().call()
  return paused
}

export const isPublicSaleState = async () => {
  const publicSale = await nftContract.methods.publicM().call()
  return publicSale
}


export const getPrice = async () => {
  var prices = await nftContract.methods.price().call()
  return prices
}

export const presaleMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet'
    }
  }

  const leaf = keccak256(window.ethereum.selectedAddress)
  const proof = merkleTree.getHexProof(leaf)

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root)

  if (!isValid) {
    return {
      success: false,
      status: 'Invalid Merkle Proof - You are not on the whitelist'
    }
  }

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )

  // Set up our Ethereum transaction
  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(prices * mintAmount), 'ether')//config.price * mintAmount), 'ether')
    ).toString(16), // hex
    data: nftContract.methods
      .presaleMint(window.ethereum.selectedAddress, mintAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://andromeda-explorer.metis.io/tx/${txHash}`} target="_blank">
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://andromeda-explorer.metis.io/tx/${txHash}`}</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: 'Nooo Something went wrong: ' + error.message
    }
  }
}







export const publicMint = async (mintAmount, price) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'Wen mint? wen wallet will be connected'
    }
  }

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )
  const pricu = Number.parseFloat(nftContract.methods.price())

  // Set up our Ethereum transaction
  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    value: parseInt(price* mintAmount).toString(16),//String(pricu//config.price * mintAmount).toFixed(
      //,'ether')
      //web3.utils.toWei(String(pricu * mintAmount), 'ether')//config.price * mintAmount), 'ether')
    //).toString(16), // hex
    data: nftContract.methods.publicSaleMint(mintAmount).encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://andromeda-explorer.metis.io/tx/${txHash}`} target="_blank">
          <p>✅ Check out your transaction on block explorer:</p>
          <p>{`https://andromeda-explorer.metis.io/tx/${txHash}`}</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: 'Nooo, Something went wrong: ' + error.message
    }
  }


}

const ranking = require('/ranking.json');

export const getrare = async () => {
   // avois refresh page
    if (document.getElementById("form").value>=1 && document.getElementById("form").value<=4111) {
        alert(ranking.rarity[document.getElementById("form").value-1]["Rank."])
    } else {
    }


   // const rar=ranking.rarity[document.getElementById("form").value-1]["Rank."]
    
    return 
  } 