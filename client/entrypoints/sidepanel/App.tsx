// App.tsx
import React, { useEffect } from 'react';
import MainMenu from './components/MainMenu/MainMenu';
import Summarization from './components/Summarization/Summarization';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Navigation from './components/Navigation/Navigation';
import MyAccount from './components/MyAccount/MyAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Routes, Route, Outlet } from 'react-router-dom';
import useStore from './context/store';
import { supabase } from './lib/helper/supabaseClient';

const App: React.FC = () => {

  const {updateUser, updateSettings} = useStore();


  useEffect(() => {
    async function getSession() {
      try {
        const {data: {user}}: any = await supabase.auth.getUser();
        updateUser(user);

        if(user) {
          const { data } = await supabase
            .from('settings')
            .select()
            .eq('userid', user.id)
            .single();

            if(data) updateSettings(data);
          }

      } catch (error) {
        console.error(error);        
      }
    }

    getSession();
  }, [])
  
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  return (
      <div className='h-full'>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/summarization" element={<Summarization genAI={genAI} />} />
          <Route path="/image-recognition" element={<ImageRecognition />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
      <Outlet />
      </div>
  );
};

export default App;
function setUser(user: any) {
  throw new Error('Function not implemented.');
}

