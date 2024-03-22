import React, { useEffect, useState } from 'react';
import useStore from '../../context/store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import textToSpeechIcon from '@/assets/icons/test-to-speech-icon.svg';
import browser from 'webextension-polyfill';

interface ttsContent{
  text:string,
  trigger:boolean
}

const TextToSpeech: React.FC = () => {
  const { summaryType } = useStore();
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  async function triggerTextToSpeech() {
    
    const content:ttsContent = {
      text:"Hello World",
      trigger:true
    }
    browser.tabs.query({ active: true, currentWindow: true }).then(function(tabs) {
      var currentTab = tabs[0];
      console.log(currentTab);
      browser.tabs.sendMessage(currentTab.id || 999999,{content}).then(()=>{
      console.log("Done")
    })
  });
    // console.log(tab)
    // browser.tabs.sendMessage(tab.id || 999999,{content}).then(()=>{
    //   console.log("Done")
    // })
    // console.log(tab)
  }

  return (
    <div>
      <button onClick={triggerTextToSpeech} className="w-7 h-7 rounded">
        <img src={textToSpeechIcon} alt="Text-to-Speech" />
      </button>
    </div>
  );
};

export default TextToSpeech;
