import React from 'react'
import UserCard from './components/userCard'
import SettingsSection from './components/settingsSection'
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const MyAccountPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies : () => cookieStore});
  const {data: {session}} = await supabase.auth.getSession();
  const user = session?.user;

  if(!user){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  
  const { data: settingsData, error } = await supabase
      .from('settings')
      .select()
      .eq('userid', user?.id)
      .single();
  
  if(error) {
    console.error("Error fetching settings!", error);
  }
  
  return (
    <>
        <div className='w-full h-full'>
            <UserCard/>
            <SettingsSection userSettings={settingsData}/>
        </div>
    </>
  )
}

export default MyAccountPage
