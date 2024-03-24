import { Card, CardBody, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import GoogleIcon from "./assets/Google.svg";
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import { Toaster, toast } from 'sonner';
import { supabase } from '../../lib/helper/supabaseClient';
import useStore from '../../context/store';


const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [user, setUser] = useState({
        user_metadata: {
            avatar_url: '',
        }});
    const [loading, setLoading] = useState(true);

    const {updateUser, updateSettings} = useStore();


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
                    updateUser(res.data.user);
                    if(res.data.user) {
                        const { data } = await supabase
                            .from('settings')
                            .select()
                            .eq('userid', res.data.user.id)
                            .single();
    
                        if(data) updateSettings(data);
                    }
                    // router.push('/myAccount');
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
        <div className='w-full md:w-2/6 h-full px-16 py-10 bg-white text-black pt-28'>
            <div className=''>
                <Typography placeholder={undefined} className={`text-4xl text-primaryPurple`}>Login</Typography>
                {/* <Typography placeholder={undefined} className='text-sm pt-4'>Don't have an account? <Link href={'/signUp'} className='font-medium underline'>Create Now</Link></Typography> */}
            </div>
            <div className='pt-10'>
                <div className='grid gap-8'>
                    <Input crossOrigin={undefined} type='email' label='E-mail' placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    <Input crossOrigin={undefined} type='password' label='Password' placeholder='@#*%' onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* <div className='inline-flex justify-between items-center w-full pt-8'>
                    <div className='inline-flex gap-1 justify-center'>
                        <Checkbox crossOrigin={undefined}/>
                        <Typography placeholder={undefined} className='text-xs flex items-center'>Remember me</Typography>
                    </div>
                </div> */}
                <div className='pt-8'>
                    <button className='w-full rounded-full p-2 text-white bg-primary text-sm' onClick={handleLogIn}>Log in</button>
                </div>
                <div className='w-full inline-flex gap-3 pt-6 justify-center'>
                    <hr className='w-2/5'/><p className='text-xs'>OR</p><hr className='w-2/5'/>
                </div>
                <div className='pt-6'>
                    <button className='w-full rounded-full p-2 bg-transparent border border-gray-200 text-sm relative flex justify-center' onClick={handleLoginwithGoogle}>
                        <img src={GoogleIcon} alt="" className='absolute left-1 top-1/2 -translate-y-1/2 h-3/4' />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginForm