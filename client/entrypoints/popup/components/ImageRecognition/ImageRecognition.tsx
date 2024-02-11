import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import Tesseract from 'tesseract.js';

const ImageRecognition: React.FC = () => {

  const recognizeImagesOnPage = () => {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
      Tesseract.recognize(image.src, 'eng')
        .then(({ data: { text } }) => {
          console.log(`Text in image: ${text}`);

        });
    });
  };
  
  recognizeImagesOnPage();

  return (
    <div>
      <Header heading={ModuleNames.IMAGE_RECOGNITION}/>
      {/* Add content for Image Recognition screen */}
      <div className="bg-gray-200 p-4 rounded-md">
        {/* Display recognized text or any UI elements */}
      </div>
    </div>
  );
};

export default ImageRecognition;
