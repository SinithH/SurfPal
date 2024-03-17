'use client'

import Link from "next/link"
import React from "react"
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return(
        <div className="w-full bg-gray-900 dark">
            <div className="relative pt-10 pb-10 md:pt-20 md:pb-16">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16 border border-red flex flex-col space-y-7">
                {/* <TypeAnimation
                sequence={[
                    'SurfPal'
                ]}
                wrapper="span"
                speed={10}
                style={{ fontSize: '4.5rem', display: 'inline-block' }}
                repeat={Infinity}
                /> */}
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