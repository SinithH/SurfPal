'use client'

import { Card, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react';
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import { Kanit } from 'next/font/google';
import UserAvatar from '@/public/assets/user-avatar.svg';
import Envelope from '@/public/assets/envelope-solid 1.svg';
import Image from 'next/image';
import MyAccountVector from '@/public/assets/web-designer-building-website.svg';
import useStore from '@/lib/store';

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})

const UserCard = () => {

    const { theme } = useStore();
    const supabase = createClientComponentClient();
    const [user, setUser] = useState({
        user_metadata: {
            avatar_url: '',
        }});
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser(){
            const {data: {user}}: any = await supabase.auth.getUser();
            setUser(user);
            if(user.user_metadata.firstName){
                setUserName(user?.user_metadata?.firstName + " " + user?.user_metadata?.lastName)
            }else {
                setUserName(user?.user_metadata?.full_name)
            }
            setUserEmail(user?.user_metadata?.email);
            setLoading(false);
        }

        getUser();
        
    }, [])
    
  return (
    <>
        <Card placeholder={undefined} className={`${theme} flex flex-col lg:grid lg:grid-rows-6 lg:h-full w-full lg:w-1/3 p-8 lg:rounded-tl-none lg:rounded-bl-none lg:fixed left-0 dark:bg-carouselDarkBg dark:text-white`}>
            <div className='lg:row-span-3 items-center justify-center flex flex-col gap-1 lg:gap-5'>
                {user && user.user_metadata.avatar_url && (
                    <Image className='h-32 w-32 rounded-full' src={user.user_metadata.avatar_url} alt={'Avatar'} width={300} height={300}></Image>
                )}
                {user && !user.user_metadata.avatar_url && (
                    <Image src={UserAvatar} alt={'Avatar'} className='transform lg:scale-75 scale-50 h-32 flex justify-self-center'></Image>
                )}
                <Typography placeholder={undefined} className={`${kanit.className} font-normal text-2xl`}>
                    Welcome, {userName}
                </Typography>
                <button className='py-2 px-3 text-white text-sm bg-primaryPurple rounded-full w-fit justify-self-center flex'>Edit Profile</button>
                <div className='inline-flex gap-2 items-center mt-4 lg:mt-0'>
                    <Image src={Envelope} alt={'Envelope'} className='transform scale-75'></Image>
                    <Typography placeholder={undefined} className={`${kanit.className} font-normal text-xs`}>
                        {userEmail}
                    </Typography>
                </div>
            </div>
            <div className='lg:row-span-3 lg:flex hidden flex-col items-center justify-start'>
                <div className='flex items-center justify-center mt-4 lg:mt-0'>
                    <Image src={MyAccountVector} alt={'Envelope'} className='w-3/5'></Image>
                </div>
            </div>
        </Card>
    </>
  )
}

export default UserCard