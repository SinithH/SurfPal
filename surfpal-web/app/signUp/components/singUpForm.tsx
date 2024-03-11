'use client'

import React from 'react'
import { Card, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import { Kanit } from 'next/font/google'

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})


const SignUpForm = () => {
  return (
    <>
        <Card placeholder={undefined} className='w-full md:w-2/6 h-full px-16 py-10'>
            <div className=''>
                <Typography placeholder={undefined} className={`${kanit.className} text-4xl text-primaryPurple`}>Sign Up</Typography>
                <Typography placeholder={undefined} className='text-sm pt-4'>Already have an account? <Link href={'/login'} className='font-medium underline'>Log In</Link></Typography>
            </div>
            <div className='pt-10'>
                <div className='grid gap-8'>
                    <Input crossOrigin={undefined} type='text' label='First Name' placeholder='John' />
                    <Input crossOrigin={undefined} type='text' label='Last Name' placeholder='Doe' />
                    <Input crossOrigin={undefined} type='email' label='E-mail' placeholder='example@gmail.com' />
                    <Input crossOrigin={undefined} type='password' label='Password' placeholder='@#*%' />
                    <Input crossOrigin={undefined} type='password' label='Confirm Password' placeholder='@#*%' />
                </div>
                <div className='pt-8'>
                    <button className='w-full rounded-full p-2 text-white bg-primaryPurple text-sm'>Sign Up</button>
                </div>
            </div>
        </Card>
    </>
  )
}

export default SignUpForm