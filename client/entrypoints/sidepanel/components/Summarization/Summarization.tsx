// OptionScreens/SummarizationScreen.tsx
import React, { useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browser from 'webextension-polyfill';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Summarization: React.FC = () => {

  const summery: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus dui quam, id auctor lacus dapibus at. Ut tincidunt lorem eget risus rutrum aliquam. Nulla egestas, lectus ac eleifend eleifend, eros nisl efficitur justo, ac fringilla diam metus sit amet neque. Maecenas suscipit lectus eget aliquam facilisis. Aliquam eget iaculis tellus, iaculis vestibulum metus. Mauris sit amet massa nec mauris congue convallis. Suspendisse varius ex et nibh ultrices molestie. Praesent quis tellus imperdiet, semper quam a, tempor libero. Vivamus quis pulvinar ex. Nullam eget auctor sapien, a mattis purus. Fusce convallis nulla sed lacinia malesuada. Sed accumsan in sem sit.';
  const [summaryChunks, setSummaryChunks] = useState<string[]>([]); // State to store summary chunks
  const [typing, setTyping] = useState<boolean>(false); // State to control typing animation
  const genAI = new GoogleGenerativeAI('AIzaSyBDEMB0-yQNWw1JbA5dt74aujGfjSBn9Lo');

  const handleCopyClick = () => {
    const summaryText = summaryChunks.join(''); // Concatenate all chunks
    clipboardCopy(summaryText);
    toast.success('Copied to Clipboard', { position: 'top-center', autoClose: 500, hideProgressBar: true, pauseOnHover: false });
  }

  async function getAbstractSummary(textContent:any) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = textContent + " \n Analyze the given text content from the webpage and give me an abstract summary of this webpage with what this webpage is about"
  
    const result = await model.generateContentStream(prompt);
    // Listen for chunks and update state
    const chunks: string[] = [];
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      chunks.push(chunkText);
      setSummaryChunks([...chunks]);
    }
    setTyping(false)
  }

  async function handleSummaryClick() {
    try {
      setSummaryChunks(['Generating...'])
      const storageData = await browser.storage.local.get('textContent');
      const textContent = storageData.textContent;
  
      if (textContent) {
        setTyping(true)
        console.log('Text content found:\n' + textContent);
        // Call the function to generate summary
        await getAbstractSummary(textContent);
      } else {
        console.log('No text content found');
      }
    } catch (error) {
      console.error('Error occurred while retrieving text content:', error);
    }
  }

  

  return (
    <div>
      <Header heading={ModuleNames.SUMMERIZATION} handleCopyClick={handleCopyClick} isSummery={true}/>
      {/* Add content for Summarization */}
      {/* font size should be user customizable */}
      <div className='h-auto mt-5 px-5 text-base overflow-y-scroll'>
        <button onClick={handleSummaryClick} className="p-2 h-7 inline-flex gap-3 items-center rounded-lg bg-primary text-white">
            <span>Get Summary</span>
            <FontAwesomeIcon icon={faRotate} />
        </button> 
        <p className='font-kanit w-full'>
          {summaryChunks.map((chunk, index) => (
            <span key={index}>
              {chunk}
              {index === summaryChunks.length - 1 && typing && <span className="animate-pulse inline-block h-4 w-4 bg-black mx-2 rounded-full"></span>}
            </span> // Render each chunk with typing animation for the last chunk
          ))}
        </p>
      </div>
      
    </div>
  );
};

export default Summarization;
