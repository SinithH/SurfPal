'use client'

import { Card, CardBody, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'
import { Kanit } from 'next/font/google'
import GoogleIcon from "@/public/assets/Google.svg"
import Image from 'next/image'

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})

const LoginForm = () => {
  return (
    <>
        <Card placeholder={undefined} className='w-full md:w-2/6 h-full px-16 py-10'>
            <div className=''>
                <Typography placeholder={undefined} className={`${kanit.className} text-4xl text-primaryPurple`}>Login</Typography>
                <Typography placeholder={undefined} className='text-sm pt-4'>Don't have an account? <Link href={'/signUp'} className='font-medium underline'>Create Now</Link></Typography>
            </div>
            <div className='pt-10'>
                <div className='grid gap-8'>
                    <Input crossOrigin={undefined} type='email' label='E-mail' placeholder='example@gmail.com' />
                    <Input crossOrigin={undefined} type='password' label='Password' placeholder='@#*%' />
                </div>
                <div className='inline-flex justify-between w-full pt-8'>
                    <div className='inline-flex gap-3 justify-center'>
                        <Checkbox crossOrigin={undefined}/>
                        <Typography placeholder={undefined} className='text-xs'>Remember me</Typography>
                    </div>
                    <Link href={'/forgotPassword'} className='underline font-normal text-sm'>Forgot Password?</Link>
                </div>
                <div className='pt-8'>
                    <button className='w-full rounded-full p-2 text-white bg-primaryPurple text-sm'>Log in</button>
                </div>
                <div className='w-full inline-flex gap-3 pt-6 justify-center'>
                    <hr className='w-2/5'/><p className='text-xs'>OR</p><hr className='w-2/5'/>
                </div>
                <div className='pt-6'>
                    <button className='w-full rounded-full p-2 bg-transparent border border-gray-200 text-sm relative'>
                        <Image src={GoogleIcon} alt={''} className='scale-75 absolute left-1 top-1/2 -translate-y-1/2'></Image>
                        Continue with Google
                    </button>
                </div>
            </div>
        </Card>
    </>
  )
}

export default LoginForm