import React, { useEffect, useState } from 'react';
import feedbackIcon from '@/assets/icons/feedback-icon.svg';
import {Popover,PopoverHandler,PopoverContent,Button,Input,Typography,} from "@material-tailwind/react";
import Image from 'next/image';
import Image1 from '@/assets/icons/star.png';
import ModuleNames from '../../constants/Modules';
import Footer from '../shared/Footer';
import { X } from 'lucide-react';

const FeedBackPopover = ({ onClose }: { onClose: () => void }) => {
  const [rateValue, setRateValue] = useState(0);
	const [isSubmit, setIsSubmit] = useState(false);

	const handleSubmit = () => {
		if (rateValue) {
			setIsSubmit(true);
		}
	};
    const [hover, setHover] = useState('');

return (
    <>
    <div className='w-50 h-100 fixed inset-0 bg-black bg-opacity-100 backdrop-blur-sm flex justify-center'>
      <div className='mt-10 flex flex-col gap-5 text-white'>
        <button onClick={onClose} className='place-self-end'><X size={30}/></button>
        <div className='bg-gray-400 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4 w-50 h-100'>
          <h1 className="text-3xl font-bold">How did we do?</h1>
          <p className="text-black max-w-md text-xl">
                  Rate "SurfPal" from 1-5 Stars <br />(1-Poor, 5-Excellent)
          </p>
          <div className="grid grid-cols-5 gap-5">
                  {[1, 2, 3, 4, 5].map((value) => {
                    return (
                      <div
                        key={value}
                        className={`grid place-content-center  h-12 w-12 rounded-full cursor-pointer  transition-all ${
                          value === rateValue
                            ? "bg-purple-600  text-white"
                            : "text-gray-400 hover:bg-white hover:text-purple-600  bg-zinc-900"
                        }`}
                        onClick={() => setRateValue(value)}
                      >
                        {value}
                      </div>
                    );
                  })}
          </div>
          <form>
            <input type="text" placeholder='Enter Your FeedBack' required
            className='w-full px-4 py-3 text-black border-black rounded-md'/>
          </form>
          <div className='grid grid-cols-2 pt-15 gap-x-5 px-10 sm:grid-cols-1'>
                  <div className='flex justify-start sm:justify-center'>
                    <button
                      className="w-full bg-purple-800 rounded-xl py-4 px-7 hover:bg-white hover:text-black transition-all"
                      onClick={handleSubmit}>
                      Cancel
                    </button>
                  </div>
                  <div className='flex justify-end sm:justify-center sm:pt-3'>
                    <button 
                      className="w-full bg-purple-800 rounded-xl py-4 px-7 hover:bg-white hover:text-black transition-all"
                      onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="flex justify-center pt-5">
    <Popover placement="bottom">
      <PopoverHandler>
        <Button placeholder={undefined} >
        <div className={`inline-flex items-center gap-2 mt-2 px-2 py-1 cursor-pointer w-fit rounded-full justify-self-end ${hover}`}>
        <span className='text-sm'>Give Feedback</span>
        <img src={feedbackIcon} alt="Feedback" className='w-5 h-5' />
        </div>
        </Button>
      </PopoverHandler>

      <PopoverContent className="w-70% h-1000 border border-black flex justify-center" placeholder={undefined}>
       <Typography placeholder={undefined}>
           
          <div className="w-96 h-96 whitespace-nowrap overflow-hidden transition-all">
            <div
              className="inline-block break-words align-top whitespace-normal transition-all h-96 w-96"
              style={{
              transform: isSubmit
              ? "translateX(-100%)"
              : "translateX(0%)",
              }}>

            </div>
            <div className="w-96 h-96 p-5 rounded-3xl text-white flex flex-col gap-8"
                style={{ background: "#222731",}}>
                      <h1 className="text-2xl font-bold">How did we do?</h1>
              <p className="text-gray-400 text-lg">
                Rate "SurfPal" from 1-5 Stars(1-Poor, 5-Excellent)
              </p>
              <div className="grid grid-cols-5 gap-5">
                {[1, 2, 3, 4, 5].map((value) => {
                  return (
                    <div
                      key={value}
                      className={`grid place-content-center  h-12 w-12 rounded-full cursor-pointer  transition-all ${
                        value === rateValue
                          ? "bg-purple-600  text-white"
                          : "text-gray-400 hover:bg-white hover:text-purple-600  bg-zinc-900"
                      }`}
                      onClick={() => setRateValue(value)}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
              <div className='grid grid-cols-2 pt-16 gap-x-4'>
                <div className='flex justify-start'>
                  <button
                    className="w-full bg-purple-600 rounded-xl py-2 hover:text-black-500 transition-all"
                    onClick={handleSubmit}>
                    Cancel
                  </button>
                </div>
                <div className='flex justify-end'>
                  <button 
                    className="w-full bg-purple-600 rounded-xl py-2 hover:bg-white hover:text-purple-600 transition-all"
                    onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Typography>
      </PopoverContent>
    </Popover>
    <Footer module={ModuleNames.FEED_BACK}/>
    </div> */}
    </>
);
}
export default FeedBackPopover;