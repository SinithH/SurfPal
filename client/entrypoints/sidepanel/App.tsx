// App.tsx
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route, Outlet } from 'react-router-dom';
import browser from 'webextension-polyfill';
import { GoogleGenerativeAI } from "@google/generative-ai";

import MainMenu from './components/MainMenu/MainMenu';
import Summarization from './components/Summarization/Summarization';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Navigation from './components/Navigation/Navigation';
import MyAccount from './components/MyAccount/MyAccount';
import 'react-toastify/dist/ReactToastify.css';
import useStore from './context/store';
import { supabase } from './lib/helper/supabaseClient';
import { getNavigationLinks } from './services/navigation-service/getNavigation';
import useNavigationStore from './context/navigation-store';
import { Purpose } from '@/enum/purpose-enum';
import FeedBackPopover from './components/FeedBack/FeedBackPopover';

const App: React.FC = () => {
  const { updateUser, updateSettings } = useStore();

  useEffect(() => {
    async function getSession() {
      try {
        const { data: { user } }: any = await supabase.auth.getUser();
        updateUser(user);

        if (user) {
          const { data } = await supabase
            .from('settings')
            .select()
            .eq('userid', user.id)
            .single();

          if (data) updateSettings(data);
        }

      } catch (error) {
        console.error(error);
      }
    }

    getSession();
    
    (async () => {
      const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
      if(tab){
        await browser.tabs.sendMessage(tab.id!, { purpose: Purpose.RELOAD_TEXT });
      }
    })();
  }, [])

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const [navigationLoading, setNavigationLoading] = useState<boolean>(true);
  const { contentUrl, data, setData } = useNavigationStore();
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.currentUrl !== contentUrl) {
      setNavigationLoading(true)
      const response = await getNavigationLinks(message.textBody, message.currentUrl, data)
      setData(message.currentUrl, response!)
    }
    setNavigationLoading(false)
  })
  return (
    <div className='h-full'>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/summarization" element={<Summarization genAI={genAI} />} />
        <Route path="/image-recognition" element={<ImageRecognition genAI={genAI} />} />
        <Route path="/navigation" element={<Navigation loading={navigationLoading} />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/feedback" element={<FeedBackPopover onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default App;

