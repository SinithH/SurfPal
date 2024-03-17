import React from "react"
import Image from 'next/image';
import Image1 from '@/public/assets/icons/image1.png';
import Image2 from '@/public/assets/icons/image3.jpg';
import Image3 from '@/public/assets/icons/image4.jpg';
import Image4 from '@/public/assets/icons/image3.jpg';
const MainFeatures = () => {
    return(
        <div className="w-full bg-gray-900 dark">
            <section id="mainFeatures" className="relative w-full">
                <div className="relative md:container px-4 sm:px-6">
                <section>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="py-12 md:py-20 border-gray-800">
                            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                                <div className="inline-flex text-base font-semibold py-3 px-5 m-4 text-green-600 bg-green-200 rounded-full mb-4"> All Features with SurfPal in Detail - Single platform, endless outputs
                                </div>
                                <p className="text-xl text-gray-400 font-medium">Summarizing web site, Image Recognition,Navigation Assistance and in additionally User can customize the profile.
                                </p>
                            </div>
                            <div className="grid gap-20">
                                    <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                                        <Image src={Image1} alt="Description" className="w-full h-auto" />
                                        </div>
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                                                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                                                    <div className="font-architects-daughter text-xl text-purple-600 mb-2">Summarization 
                                                    </div>
                                                        <h3 className="h3 mb-3 text-white">100% Automatic Website Summarization with just a one click</h3>
                                                        <p className="text-xl text-gray-400 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                                        </p>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                                        <Image src={Image2} alt="Description" className="w-full h-auto" />
                                        </div>
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                                                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                                                    <div className="font-architects-daughter text-xl text-purple-600 mb-2">Navigation Assistance
                                                    </div>
                                                        <h3 className="h3 mb-3 text-white">Navigation Assistance - for all the sites in websites</h3>
                                                        <p className="text-xl text-gray-400 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <ul className="text-lg text-gray-400 -mb-2">
                                                                <li className="flex items-center mb-2">
                                                                    <span>Lorem Ipsum is simply dummy text</span>
                                                                </li>
                                                                <li className="flex items-center mb-2">
                                                                    <span>Lorem Ipsum is simply dummy text</span>
                                                                </li>
                                                                <li className="flex items-center">
                                                                    <span>Lorem Ipsum is simply dummy text</span>
                                                                </li>
                                                            </ul>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                                        <Image src={Image3} alt="Description" className="w-full h-auto" />
                                        </div>
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                                                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                                                    <div className="font-architects-daughter text-xl text-purple-600 mb-2">Image Recognition
                                                    </div>
                                                        <h3 className="h3 mb-3 text-white">Recognizing all the images in websites</h3>
                                                        <p className="text-xl text-gray-400 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                </div>
                                        </div>
                                    
                                    </div>
                                    <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                                        <Image src={Image4} alt="Description" className="w-full h-auto" />
                                        </div>
                                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                                                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                                                    <div className="font-architects-daughter text-xl text-purple-600 mb-2">My Account
                                                    </div>
                                                    <h3 className="h3 mb-3 text-white">Customization - Customize the extension</h3>
                                                    <p className="text-xl text-gray-400 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                    <ul className="text-lg text-gray-400 -mb-2">
                                                        <li className="flex items-center mb-2"><span>Lorem Ipsum is simply dummy text</span>
                                                        </li>
                                                        <li className="flex items-center mb-2"><span>Lorem Ipsum is simply dummy text</span>
                                                        </li>
                                                        <li className="flex items-center"><span>Lorem Ipsum is simply dummy text</span>
                                                        </li>
                                                    </ul>
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