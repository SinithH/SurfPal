// App.tsx
import React from 'react';
import MainMenu from './components/MainMenu/MainMenu';
import Summarization from './components/Summarization/Summarization';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Navigation from './components/Navigation/Navigation';
import MyAccount from './components/MyAccount/MyAccount';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
      <div>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/summarization" element={<Summarization />} />
          <Route path="/image-recognition" element={<ImageRecognition />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
      <Outlet />
      </div>
  );
};

export default App;
