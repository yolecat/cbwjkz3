import { useState, useEffect } from 'react'
import Link from 'next/link'

import { initOnboard } from '../utils/onboard'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { config } from '../dapp.config'
import {
  getTotalMinted,
  getMaxSupply,
  isPausedState,
  isPublicSaleState,
  isPreSaleState,
  presaleMint,
  getPrice,
  publicMint,
  getrare
} from '../utils/interact'

export default function Index() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const [maxSupply, setMaxSupply] = useState(0)
  const [price, setPrice] = useState(10000000000000000)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMintAmount, setMaxMintAmount] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isPublicSale, setIsPublicSale] = useState(false)
  const [isPreSale, setIsPreSale] = useState(false)


  const [status, setStatus] = useState(null)
  const [mintAmount, setMintAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [onboard, setOnboard] = useState(null)

  useEffect(() => {
    setOnboard(initOnboard)
  }, [])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets])

  useEffect(() => {
    if (!onboard) return

    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true
          }
        })
      }

      setWalletFromLocalStorage()
    }
  }, [onboard, connect])

  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply())
      setTotalMinted(await getTotalMinted())
      setPrice(await getPrice())
      setPaused(await isPausedState())
      setIsPublicSale(await isPublicSaleState())

      setMaxMintAmount(
        config.maxMintAmount
      )
      
    }

    init()
  }, [])

  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1)
    }
  }

  const presaleMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await presaleMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }
  const publicMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await publicMint(mintAmount,price)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }


  return (
    <>      

    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background ">

     
        <img
          src="/images/blur.jpeg"
          className="animate-pulse-slow absolute top-[460px] inset-auto block w-full min-h-full object-cover"
        />
        <img
          src="/images/blur.jpeg"
          className="animate-pulse-slow absolute top-[960px] inset-auto block w-full min-h-full object-cover"
        />
        <img
          src="/images/blur.jpeg"
          className="animate-pulse-slow absolute top-[1920px] inset-auto block w-full min-h-full object-cover"
        />
           <img
          src="/images/blur.jpeg"
          className="animate-pulse-slow absolute inset-auto block w-full min-h-full object-cover"
        />
         <img
          src="/images/blur.jpeg"
          className="animate-pulse-slow absolute top-[00px] inset-auto block w-full min-h-full object-cover"
        />
        <img
          src="/images/blur.jpeg"
          className="animate-pulse-slow absolute top-[2700px] inset-auto block w-full min-h-full object-cover"
        />
       <img
          src="/images/stars.png"
          className="animate-pulse-slow absolute top-[0px] block w-full min-h-fit object-cover opacity-90"
        />
        
        <img
          src="/images/stars.png"
          className="animate-pulse-slow absolute top-[960px] block w-full min-h-fit object-cover opacity-90"
        />  
        <img
          src="/images/stars.png"
          className="animate-pulse-slow absolute top-[1920px] block w-full min-h-fit object-cover opacity-90"
        />
        <img
          src="/images/stars.png"
          className="animate-pulse-slow absolute top-[2880px] block w-full min-h-fit object-cover opacity-90"
        /> 
        <img
          src="/images/stars.png"
          className="animate-pulse-slow absolute top-[3840px] block w-full min-h-fit object-cover opacity-90"
        /> 
        <img
          src="/images/stars.png"
          className="animate-pulse-slow absolute top-[4800px] block w-full min-h-fit object-cover opacity-90"
        /> 
        <img
            src="/images/grid_22.png"
            className=" absolute top-[860px] block w-full min-h-fit object-cover opacity-20"
        />
        <img
            src="/images/grid_22.png"
            className=" absolute top-[1940px] block w-full min-h-fit object-cover opacity-20"
        />
        <img
            src="/images/grid_22.png"
            className=" absolute top-[3020px] block w-full min-h-fit object-cover opacity-20"
        />
        <img
            src="/images/grid_22.png"
            className=" absolute top-[4100px] block w-full min-h-fit object-cover opacity-20"
        />
        <img
            src="/images/grid_22.png"
            className=" absolute top-[5180px] block w-full min-h-fit object-cover opacity-20"
        />
        <img
          src="/images/Synthwave_floor2.png"
          className="animate-pulse-slow  absolute top-[000px] inset-auto block w-full min-h-full object-cover"
        />
        <img
          src="/images/Synthwave_sol.png"
          className="photo5 animate-pulse-slow  absolute top-[-500px] inset-auto block w-full min-h-full object-cover"
        />
        <img
            src="/images/palms.png"
            className="absolute right-[-100px] top-[300px] block photo2 opacity-100"
        />
        <img
            src="/images/palms.png"
            className="absolute left-[-100px] top-[370px] block photo2 opacity-100"
        />
      <div className="relative w-full h-full flex flex-col items-center justify-center">

        <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
          <div className="relative z-1 md:max-w-3xl w-full bg-gray-900/90 filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center opacity-90">
            
  
            {wallet && (
              <button
                className="absolute right-4 bg-brand-blue transition duration-200 ease-in-out font-chalk border-2 border-[rgba(0,0,0,1)] shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none px-4 py-2 rounded-md text-sm text-black tracking-wide uppercase"
                onClick={() =>
                  disconnect({
                    label: wallet.label
                  })
                }
              >
                Disconnect
              </button>
            )}
            <h1 className="font-coiny uppercase font-bold text-4xl md:text-5xl bg-gradient-to-br from-brand-blue to-brand-green bg-clip-text text-transparent">
            <img 
            src="/images/logo_transparent.png"
            className="photo7 relative item-center absolute top-[-50px] block w-full min-h-fit object-cover opacity-90"
            />
            </h1>
            <h1 className="absolute top-[250px] font-coiny uppercase font-bold text-3xl md:text-4xl bg-gradient-to-br from-brand-blue to-brand-green bg-clip-text text-transparent">
              {paused ? 'Mint paused' : 'Mint LIVE'}
            </h1>
            <h3 className="absolute top-[300px] text-sm text-pink-200 tracking-widest">
              {wallet?.accounts[0]?.address
                ? wallet?.accounts[0]?.address.slice(0, 8) +
                  '...' +
                  wallet?.accounts[0]?.address.slice(-4)
                : ''}
            </h3>

            <div className="absolute top-[325px] h-full w-full container max-w-5xl mx-auto flex flex-col items-center pt-4">
                    <div className="flex flex-col items-center max-w-4xl w-full">
                      <Link href="/mint" passHref>
                        <a className="mt-1 font-coiny uppercase inline-flex items-center px-6 oy-2 text-sm sm:text-2xl md:text-3xl font-medium text-center rounded text-white bg-brand-pink hover:bg-brand-blue hover:text-brand-pink">
                          Check Rarity
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 ml-2 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </a>
                      </Link>
                    </div>
            </div>
            

            <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
              <div className="relative w-full">
                <div className="font-coiny z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-brand-purple rounded-md flex items-center justify-center text-white font-semibold">
                  <p>
                    <span className="text-brand-blue">{totalMinted}</span> /{' '}
                    {maxSupply}
                  </p>
                </div>

                <img
                  src="/images/cyberwojak1.png"
                  className="object-cover w-full sm:h-[315px] md:w-[500px] rounded-md"
                />
              </div>

              <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-0 ">
                <div className="font-coiny flex items-center justify-between w-full relative z-35 ">
                
                  <button
                    className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                    onClick={incrementMintAmount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>

                  <p className="flex items-center justify-center flex-1 grow text-center font-bold text-brand-blue text-3xl md:text-4xl">
                    {mintAmount}
                  </p>

                  <button
                    className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                    onClick={decrementMintAmount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-pink-200 tracking-widest mt-3">
                  Max Mint Amount: {maxMintAmount}
                </p>

                <div className="border-t border-b py-4 mt-16 w-full">
                  <div className="w-full text-xl font-coiny flex items-center justify-between text-brand-yellow">
                    <p>Total</p>

                    <div className="flex items-center space-x-3">
                      <p>
                        {Number.parseFloat(price * 1e-18* mintAmount).toFixed(
                          3
                        )}{' '}
                        Metis
                      </p>{' '}
                      <span className="text-gray-400">+ GAS</span>
                    </div>
                  </div>
                </div>

                {/* Mint Button && Connect Wallet Button */}
                {wallet ? (
                  <button
                    className={` ${
                      paused || isMinting
                        ? 'bg-gray-900 cursor-not-allowed'
                        : 'bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg hover:shadow-pink-400/50'
                    } font-coiny mt-12 w-full px-6 py-3 rounded-md text-2xl text-white mx-4 tracking-wide uppercase`}
                    disabled={paused || isMinting}
                    onClick={publicMintHandler}
                  >
                    {isMinting ? 'Minting...' : 'Mint'}
                  </button>
                ) : (
                  <button
                    className="z-20 font-coiny mt-12 w-full bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg px-6 py-3 rounded-md text-2xl text-white hover:shadow-pink-400/50 mx-4 tracking-wide uppercase"
                    onClick={() => connect()}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>

            {/* Status */}
            {status && (
              <div
                className={`border ${
                  status.success ? 'border-brand-blue' : 'border-brand-pink-400 '
                } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
              >
                <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                  {status.message }
                </p>
              </div>
            )}

            {/* Contract Address */}
            <div className="border-t border-gray-800 flex flex-col items-center mt-10 py-2 w-full">
              <h3 className="font-coiny text-2xl text-brand-pink uppercase mt-2">
                Verified Contract
              </h3>
              <a
                href={`https://andromeda-explorer.metis.io/address/${config.contractAddress}#readContract`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 mt-2"
              >
                <span className="break-all ...">{config.contractAddress}</span>
              </a>
              <h1 className="font-coiny uppercase font-bold text-3xl md:text-4xl bg-gradient-to-br from-brand-green to-brand-blue bg-clip-text text-transparent mt-3">
                ↓ Why mint? ↓
              </h1>
              <h2 className="font-coiny uppercase font-bold text-2xl md:text-3xl text-brand-pink mt-8">
                GAME ACCESS
              </h2>
              <a className="text-white mt-3">
                Minting CyberWojakz NFTs will allow you to play the game to be released, in which you will be able to mint exclusive NFTs. If you don’t own NFTs from the classic 4111 collection, you will only be able to get exclusive ones by buying them on the secondary market. Exclusive NFTs will grant you special accesses and bonuses under various forms (cannot tell you more just now).
              </a>
              <img
                  src="/images/DICE2.png"
                  className="object-cover sm:h-[600px] md:w-[400] rounded-md mt-4"
                />
              <h3 className="font-coiny uppercase font-bold text-2xl md:text-3xl text-brand-pink mt-8">
                The game
              </h3>
                <a className="text-white mt-3">
                  The game is a story game. A story game is where you read a story, and try to find an information within it, in order to get a reward.
                </a>
                <a className="text-white mt-3">
                  The CyberWojakz story is split over 10 parts.
                </a>
                <a className="text-white mt-3">
                  Each part has can be unlocked under 2 conditions:
                </a>
                <a className="text-white mt-3">
                  1. Finding the password hidden in the previous part
                </a>
                <a className="text-white mt-3">
                  2. Holding the required amount of CyberWojakz NFTs.
                </a>
                <a className="text-white mt-3">
                  How to play the game:
                </a>
                <a className="text-white mt-3">
                  ⇨ Access the first part by holding 1 CyberWojakz NFT
                </a>
                <a className="text-white mt-3">
                  ⇨ Read that part of the story
                </a>
                <a className="text-white mt-3">
                  ⇨ Find the password from that part of the story
                </a>
                <a className="text-white mt-3">
                This will unlock the reward:
                </a>
                <a className="text-white mt-3">
                ✅ 1 Exclusive CyberWojakz NFT
                </a>
                <a className="text-white mt-3">
                  ⇨ Unlock the next part of the story  
                </a>
                <a className="text-white mt-3">
                  ⇨ Hold the required amount of CyberWojakz NFTs to play the next part of the story.
                </a>
                <img
                  src="/images/Game_theory.png"
                  className="object-cover sm:h-[600px] md:w-[400] rounded-md mt-4"
                />
              <h2 className="font-coiny uppercase font-bold text-2xl md:text-3xl text-brand-blue mt-8">
                ART
              </h2>
              <a className="text-white mt-3">
              The art is of great quality. Made by talented artists, each CyberWojakz NFT is 2960×2960 pixels. There are 4111 total unique classic CyberWojakz NFTs, amongst which 7 legendaries.
              Waiting for the rarity tool when the whole collection will be minted, check your CyberWojakz rank and rarity on the rarity page (link top of page).
              </a>
              <img
                  src="/images/GIF2.gif"
                  className="object-cover sm:h-[315px] md:w-[315] rounded-md mt-4"
                />
                <a className="text-white mt-4">
                  The art design is from the original Wojak meme. Face expressions, backgrounds, accessories, have all been inspired by the Wojak meme icon, simply revisited in a Synthwave style, which we think is cool :)
                </a>
                <h3 className="font-coiny uppercase font-bold text-2xl md:text-3xl text-brand-blue mt-8">
                7 Legendaries
              </h3>
              <a className="text-white mt-4">
                7 super dope legendaries with unique traits are hidden into the mint. 
              </a>
              <img
                  src="/images/legendaries_cyberwojakz.png"
                  className="object-cover sm:h-[315px] md:w-[315] rounded-md mt-4"
                />
              <h2 className="font-coiny uppercase font-bold text-2xl md:text-3xl text-brand-pink mt-8">
                ARPDORI
              </h2>
              <a className="text-white mt-3">
                ?????
              </a>
              <h2 className="font-coiny uppercase font-bold text-2xl md:text-3xl text-brand-blue mt-8">
                Tokenomics
              </h2>
              <img
                  src="/images/Tokenomics.png"
                  className="object-cover sm:h-[315px] md:w-[315] rounded-md mt-4"
                />
              <a className="text-white mt-3">
                50% is for the team. After the orignal investment gets reached, funds can be allocated to the project. This allocation for tokenomics is approximative, we intend to BUIDL on the project, in the interest of the community.
              </a>
              <a className="text-white mt-3">
                20% for future developments. We intend to grow our team with new dev(s) to come up with great dapps and smart contracts expertise.
              </a>
              <a className="text-white mt-3">
                20% marketing. Part of the growth of the project, get visbility, reach more people, which grows the community.
              </a>
              <a className="text-white mt-3">
                10% mini games. Allocated for the specific developments of mini games. Mini games are small dapps made for the community, meaning we wont earn anything from it. The goal is to build a nice and warm CyberWojakz ecosystem, with multiple ways to interact within the project. an example of mini game would be a casino dapp where NPCs can play to earn internet money.
              </a>

              <h2 className="font-coiny uppercase font-bold text-2xl md:text-3xl text-brand-blue mt-8">
                METIS FAM
              </h2>
              <a className="text-white mt-3">
                Metis network is a family. We believe Metis will become a major player in the future, that is why we are here, but also because Metis has built a solid community. We created the CyberWojakz for Metis community. indeed, after all the copycat NFTs released at early stages, we wanted to bring an orignal collection, based on a famous crypto meme currently missing on Metis: the Wojak. We intend to become a meme reference on Metis, building for the community. Many ideas crosses our minds (mini games) to implement as a way for the community to stay engaged with the project but also to create a real interest, on top of the actual game. Holders and early comers will always be rewarded first.
              </a>
              <img
                  src="/images/metis.png"
                  className="object-cover sm:h-[250px] md:w-[250] rounded-md mt-4"
                />
            </div>

          </div>
        </div>

      </div>
      <div className='w-100 h-100'>
      <a href="https://cyberwojakz.io/" target="_blank" rel="noreferrer">
        <img
            src="/images/logo_transparent.png"
            className="absolute left-[450px] top-[5700px] block photo2 opacity-100"
        />
            
      </a>
      <img
          src="/images/Synthwave_floor2.png"
          className="animate-pulse-slow left-[0px] item-center absolute top-[5500px] inset-auto block w-full min-h-full object-cover"
        />

               
            </div>
          
    </div>

    </>

  )
}

