import React from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import Footer from '../shared/Footer';

const ImageRecognition: React.FC = () => {
  return (
    <>
      <div>
        <Header heading={ModuleNames.IMAGE_RECOGNITION}/>
        {/* Add content for Image Recognition screen */}
      </div>
      <Footer/>
    </>
  );
};

export default ImageRecognition;
