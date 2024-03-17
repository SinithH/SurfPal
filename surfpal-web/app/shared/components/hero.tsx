'use client'

import Link from "next/link"
import React from "react"
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return(
        <div className="w-full bg-gray-900 dark">
            <div className="relative md:pt-12">
                <div className="max-w-3xl mx-auto text-center pb-6 md:pb-16 flex flex-col space-y-7">
                <h1 className="text-5xl font-style: italic font-bold letter-spacing: 0.1em text-primaryPurple pt-5">SurfPal</h1>
                <h1 className="text-3xl font-bold text-white">
                    <Typewriter
                            options={{
                            strings:[
                                "Extension for Your Hard Time",
                                "Just one Click"
                            ],
                            autoStart: true,
                            loop: true
                        }}/>
                    </h1>
                </div>
            </div>
            
            <div className="relative pt-5 pb-5 md:pt-10 md:pb-8 flex items-center justify-center">
                <Link className='text-white bg-primaryPurple py-5 px-6 rounded-full text-xl' href={""}>
                    Download
                </Link>
            </div>
        </div>
    )
}
export default Hero