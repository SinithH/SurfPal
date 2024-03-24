'use client'

import { Kanit } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import UserAvatar from '@/public/assets/circle-user-regular.svg';
import Moon from '@/public/assets/moon-solid.svg'
import Sun from '@/public/assets/sun-solid.svg'
import { Card, CardBody } from '@material-tailwind/react';
import useStore from '@/lib/store';

const kanit = Kanit({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const Header = () => {

  const router = useRouter();

  const { theme, toggleDarkMode, toggleLightMode } = useStore();

  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dorpDownActivated, setDropDownActivated] = useState(false);


  useEffect(() => {
    const handleAuthStateChange = async (event: any, session: any) => {
        if (event === 'SIGNED_IN') {
            setUser(session.user);
        } else {
            setUser(null);
        }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    async function getUser() {
        const { data: { user } }: any = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
    }

    getUser();

    return () => {
        authListener.subscription.unsubscribe();
    };

}, []);


  const handleLogout = async () => {
    await supabase.auth.signOut();
    const res = await supabase.auth.getUser();
    setUser(null);
    setDropDownActivated(!dorpDownActivated);
    router.push('/login');
  }

  return (

    <div className={`${kanit.className} ${theme} w-full h-20 bg-white border-b drop-shadow-sm fixed top-0 z-50 px-10 dark:bg-black dark:text-white`}>
        <div className='w-full h-full flex items-center'>
            <div className='inline-flex justify-between w-full'>
              {/* <img src="image" alt="image" className='h-[25px]'/> */}
              <div>
                <h1>SurfPal</h1>
              </div>
              <div className='inline-flex items-center gap-5'>
                <div className='w-5 cursor-pointer'>
                  {theme === 'dark' ?
                    (<Image src={Sun} alt={''} onClick={() => toggleLightMode()}></Image>) :
                    (<Image src={Moon} alt={''} onClick={() => toggleDarkMode()}></Image>)
                  }
                </div>
                {!user && 
                  <div className='inline-flex gap-6'>
                    <Link className='text-primaryPurple font-normal py-2' href={'/login'}>
                      Sign In
                    </Link>
                    <Link className='text-white bg-primaryPurple py-2 px-3 rounded-full font-normal' href={'/signUp'}>
                      Sign Up
                    </Link>
                  </div>
                }
                {user &&
                  <Image src={UserAvatar} alt={'Avatar'} className='cursor-pointer w-10 h-10' onClick={() => setDropDownActivated(!dorpDownActivated)}></Image>
                }
              </div>
            </div>
        </div>
        {dorpDownActivated && 
          <Card className='w-fit border-gray-400 border fixed top-24 right-2 z-50' placeholder={undefined}>
              <CardBody placeholder={undefined} className='w-full'>
                <Link className='py-2 px-8 text-sm cursor-pointer hover:bg-blue-gray-50 w-full' href={'/myAccount'} onClick={() => setDropDownActivated(!dorpDownActivated)}>My Account</Link>
                <p className='py-2 px-8 text-sm cursor-pointer hover:bg-blue-gray-50 w-full text-red-500' onClick={handleLogout}>Log out</p>
              </CardBody>
          </Card>
        }
    </div>
    
  )
}

export default Header