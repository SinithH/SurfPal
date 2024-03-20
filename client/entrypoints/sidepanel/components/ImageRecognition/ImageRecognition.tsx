import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import Footer from '../shared/Footer';
import useStore from '../../context/store';

const ImageRecognition: React.FC = () => {
  
  const[imageUrl, setImageUrl] = useState('');
  const [result, setResultUrl] = useState <string> (imageUrl);
  const [images, setImages] = useState<NodeListOf<HTMLImageElement> | null>(null);
  const [mode, setMode] = useState('');

  const {currentUser, userSettings} = useStore();
  
  useEffect(() => {
    if(userSettings && userSettings.theme == 'dark') {
        setMode('bg-darkBg text-white');
    }
    const fetchImages = () => {
      const allImages = document.querySelectorAll('img');
      setImages(allImages);
    };

    fetchImages();
  }, []); 

  return (
    <div className={`${mode} h-full`}>
      <Header heading={ModuleNames.IMAGE_RECOGNITION}/>
      {currentUser && !userSettings.imagerecognition && (
        <p>link to web</p>
      )}
      {currentUser && userSettings.imagerecognition && (
        <div className="bg-gray-200 p-10 rounded-md mb-4 ml-3 mr-3 mt-3">
          <img src="image.jpg" alt="Description of the image" />
          {result}
        </div>
      )}
      {!currentUser && (
        <p>link to login</p>
      )}
      {/* <div className="bg-gray-200 p-10 rounded-md mb-4 ml-3 mr-3">
        {result}
      </div>
      <div className="bg-gray-200 p-10 rounded-md ml-2 mr-3">
        {result}
      </div> */}
      <Footer module={ModuleNames.IMAGE_RECOGNITION}/>
    </div>
  );
};

export default ImageRecognition;
