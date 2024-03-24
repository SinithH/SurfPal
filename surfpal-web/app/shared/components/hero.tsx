'use client'

import Link from "next/link"
import React from "react"
import Typewriter from 'typewriter-effect';
import HeroBg from '@/public/assets/hero-bg.svg';
import Image from "next/image";
import { Kanit } from "next/font/google";
import { Typography } from "@material-tailwind/react";
import PuzzlePiece from '@/public/assets/puzzle-piece (1).svg'
import SurfPalLogoGif from '@/public/assets/ezgif.com-animated-gif-maker (2).gif'
import SurfPalLogo from '@/public/assets/varient-3.png'
import useStore from "@/lib/store";


const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})

const Hero = () => {
    const { theme } = useStore();
    
    return(
        <div className={`${kanit.className} ${theme} w-full h-svh dark:text-white dark:bg-darkBg`}>
            <Image src={HeroBg} alt={""} className="fixed top-0 left-0 w-full"></Image>
            <div className="relative md:pt-16">
                <div className="w-full mx-auto text-center items-center pb-6 justify-center md:pb-16 flex flex-col space-y-7">
                    <div className=" w-1/3 flex select-none">
                        {theme === 'dark' ?
                            <Image src={SurfPalLogoGif} alt={""}></Image> :
                            <Image src={SurfPalLogo} alt={""}></Image>
                        }   
                    </div>
                    <Typography className="text-5xl font-bold" placeholder={undefined}>Empowering Accessibility: See Beyond Sight</Typography>
                    <Typography className="text-3xl font-bold" placeholder={undefined}>Navigate, Summerize, Customize & Engage</Typography>
                    {/* <h1 className="text-3xl font-bold text-white">
                        <Typewriter
                                options={{
                                strings:[
                                    "Extension for Your Hard Time",
                                    "Just one Click"
                                ],
                                autoStart: true,
                                loop: true
                            }}/>
                        </h1> */}
                </div>
            </div>
            
            <div className="relative pt-5 pb-5 md:pt-8 md:pb-3 flex items-center justify-center">
                <Link className='text-white bg-primaryPurple py-5 px-6 rounded-full text-xl' href={""}>
                    Download the Extension Now!
                </Link>
            </div>
        </div>
    )
}
export default Hero