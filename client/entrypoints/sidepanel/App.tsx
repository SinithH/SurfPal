// App.tsx
import React, { useEffect, useState } from 'react';
import MainMenu from './components/MainMenu/MainMenu';
import Summarization from './components/Summarization/Summarization';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Navigation from './components/Navigation/Navigation';
import MyAccount from './components/MyAccount/MyAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Routes, Route, Outlet } from 'react-router-dom';
import { getNavigationLinks } from './services/navigation-service/getNavigation';
import useNavigationStore from './context/navigation-store';

const App: React.FC = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const [navigationLoading, setNavigationLoading] = useState<boolean>(false);
  const { contentUrl, data, setData } = useNavigationStore();
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.currentUrl !== contentUrl) {
      setNavigationLoading(true);
      const response = await getNavigationLinks(message.textBody, message.currentUrl, data)
      setData(message.currentUrl, response!)
    }
    setNavigationLoading(false);
  })
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/summarization" element={<Summarization genAI={genAI} />} />
        <Route path="/image-recognition" element={<ImageRecognition />} />
        <Route path="/navigation" element={<Navigation loading={navigationLoading} />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default App;
