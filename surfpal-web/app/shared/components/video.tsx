'use client'

import { Carousel, Typography} from "@material-tailwind/react";
import Image from 'next/image';
import Image1 from '@/public/assets/icons/image10.png';
import Image2 from '@/public/assets/icons/image11.png';
import Image3 from '@/public/assets/icons/image12.png';
import Image4 from '@/public/assets/icons/image13.png';
import React from "react"

const Video = () => {
    return(
        <div className="w-full bg-gray-900 dark">
        <Carousel className="rounded-xl " placeholder={undefined}>
        <div className="relative h-500 w-500">
        <Image src={Image1} alt="Description"/>
          <div className="absolute inset-0 grid h-800 w-1000 place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl" placeholder={undefined}
              >
                Summarization
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80" placeholder={undefined}
              >
                For reading long texts and websites hardly you have to devote your valuable time.
                It's over now. You can have Quality,Brief and Smooth Summary with in small time. Just need to Download
                SurfPal extension and start your summarization.
              </Typography>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
        <Image src={Image2} alt="Description"/>
          <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl" placeholder={undefined}
              >
                Image Recognition
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80" placeholder={undefined}
              >
                When reading long texts and websites, you will receive many images and you have to understand what it is!.
                It's also time vesting. SurfPal will save your time in Image Recognition. You can easily recognize each and every
                image in that relevant website.
              </Typography>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
        <Image src={Image3} alt="Description"/>
          <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
            <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl" placeholder={undefined}
              >
                Navigation Assistance
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80" placeholder={undefined}
              >
                Reading a website and finding relevant links which you wants to navigate is 
                consuming your valuable time. But SurfPal will collect the all links in your current webpage
                and easily you can navigate through them.
              </Typography>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
        <Image src={Image4} alt="Description"/>
          <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
            <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl" placeholder={undefined}
              >
               Customization - Customize the extension
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80" placeholder={undefined}
              >
                You can customize the extension according to your needs or remove added features as your preferences. 
                You have full control over how SurfPal looks like.
                Download SurfPal and experience it for yourself.
              </Typography>
            </div>
          </div>
        </div>
        </Carousel>
      </div>
    );
    
}
export default Video