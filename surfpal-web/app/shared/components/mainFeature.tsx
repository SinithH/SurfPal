import React from "react"
import Image from 'next/image';
import Image1 from '@/public/assets/icons/image1.png';
import Image2 from '@/public/assets/icons/image3.png';
import Image3 from '@/public/assets/icons/image4.png';
import Image4 from '@/public/assets/icons/image7.png';
const MainFeatures = () => {
    
    const { theme } = useStore();
    
  return (
    <div className={`${kanit.className} ${theme} w-full dark:bg-gray-900 `}>
      <section id="mainFeatures" className="relative w-full flex justify-center">
        <div className="relative md:container px-4 sm:px-6">
          <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="py-12 md:py-20 border-gray-800">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                  <div className="inline-flex text-base font-normal py-3 px-5 m-4 text-green-600 bg-green-200 rounded-full mb-4">
                    {" "}
                    All Features with SurfPal in Detail - Single platform,
                    endless outputs
                  </div>
                  <p className="text-xl dark:text-gray-400 font-medium">
                    Summarizing web site, Image Recognition, Navigation
                    Assistance and in additionally User can customize the
                    profile.
                  </p>
                </div>
                <div className="grid gap-20">
                    <div className="md:grid md:grid-cols-5 md:gap-6 items-center p-8 bg-carouselLightBg dark:bg-carouselDarkBg rounded-tr-3xl rounded-bl-3xl">
                        <div className="w-full md:col-span-2 flex justify-center">
                            <Image
                                src={Summerization}
                                alt="Description"
                                className=""
                            />
                        </div>
                        <div className="w-full md:col-span-3">
                            <div className="">
                                <div className="text-xl text-purple-600 mb-2">
                                Summarization
                                </div>
                                <p className="text-xl text-gray-400 font-medium">Summarizing web site, Image Recognition,Navigation Assistance and in additionally User can customize the profile.
                                </p>
                            </div>
                            <div className="grid gap-20 pl-20">
                                    <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                                        <Image src={Image1} alt="Description" className="pr-120" />
                                        </div>
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                                                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                                                    <div className="font-architects-daughter text-xl text-purple-600 mb-2">Summarization 
                                                    </div>
                                                        <h3 className="h3 mb-3 text-white">100% Automatic Website Summarization with just a one click</h3>
                                                        <p className="text-xl text-gray-400 mb-4">For reading long texts and websites hardly you have to devote your valuable time.
                                                            It's over now. You can have Quality,Brief and Smooth Summary with in small time. Just need to Download
                                                            SurfPal extension and start your summarization.</p>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                                        <Image src={Image2} alt="Description" className="pr-120" />
                                        </div>
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                                                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                                                    <div className="font-architects-daughter text-xl text-purple-600 mb-2">Navigation Assistance
                                                    </div>
                                                        <h3 className="h3 mb-3 text-white">Navigation Assistance - for all the sites in websites</h3>
                                                        <p className="text-xl text-gray-400 mb-4">Reading a website and finding relevant links which you wants to navigate is 
                                                            consuming your valuable time. But SurfPal will collect the all links in your current webpage
                                                            and easily you can navigate through them.</p>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                                        <Image src={Image3} alt="Description" className="w-300 h-300" />
                                        </div>
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                                                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                                                    <div className="font-architects-daughter text-xl text-purple-600 mb-2">Image Recognition
                                                    </div>
                                                        <h3 className="h3 mb-3 text-white">Recognizing all the images in websites</h3>
                                                        <p className="text-xl text-gray-400 mb-4">When reading long texts and websites, you will receive many images and you have to understand what it is!.
                                                            It's also time vesting. SurfPal will save your time in Image Recognition. You can easily recognize each and every
                                                            image in that relevant website.</p>
                                                </div>
                                        </div>
                                    
                                    </div>
                                    <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                                        <Image src={Image4} alt="Description" className="pr-120" />
                                        </div>
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                                                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                                                    <div className="font-architects-daughter text-xl text-purple-600 mb-2">My Account
                                                    </div>
                                                    <h3 className="h3 mb-3 text-white">Customization - Customize the extension</h3>
                                                    <p className="text-xl text-gray-400 mb-4">You can customize the extension according to your needs or remove added features as your preferences. 
                                                        You have full control over how SurfPal looks like.
                                                        Download SurfPal and experience it for yourself.</p>
                                                </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </section>
        </div>
    )
}
export default MainFeatures