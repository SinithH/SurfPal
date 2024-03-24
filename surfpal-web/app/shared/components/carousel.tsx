'use client'

import { Carousel, Typography} from "@material-tailwind/react";
import Image from 'next/image';
import Image1 from '@/public/assets/icons/image21.png';
import Image2 from '@/public/assets/icons/image22.png';
import Image3 from '@/public/assets/icons/image23.png';
import Image4 from '@/public/assets/icons/image24.png';
import React from "react"

const CarouselComponent = () => {
    return(
       <div className="w-full h-full dark:bg-gray-900 dark:text-white">
        <Carousel loop={true} autoplay={true} className="rounded-xl w-500 min-h-52 py-10 dark:bg-black/75 bg-carouselLightBg" placeholder={undefined}>
        <div className="relative w-full h-full ">
        <Image src={Image1} alt="Description" className="object-fit: cover" />
          <div className="absolute inset-0 grid w-full place-items-center">
            <div className="w-3/4 text-center md:w-2/4 grid justify-self-end">
              <Typography
                variant="h1"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl text-left" placeholder={undefined}
              >
                Summarization
              </Typography>
              <Typography
                variant="lead"
                className="mb-12 text-left w-3/4 pt-5" placeholder={undefined}
              >
                For reading long texts and websites hardly you have to devote your valuable time.
                It's over now. You can have Quality,Brief and Smooth Summary with in small time. Just need to Download
                SurfPal extension and start your summarization.
              </Typography>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full ">
        <Image src={Image2} alt="Description" className="object-fit: cover"/>
          <div className="absolute inset-0 grid w-full place-items-center justify-center">
            <div className="w-3/4 md:w-2/4 grid justify-self-end">
              <Typography
                variant="h1"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl text-left" placeholder={undefined}
              >
                Image Recognition
              </Typography>
              <Typography
                variant="lead"
                className="mb-12 text-left w-3/4 pt-5" placeholder={undefined}
              >
                When reading long texts and websites, you will receive many images and you have to understand what it is!.
                It's also time vesting. SurfPal will save your time in Image Recognition. You can easily recognize each and every
                image in that relevant website.
              </Typography>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full ">
        <Image src={Image3} alt="Description" className="object-fit: cover"/>
          <div className="absolute inset-0 grid w-full place-items-center justify-center">
            <div className="w-3/4 md:w-2/4 grid justify-self-end">
              <Typography
                variant="h1"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl text-left" placeholder={undefined}
              >
                Navigation Assistance
              </Typography>
              <Typography
                variant="lead"
                className="mb-12 text-left w-3/4 pt-5" placeholder={undefined}
              >
                Reading a website and finding relevant links which you wants to navigate is 
                consuming your valuable time. But SurfPal will collect the all links in your current webpage
                and easily you can navigate through them.
              </Typography>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full ">
        <Image src={Image4} alt="Description" className="object-fit: cover"/>
          <div className="absolute inset-0 grid w-full place-items-center justify-center">
            <div className="w-3/4 md:w-2/4 grid justify-self-end">
              <Typography
                variant="h1"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl text-left" placeholder={undefined}
              >
               Customization - Customize the extension
              </Typography>
              <Typography
                variant="lead"
                className="mb-12 text-left w-3/4 pt-5" placeholder={undefined}
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
export default CarouselComponent