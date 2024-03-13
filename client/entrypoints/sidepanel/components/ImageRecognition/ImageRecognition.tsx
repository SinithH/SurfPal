import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import Footer from '../shared/Footer';

const ImageRecognition: React.FC = () => {
  
  const[imageUrl, setImageUrl] = useState('');
  const [result, setResultUrl] = useState <string> (imageUrl);
  const [images, setImages] = useState<NodeListOf<HTMLImageElement> | null>(null);

  useEffect(() => {
    const fetchImages = () => {
      const allImages = document.querySelectorAll('img');
      setImages(allImages);
    };

    fetchImages();
  }, []); 

  return (
    <div>
      <Header heading={ModuleNames.IMAGE_RECOGNITION}/>
      {/* Add content for Image Recognition screen */}
      <div className="bg-gray-200 p-10 rounded-md mb-4 ml-3 mr-3">
        <img src="image.jpg" alt="Description of the image" />
        {result}
      </div>
      {/* <div className="bg-gray-200 p-10 rounded-md mb-4 ml-3 mr-3">
        {result}
      </div>
      <div className="bg-gray-200 p-10 rounded-md ml-2 mr-3">
        {result}
      </div> */}
      <Footer/>
    </div>
  );
};

export default ImageRecognition;
