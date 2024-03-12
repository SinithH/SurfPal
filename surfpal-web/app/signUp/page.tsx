import React from 'react'
import SignUpForm from './components/singUpForm'
import LandingPage from '../templates/landingPage'

const signUp = () => {
  return (
    <>
      <div className='w-full h-full flex justify-center items-center'>
            <LandingPage/>
            <SignUpForm />
      </div>
    </>
  )
}

export default signUp