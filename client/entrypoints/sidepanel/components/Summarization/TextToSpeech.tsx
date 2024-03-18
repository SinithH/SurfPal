import React, { useEffect, useState } from 'react';
import useStore from '../../context/store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import textToSpeechIcon from '@/assets/icons/test-to-speech-icon.svg';
import browser from 'webextension-polyfill';

const TextToSpeech: React.FC = () => {
  const { summaryType } = useStore();
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    // Check if the SpeechSynthesisUtterance object is available
    if ('speechSynthesis' in window) {
      // Check if the voices are already available
      if (window.speechSynthesis.getVoices().length !== 0) {
        setVoicesLoaded(true);
      } else {
        // Add event listener for the 'voiceschanged' event
        window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once after component mounts

  const handleVoicesChanged = () => {
    console.log('Voices changed');
    console.log(window.speechSynthesis.getVoices());
    setVoicesLoaded(true);
    // Remove the event listener to prevent memory leaks
    window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
  };

  function triggerTextToSpeech() {
    if (!voicesLoaded) {
      console.log('Voices not loaded yet');
      return;
    }

    const text = "Hello World";
    const utterance = new SpeechSynthesisUtterance(text);

    // Select a voice (optional)
    const voices = window.speechSynthesis.getVoices();
    console.log(voices)
    const englishVoice = voices.find(voice => voice.lang === 'en-US');
    if (englishVoice) {
      utterance.voice = englishVoice;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('English voice not found');
    }
  }

  return (
    <div>
      <button onClick={triggerTextToSpeech} className="w-7 h-7 rounded" disabled={!voicesLoaded}>
        <img src={textToSpeechIcon} alt="Text-to-Speech" />
      </button>
    </div>
  );
};

export default TextToSpeech;
