import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import { toast } from 'react-toastify';
import Footer from '../shared/Footer';
import useStore from '../../context/store';
import browser from 'webextension-polyfill';
import { GoogleGenerativeAI } from '@google/generative-ai';
import getImageDescription from '../../services/image-service/getDescription';


const ImageRecognition: React.FC<{ genAI:GoogleGenerativeAI }> = ({ genAI }) => {
  const defaultText = "Select Right click > Generate Image Description on the image you want to describe";
  const[image, setImage] = useState('');
  const [result, setResult] = useState(defaultText);
  const {currentUser, userSettings} = useStore();
  const [mode, setMode] = useState('');
  const [fontSize, setFontSize] = useState('');

  useEffect(() => {
    if(userSettings && userSettings.theme == 'dark') {
      setMode('bg-darkBg text-white');
    }

    if(userSettings) {
      switch(userSettings.fontsize){
        case 'small':
          setFontSize('text-xs');
          return;
        case 'normal':
          setFontSize('');
          return;
        case 'large':
          setFontSize('text-xl');
          return;
      }
      
    }
  }, [userSettings]) 

  useEffect(() => {
    const handleMenuClick = (info:browser.Menus.OnClickData, tab:browser.Tabs.Tab | undefined)=>{
      getImageDescription(info.srcUrl as string, genAI).then((response) => {
        setResult(response);
        setImage(info.srcUrl as string);
        toast.success('Image description generated successfully');
      }).
      catch((error) => {
        toast.error('Error while getting image description');
      });
    }
  
    browser.contextMenus.onClicked.removeListener(handleMenuClick)

    //get contextmenu data on click
    browser.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === 'generateImageDescription') {
        handleMenuClick(info, tab);
      }
    });

    return () => {
      browser.contextMenus.onClicked.removeListener(handleMenuClick)
      
    };
  }, []);


  return (
    <div className={`${mode} h-full`}>
      <Header heading={ModuleNames.IMAGE_RECOGNITION}/>
      <div className='h-auto mt-8 px-5 pb-16 mx-auto text-base overflow-y-scroll'>           
            <div className={`${fontSize} font-kanit w-full`}>
              <p>
                 <span>Image Description</span>
              </p>
              <div className='mt-3'>
              </div>
            </div>
            <img src={image} className='m-auto rounded-md' />
            <div className='font-kanit w-full pt-4'>
              <p>{result}</p>
            </div>
      </div>
      <Footer module={ModuleNames.IMAGE_RECOGNITION}/>
    </div>
  );
};

export default ImageRecognition;
