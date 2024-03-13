import React, { useState } from 'react';

const Question: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="my-4 ">
      <div
        className="cursor-pointer bg-gray-100 p-3 rounded-md border-primary border-2 hover:text-primary"
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
