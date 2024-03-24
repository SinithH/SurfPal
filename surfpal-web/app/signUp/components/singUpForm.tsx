'use client'

import React from 'react'
import { Card, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { Kanit } from 'next/font/google';
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import useStore from '@/lib/store';

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})


const SignUpForm = () => {

    const { theme } = useStore();
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const router = useRouter();

    const supabase = createClientComponentClient();

    const handleSignUp = async () => {
        if(validateForm()) {
            try {
                await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                        data: {
                            firstName: fName,
                            lastName: lName
                        }
                    }
                })
                router.push('/login');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } catch (error) {
                console.error(error);                
            }
        }else{
            toast.warning(errorMsg);
        }
    };

    const validateForm = (): boolean => {
        if (!email && !password && !fName && !lName && !confirmPassword) {
            setErrorMsg('Please fill in all the required fields!');
            return false;
        }
    
        if (password !== confirmPassword) {
            setErrorMsg('Passwords should match!');
            return false;
        }

        if (password.length < 6) {
            setErrorMsg("Use a stronger password!");
            return false;
        }
    
        return true;
    };
    
    
  return (
    <>
        <Toaster richColors position='top-center'/>
        <Card placeholder={undefined} className={`${theme} w-full sm:w-5/6 md:w-4/6 h-full px-16 py-10 dark:bg-black dark:text-white`}>
            <div className=''>
                <Typography placeholder={undefined} className={`${kanit.className} text-4xl text-primaryPurple`}>Sign Up</Typography>
                <Typography placeholder={undefined} className='text-sm pt-4'>Already have an account? <Link href={'/login'} className='font-medium underline'>Log In</Link></Typography>
            </div>
            <div className='pt-10'>
                <div className='grid gap-8'>
                    <Input crossOrigin={undefined} type='text' label='First Name' placeholder='John' color={theme === 'dark' ? 'white' : undefined} onChange={(e) => setFirstName(e.target.value)} />
                    <Input crossOrigin={undefined} type='text' label='Last Name' placeholder='Doe' color={theme === 'dark' ? 'white' : undefined} onChange={(e) => setLastName(e.target.value)} />
                    <Input crossOrigin={undefined} type='email' label='E-mail' placeholder='example@gmail.com' color={theme === 'dark' ? 'white' : undefined} onChange={(e) => setEmail(e.target.value)} />
                    <Input crossOrigin={undefined} type='password' label='Password' placeholder='@#*%' color={theme === 'dark' ? 'white' : undefined} onChange={(e) => setPassword(e.target.value)} />
                    <Input crossOrigin={undefined} type='password' label='Confirm Password' placeholder='@#*%' color={theme === 'dark' ? 'white' : undefined} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className='pt-8'>
                    <button className='w-full rounded-full p-2 text-white bg-primaryPurple text-sm' onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </Card>
    </>
  )
}

export default SignUpForm