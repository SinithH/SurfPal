'use client'

import React from 'react'
import SignUpForm from './components/singUpForm'
import LandingPage from '../templates/landingPage';
import Image from 'next/image'
import SignUpVector from '@/public/assets/sign-up-form.svg';
import useStore from '@/lib/store';

const signUp = () => {

  const { theme } = useStore();
  
  return (
    <>
      <div className={`${theme} w-full h-full lg:grid lg:grid-cols-2 justify-center items-center bg-lightBg dark:bg-darkBg`}>
        <div className='h-full w-full lg:col-span-1 flex justify-center items-center'>
            <SignUpForm />
        </div>
        <div className='col-span-1 lg:flex justify-center items-center hidden'>
          <Image src={SignUpVector} alt={''} className='w-3/4'></Image>
        </div>
      </div>
    </>
  )
}

export default signUp