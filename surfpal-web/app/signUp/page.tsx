import React from 'react'
import SignUpForm from './components/singUpForm'
import LandingPage from '../templates/landingPage';
import Image from 'next/image'
import SignUpVector from '@/public/assets/sign-up-form.svg';

const signUp = () => {
  return (
    <>
      <div className='w-full h-full lg:grid lg:grid-cols-2 justify-center items-center'>
      <div className='col-span-1 lg:flex justify-center items-center hidden'>
              <Image src={SignUpVector} alt={''} className='w-3/4'></Image>
            </div>
        <div className='h-full w-full lg:col-span-1 flex justify-center items-center'>
            <SignUpForm />
        </div>
      </div>
    </>
  )
}

export default signUp