// App.tsx
import React, { useState } from 'react';
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
import useNavigationStore, { INavigationResponse } from './context/navigation-store';
import { getNavigationLinks } from './services/navigation-service/getNavigation';

const App: React.FC = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const [navigationLinks, setNavigationLinks] = useState<INavigationResponse>({ data: { navigation: [], content: [] } });
  const [url, setUrl] = useState<string>('');
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    setUrl(message.currentUrl)
    setNavigationLinks(await getNavigationLinks(message.textBody, message.currentUrl));
  })
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/summarization" element={<Summarization genAI={genAI} />} />
        <Route path="/image-recognition" element={<ImageRecognition />} />
        <Route path="/navigation" element={<Navigation links={navigationLinks} url={url}/>} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default App;
