'use client';

import React from 'react'
import LoginForm from './components/loginForm'
import Image from 'next/image'
import LoginVector from '@/public/assets/otp-security.svg';
import useStore from '@/lib/store';

const LoginPage = () => {

  const { theme } = useStore();
  
  return (
    <>
        <div className={`${theme} w-full h-full lg:grid lg:grid-cols-2 justify-center items-center bg-lightBg dark:bg-darkBg`}>
            <div className='h-full w-full lg:col-span-1 flex justify-center items-center'>
              <LoginForm />
            </div>
            <div className='col-span-1 lg:flex justify-center items-center hidden'>
              <Image src={LoginVector} alt={''} className='w-3/4'></Image>
            </div>
        </div>
    </>
  )
}

export default LoginPage