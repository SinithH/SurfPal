import Link from 'next/link'
import React, { useState } from 'react'
import Image1 from '@/public/assets/icons/image6.png';
import Image2 from '@/public/assets/icons/hamburger.png';
import Image from 'next/image';

const Header = () => {

  const[toggle,setToggle]=useState(false)
  const handleClick = ()=> setToggle(!toggle)

  const links = [
    {}
  ]
  
  return (

    <div className='w-full h-[80px] bg-gray-800 dark top-0 z-50'>
        <div className='md:max-w-[1480px] max-w-[600px] m-auto w-full h-full '>
            <div className='hidden md:flex justify-center items-center space-x-5 pt-5'>
              <img src="image" alt="logo" className='h-[25px]'/>
              {/* <button className='pr-8 py-3 flex justify-between items-center bg-[#97b2d7] px-6 gap-5 text-white rounded-md font-bold'>
               Sign In
              </button>
              <button className='pr-8 px-8 py-3 rounded-md bg-[#97b2d7] text-white font-bold'>
              Sign Up
              </button>  */}
              <ul className="hidden md:flex justify-center items-center space-x-5 pt-3 pb-3">
                <li>
                  <a className="text-xl font-bold text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out" href="/login">Sign in</a>
                </li>
                <li>
                  <a className="text-xl font-bold btn-sm text-purple-600 hover:text-gray-200 ml-3" href="/signUp">Sign Up</a>
                </li>
              </ul>
            </div>

            <div className="md:hidden pr-10 pl-1 pt-5" onClick={handleClick}>
              {/* <img src={toggle?close:Image2} /> */}
              {/* <Image src={Image1}{toggle ? close : Image1} alt="Image Alt Text" /> */}
              {/* <Image src={toggle ? close : Image1} alt="Image Alt Text" /> */}
              <Image src={Image1} alt="image"/>
            </div>
        </div>
        
        <div className={toggle?'absolute z-10 p-4 bg-white w-full px-8 md:hidden':'hidden'}>
          <ul>
              <div className="flex flex-col my-4 gap-4">
                <button className='pr-8 px-8 py-3 flex justify-center items-center bg-[#0e2443] gap-5 text-white rounded-md font-bold'>
                Sign In
                </button>
                <button className='px-8 py-3 rounded-md bg-[#0e2443] text-white font-bold'>
                Sign Up
              </button>
              </div>
          </ul>
        </div>
    </div>
    
  )
}

export default Header