
import { useState, useEffect } from 'react'
import Link from 'next/link'

import {
    getTotalMinted,
  } from '../utils/interact'

  import { ProgressBar } from "react-progressbar-fancy";

export default function Mint() {

    const [Rank, setRank] = useState(0)
    const [Background, setBackground] = useState(0)
    const [Skin, setSkin] = useState(0)
    const [Tattoo, setTattoo] = useState(0)
    const [Face, setFace] = useState(0)
    const [Clothes, setClothes] = useState(0)
    const [Necklace, setNecklace] = useState(0)
    const [Eyewear, setEyewear] = useState(0)
    const [Accessory, setAccessory] = useState(0)
    const [totalMinted, setTotalMinted] = useState(0)
    const [rarityScore, setrarityScore] = useState(0)

    const [value, setvalue] = useState(0)
    const [Pcolor, setPcolor] = useState('snow')
    const [Scolor, setScolor] = useState('snow')
    const [rarityLabel, setRarityLabel] = useState('Rarity')
    const [URL, setURL] = useState('https://ipfs.io/ipfs/QmUpKATSRkTg4PUKUNuDBEAUSit3yUf4Dxf7PYLfV6R2yB/562.png')
    const [ID, setID] = useState('x')



    // handle form for ranking check
    async function getrare() {
      const ranking = require('/ranking.json')
      setTotalMinted(await getTotalMinted())
      const ID=document.getElementById("forme").value
      setID(ID)
      if ( ID < totalMinted
          && ID <=4110
          && ID >=0)
          {
              var in_val=ID;
            var Rank_v = ranking.rarity[ID]["Rank"]
            var Background_v = ranking.rarity[ID]["Background"];
            var Skin_v = ranking.rarity[ID]["Skin"];
            var Tattoo_v = ranking.rarity[ID]["Tattoo"];
            var Face_v = ranking.rarity[ID]["Face"];
            var Clothes_v = ranking.rarity[ID]["Clothes"];
            var Necklace_v = ranking.rarity[ID]["Necklace"];
            var Eyewear_v = ranking.rarity[ID]["Eyewear"];
            var Accessory_v = ranking.rarity[ID]["Accessory"];
            var rarityScore_v = ranking.rarity[ID]["Rarity Score"];

          }
          else if(ID <0
                  || ID >4110)
          {
            var in_val=ID;
            var rarityLabel_v = 'input values between 0 and 4110'
            var Rank_v = 0
            var Background_v = 0
            var Skin_v = 0
            var Tattoo_v = 0
            var Face_v = 0
            var Clothes_v = 0
            var Necklace_v = 0
            var Eyewear_v = 0
            var Accessory_v = 0
            var rarityScore_v= 0
          }
          else if(ID >= totalMinted
                  && ID <= 4110
                  && ID >= 0)
          {
            var rarityLabel_v="not minted yet"
            var in_val=ID;
            var Rank_v = 0
            var Background_v = 0
            var Skin_v = 0
            var Tattoo_v = 0
            var Face_v = 0
            var Clothes_v = 0
            var Necklace_v = 0
            var Eyewear_v = 0
            var Accessory_v = 0
            var rarityScore_v = 0
          }

          if (Rank_v <= 4111 && Rank_v > 2000){//1
            var Pcolor_v="snow";
            var Scolor_v="snow";
            var rarityLabel_v = "COMMON"
          }
          else if (Rank_v <= 2000 && Rank_v > 1000){
            var Pcolor_v="lightgreen";
            var Scolor_v="lightgreen";
            var rarityLabel_v = "UNCOMMON"
          }
          else if (Rank_v <= 1000 && Rank_v > 500){
            var Pcolor_v="blue";
            var Scolor_v="blue";
            var rarityLabel_v = "RARE"
          }
          else if (Rank_v <= 500 && Rank_v > 41){//2
            var Pcolor_v="blueviolet"
            var Scolor_v="blueviolet"
            var rarityLabel_v = "ULTRA RARE"
          }
          else if (Rank_v <= 41 && Rank_v >= 7){//34
            var Pcolor_v="orange"
            var Scolor_v="orange"
            var rarityLabel_v = "EPIC"
          }
          else if (Rank_v <= 7 && Rank_v >= 1){//45
            var Pcolor_v="gold"
            var Scolor_v="orangered"
            var rarityLabel_v = "LEGENDARY"
          }
          else {
          var Pcolor_v="snow"
          var Scolor_v="snow"
        }
        var a = document.getElementById("ID1");
        a.style.color = Pcolor_v;
        var URL_v = "https://ipfs.io/ipfs/QmUpKATSRkTg4PUKUNuDBEAUSit3yUf4Dxf7PYLfV6R2yB/"+ID+".png";

      setRank(Rank_v)
      setBackground(Background_v)
      setSkin(Skin_v)
      setTattoo(Tattoo_v)
      setFace(Face_v)
      setClothes(Clothes_v)
      setNecklace(Necklace_v)
      setEyewear(Eyewear_v)
      setAccessory(Accessory_v)
      setrarityScore(rarityScore_v)

      setvalue(in_val)
      setPcolor(Pcolor_v)
      setScolor(Scolor_v)
      setRarityLabel(rarityLabel_v)
      setURL(URL_v)



    }


    const handleClick = e => {
        e.preventDefault()
        getrare()
      }

      useEffect(() => {
        const init = async () => {
          setTotalMinted(await getTotalMinted())
        }
        init()
      }, [])
    


    return (
        <>



    <div className="w-full flex justify-center items-center h-screen text-brand-blue bg-brand-background">
        <div className="relative w-full h-full flex flex-col items-center justify-center z-0">
     
          <div className="flex flex-col mt-[-660px] items-center max-w-4xl w-full absolute z-30">
            <Link href="/" passHref>
              <a className="mt-0 font-coiny uppercase inline-flex items-center px-6 oy-2 text-sm sm:text-2xl md:text-3xl font-medium text-center rounded text-white bg-brand-blue hover:bg-brand-pink hover:text-brand-blue">
                Back to mint
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
                    strokeWIDth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </Link>
          </div>
        <img
          src="/images/blur.jpeg"
          className=" animate-pulse-slow absolute inset-auto block w-full min-h-full opacity-100"
        />
        
        <img
            src="/images/stars.png"
            className="animate-pulse-slow absolute top-[0px] block w-full min-h-fit object-cover opacity-90"
        />
        <img 
            src="/images/grid_22.png"
            className="animate-pulse-slow absolute top-[0px] block w-full min-h-fit object-cover opacity-5"
        />
        <a href="https://cyberwojakz.io/" target="_blank" rel="noreferrer">
            <img 
            src="/images/logo_transparent.png"
            className="photo left-[10px] absolute top-[-20px] block w-full min-h-fit object-cover opacity-90"
            />
        </a>
               <img
          src="/images/Synthwave_sol.png"
          className="photo8 left-[20px] bottom-[-450px] absolute inset-auto block w-full min-h-full opacity-70"
        />
                <img
            src="/images/Synthwave_floor2.png"
            className=" absolute right-[10px] top-[190px] block w-full min-h-fit object-cover opacity-100"
        /> 
         <img
          src="/images/body_wojak.png"
          className="photo3 left-[-20px] bottom-[-350px] absolute inset-auto block w-full min-h-full opacity-100"
        />
         <img
            src="/images/palms.png"
            className=" photo4 absolute right-[10px] top-[200px] block w-full min-h-fit object-cover opacity-100"
        /> 

        <div className='bg-brand-background w-96 h-128 absolute z-20'>
            {/* Form */}
            <form onSubmit = {handleClick}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className=" md:w px-3 mb-6 md:mb-0 mt-36">
                        <label className="ml-24 block uppercase tracking-wIDe text-brand-blue text-xs font-bold mb-2 mt-56" htmlFor='forme'>
                            input ID [0 to 4110]
                        </label>
                        <input className="ml-24 appearance-none block bg-gray-200 text-black border border-brand-pink rounded py-3 px-1 mb-3 leading-tight focus:outline-none focus:bg-white" ID="forme" type="text" placeholder="0"/>
                        <button
                            className="ml-28 text-center rounded text-white bg-brand-pink transition duration-200 ease-in-out font-chalk border-2 border-[rgba(0,0,0,1)] shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none px-4 py-2 rounded-md text-sm text-white tracking-wIDe uppercase hover:bg-brand-blue hover:text-brand-pink"
                        >
                            Check rarity
                        </button> 
                        <p className="ml-28 mt-3 text-brand-blue text-xs italic">Total minted: {totalMinted} / 4111</p>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3"></div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className='text-4xl flex justify-center items-center'><h1 ID="ID1">{rarityLabel}</h1></div>
            <div className='text-xl flex justify-center items-center'><h1 ID="ID1">CyberWojakz #{ID}</h1></div>
            <div className='ml-16 flex justify-center items-center border border-brand-blue photo'>
                <img src= {URL}/>
            </div>
            <div className='text-xl text-brand-pink flex justify-center items-center mt-2'><h1>RANK: {Rank} / 4111</h1></div>
            <div className='text-brand-blue flex justify-center items-center'><h1>Rarity score: {rarityScore.toFixed(2)}</h1></div>
            
            {/* Progress bars */}
            <div className="App">
                <ProgressBar
                    className="space"
                    label={"Rank: within top -->"}
                    darkTheme
                    score={Number.parseFloat(Rank*100/4111).toFixed(2)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            <div className="App mt-3">
                <ProgressBar
                    className="space"
                    label={"Background"}
                    darkTheme
                    score={Number.parseInt(Background)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            <div className="App mt-3">
                <ProgressBar
                    className="space"
                    label={"Skin"}
                    darkTheme
                    score={Number.parseInt(Skin)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            <div className="App mt-3">
                <ProgressBar
                    className="space"
                    label={"Tattoo"}
                    darkTheme
                    score={Number.parseInt(Tattoo)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            <div className="App mt-3">
                <ProgressBar
                    className="space"
                    label={"Face"}
                    darkTheme
                    score={Number.parseInt(Face)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            <div className="App mt-3">
                <ProgressBar
                    className="space"
                    label={"Clothes"}
                    darkTheme
                    score={Number.parseInt(Clothes)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            <div className="App mt-3">
                <ProgressBar
                    className="space"
                    label={"Necklace"}
                    darkTheme
                    score={Number.parseInt(Necklace)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            <div className="App mt-3">
                <ProgressBar
                    className="space"
                    label={"Eyewear"}
                    darkTheme
                    score={Number.parseInt(Eyewear)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            <div className="App mt-3">
                <ProgressBar
                    className="space"
                    label={"Accessory"}
                    darkTheme
                    score={Number.parseInt(Accessory)}
                    primaryColor = {Pcolor}
                    secondaryColor = {Scolor}
                />
            </div>
            </div>
        </div>
            <p>   </p>
        </div>

      </>
        )

}