import { Card, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react';
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import UserAvatar from './assets/user-avatar.svg';
import Envelope from './assets/envelope-solid 1.svg';
import { supabase } from '../../lib/helper/supabaseClient';
import useStore from '../../context/store';
import { Purpose } from '@/enum/purpose-enum';

const UserCard = () => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    
    const {currentUser, userSettings} = useStore();
    const [mode, setMode] = useState(userSettings?.theme || '');
    const url: string = 'https://surfpal.vercel.app/myAccount';

    useEffect(() => {
        setMode(userSettings?.theme || '');
    }, [userSettings.theme])


    useEffect(() => {
        
        async function getUser(){
            if(currentUser){
                if(currentUser.user_metadata.firstName){
                    setUserName(currentUser?.user_metadata?.firstName + " " + currentUser?.user_metadata?.lastName)
                }else {
                    setUserName(currentUser?.user_metadata?.full_name)
                }
                setUserEmail(currentUser?.user_metadata?.email);
                setLoading(false);
            }
        }

        getUser();
        
    }, [])

    const handleViewProfile = async () => {
        const tabs = await browser.tabs.query({ active: true, lastFocusedWindow: true });
        const tab = tabs[0]; // Assuming there is only one active tab
        if (tab) {
            await browser.tabs.sendMessage(tab.id!, { purpose: Purpose.NAVIGATE, url });
        } else {
            console.error('No active tab found.');
        }
    }
    
    
  return (
    <>
        <Card placeholder={undefined} className={`${mode} flex flex-col h-1/2 w-full p-8 dark:bg-darkBg dark:text-white mt-10`}>
            <div className='items-center justify-center flex flex-col gap-1'>
                {currentUser && currentUser.user_metadata.avatar_url && (
                    <img className='h-32 w-32 rounded-full' src={currentUser.user_metadata.avatar_url} alt={'Avatar'} width={300} height={300}></img>
                )}
                {currentUser && !currentUser.user_metadata.avatar_url && (
                    <img src={UserAvatar} alt={'Avatar'} className='transform lg:scale-75 scale-75 h-32 flex justify-self-center'></img>
                )}
                <Typography placeholder={undefined} className={`font-normal text-2xl font-kanit`}>
                    Welcome, {userName}
                </Typography>
                <button className='py-2 px-3 text-white text-sm bg-primary rounded-full w-fit justify-self-center flex' onClick={handleViewProfile}>View Profile</button>
            </div>
            <div className='lg:row-span-2 flex flex-col items-center justify-start'>
                <div className='inline-flex gap-2 items-center mt-4 lg:mt-0'>
                    <img src={Envelope} alt={'Envelope'} className='transform scale-75'></img>
                    <Typography placeholder={undefined} className={`font-normal text-xs`}>
                        {userEmail}
                    </Typography>
                </div>
            </div>
        </Card>
    </>
  )
}

export default UserCard