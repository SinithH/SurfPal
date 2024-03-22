'use client'

import { Card, CardBody, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Kanit } from 'next/font/google';
import GoogleIcon from "@/public/assets/Google.svg";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import { Toaster, toast } from 'sonner';


const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        async function getUser(){
            const {data: {user}}: any = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }

        getUser();

        if(user) {
            router.push('/myAccount');
        }
    }, [])

    const handleLogIn = async () => {
        if (validateForm()) {
            try {
                const res = await supabase.auth.signInWithPassword({
                    email,
                    password
                })

                if(res && res.error && res.error.status === 400) {
                    toast.error(res.error.message);
                }else{
                    router.push('/myAccount');
                }

            } catch (error) {
                console.error(error);
            }
        }else {
            toast.warning(errorMsg);
        }
    }

    const handleLoginwithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                  },
                },
            })
        } catch (error) {
            
        }
    }

    const validateForm = (): boolean => {
        if(!email && !password) {
            setErrorMsg('Please fill in all the required fields!');
            return false;
        }

        return true;
    }

  return (
    <>
        <Toaster richColors position='top-center'/>
        <Card placeholder={undefined} className='w-full sm:w-5/6 md:w-4/6 h-full px-16 py-10'>
            <div className=''>
                <Typography placeholder={undefined} className={`${kanit.className} text-4xl text-primaryPurple`}>Login</Typography>
                <Typography placeholder={undefined} className='text-sm pt-4'>Don't have an account? <Link href={'/signUp'} className='font-medium underline'>Create Now</Link></Typography>
            </div>
            <div className='pt-10'>
                <div className='grid gap-8'>
                    <Input crossOrigin={undefined} type='email' label='E-mail' placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    <Input crossOrigin={undefined} type='password' label='Password' placeholder='@#*%' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='inline-flex justify-between items-center w-full pt-8'>
                    <div className='inline-flex gap-1 justify-center'>
                        <Checkbox crossOrigin={undefined}/>
                        <Typography placeholder={undefined} className='text-xs flex items-center'>Remember me</Typography>
                    </div>
                    <Link href={'/forgotPassword'} className='underline font-normal text-sm'>Forgot Password?</Link>
                </div>
                <div className='pt-8'>
                    <button className='w-full rounded-full p-2 text-white bg-primaryPurple text-sm' onClick={handleLogIn}>Log in</button>
                </div>
                <div className='w-full inline-flex gap-3 pt-6 justify-center'>
                    <hr className='w-2/5'/><p className='text-xs'>OR</p><hr className='w-2/5'/>
                </div>
                <div className='pt-6'>
                    <button className='w-full rounded-full p-2 bg-transparent border border-gray-200 text-sm relative' onClick={handleLoginwithGoogle}>
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