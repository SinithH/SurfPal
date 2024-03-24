import React, { useState } from 'react';
import useStore from '../../context/store';

const Question: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { userSettings } = useStore();
  const [mode, setMode] = useState(userSettings?.theme || 'dark');


  return (
    <div className={`${mode} my-4`}>
      <div
        className="cursor-pointer bg-gray-100 p-3 rounded-md border-primary border-2 hover:text-primary dark:bg-darkTileHover"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <h2 className="text-base">{question}</h2>
      </div>
      {showAnswer && (
        <div className="mt-2 bg-gray-100 p-3 rounded-md">
          <p className="text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
