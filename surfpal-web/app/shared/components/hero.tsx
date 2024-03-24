'use client'

import Link from "next/link"
import React from "react"
import Typewriter from 'typewriter-effect';
import HeroBg from '@/public/assets/hero-bg.svg';
import Image from "next/image";
import { Kanit } from "next/font/google";
import { Typography } from "@material-tailwind/react";
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
            <div className="relative md:pt-12">
                <div className="w-full mx-auto text-center pb-6 md:pb-16 flex flex-col space-y-7">
                <h1 className="text-5xl text-primaryPurple pt-5">SurfPal</h1>
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