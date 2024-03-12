// App.tsx
import React, { useState } from 'react';
import MainMenu from './components/MainMenu/MainMenu';
import Summarization from './components/Summarization/Summarization';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Navigation from './components/Navigation/Navigation';
import MyAccount from './components/MyAccount/MyAccount';
import homeIcon from '../../assets/icons/home-icon.svg';
import Footer from './components/shared/Footer';
import ModuleNames from './constants/Modules';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const [previousScreen, setPreviousScreen] = useState<string | null>(null);
  // const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleOptionClick = (option: string) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(option);
  };

  const handleBackClick = () => {
    setCurrentScreen(previousScreen);
    setPreviousScreen(null);
  };

  const isMainMenu = currentScreen === null;

  function renderCurrentScreen() {
    switch (currentScreen) {
      case 'Summarization':
        return <Summarization genAI={genAI} />;
      case 'ImageRecognition':
        return <ImageRecognition />;
      case 'Navigation':
        return <Navigation />;
      case 'MyAccount':
        return <MyAccount />;
      default:
        return null;
    }
  }

  return (
    <div>
      
      {isMainMenu ? (
        <MainMenu onOptionClick={handleOptionClick} />
      ) : (
        renderCurrentScreen()
      )}
      {!isMainMenu && (
        <Footer handleBackClick={handleBackClick} isSummery={currentScreen == 'Summarization'}/>
      )}
      <ToastContainer position='top-center' />
    </div>
  );
};

export default App;
