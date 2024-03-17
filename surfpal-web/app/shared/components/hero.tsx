import React from "react"

const Hero = () => {
    return(
        <div className="w-full bg-gray-900 dark">
            <div className="relative pt-10 pb-10 md:pt-20 md:pb-16">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16 border border-red flex flex-col space-y-7">
                    <div className="text-primaryPurple text-xl">Image Recognition </div>
                    <div className="text-primaryPurple text-xl">Summarization</div>
                    <div className="text-primaryPurple text-xl">Navigation Assistance</div>
                    <p className="text-xl text-white mb-8" data-aos="fade-up" 
                        data-aos-delay="200">
                        SurfPal helps you to summarize any piece of text and Recognize the Images in the website 
                        and also helps to Navigates into relevant links with in website.And mainly user can customize their profile according to their preferences.

                    </p>
                </div>
                
            </div>
            
            <div className="relative pt-5 pb-5 md:pt-10 md:pb-8 flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-6 px-12 rounded">
                    Download
                </button>
            </div>
        </div>
    )
}
export default Hero