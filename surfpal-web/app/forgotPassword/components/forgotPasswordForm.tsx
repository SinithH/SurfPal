'use client'

import { Card, Input, Typography } from '@material-tailwind/react'
import { Kanit } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})


const ForgotPasswordForm = () => {
  return (
    <>
        <Card placeholder={undefined} className='w-full md:w-2/6 h-full px-16 py-10'>
            <div className=''>
                <Typography placeholder={undefined} className={`${kanit.className} text-4xl text-primaryPurple`}>Forgot Password</Typography>
                <Typography placeholder={undefined} className='text-sm pt-4'>We've got you covered! <Link href={'/login'} className='font-medium underline'>Oh I can remember!</Link></Typography>
            </div>
            <div className='pt-10'>
                <div className='grid gap-8'>
                    <Input crossOrigin={undefined} type='email' label='E-mail' placeholder='example@gmail.com' />
                    <Input crossOrigin={undefined} type='password' label='New Password' placeholder='@#*%' />
                    <Input crossOrigin={undefined} type='password' label='Confirm Password' placeholder='@#*%' />
                </div>
                <div className='pt-8'>
                    <button className='w-full rounded-full p-2 text-white bg-primaryPurple text-sm'>Log in</button>
                </div>
            </div>
        </Card>
    </>
  )
}

export default ForgotPasswordForm