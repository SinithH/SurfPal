import React, { useEffect, useState } from 'react';
import useStore from '../../context/store';

const Question: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { userSettings } = useStore();
  const [mode, setMode] = useState(userSettings?.theme || 'dark');
  const [fontSize, setFontSize] = useState('');

  useEffect(() => {

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


  return (
    <div className={`${mode} my-4`}>
      <div
        className="cursor-pointer bg-gray-100 p-3 rounded-md border-primary border-2 hover:text-primary dark:bg-darkTileHover"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <h2 className={`leading-6 ${fontSize}`}>{question}</h2>
      </div>
      {showAnswer && (
        <div className="mt-2 bg-gray-100 p-3 rounded-md dark:bg-darkTileHover">
          <p className={`${fontSize}`}>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
