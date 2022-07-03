import { useState, useEffect } from 'react'
import Link from 'next/link'


export default function Index() {

    async function Clicked(){
        window.location.href='/home'
        // <Link href="/index" passHref>
        //                 </Link>
    }

    // useEffect(() => {
    //     const handleSpce = (event) => {
    //        if (event.key === " ") {
    //         console.log('Close')
    //       }
    //     };
    //     window.addEventListener('keydown', handleSpce);
    
    //     return () => {
    //       window.removeEventListener('keydown', handleSpce);
    //     };
    //   }, []);

    // const handleSpace= (e) => {
    //     if (e.key === " ") {
    //         window.location.href='/home'
    //     }
    // }

    return (
        <>
        
        <div onClick={Clicked}>

            <video loop autoPlay muted className='absolute w-full h-screen z-0'
                src="/videos/synthwave.mov"
                type="video/mov"
            />
            <img className='left-[450px] top-[100px] photo2 absolute z-10'
                src="/images/logo_transparent.png"
            />
            <h1 className='animate-pulse-fast absolute text-5xl uppercase text-white left-[630px] top-[570px] z-10'>
                start
            </h1>
        </div>
        </>
    )   
}