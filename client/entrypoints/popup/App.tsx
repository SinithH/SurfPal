// App.tsx
import React, { useState } from 'react';
import MainMenu from './components/MainMenu/MainMenu';
import Summarization from './components/Summarization/Summarization';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Navigation from './components/Navigation/Navigation';
import MyAccount from './components/MyAccount/MyAccount';
import homeIcon from '../../assets/icons/home-icon.svg';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const [previousScreen, setPreviousScreen] = useState<string | null>(null);

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
        return <Summarization />;
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
        <button onClick={handleBackClick} className="p-2 m-2 rounded">
          <img src={homeIcon} alt="User" />
        </button>
      )}
    </div>
  );
};

export default App;
