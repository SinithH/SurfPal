import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../shared/Footer';
import browser from 'webextension-polyfill';
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Question from './Question';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Question {
  question: string;
  answer: string;
}

interface SummaryResponse {
  summary: string;
  questions: Question[];
}

const Summarization: React.FC<{ genAI: GoogleGenerativeAI}> = ({ genAI}) => {
  const [summaryChunks, setSummaryChunks] = useState<string[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [summaryJson, setSummaryJson] = useState<SummaryResponse | undefined>();

    // Define a function to clear summarization-related states
    const clearSummarizationStates = () => {
      setSummaryChunks([]);
      setTyping(false);
      setSummaryJson(undefined);
    };
  
    // Effect to clear states when component unmounts or user navigates to another URL
    useEffect(() => {
      const handleUnload = () => {
        clearSummarizationStates();
      };
  
      browser.tabs.onUpdated.addListener(handleUnload);
      return () => {
        browser.tabs.onUpdated.removeListener(handleUnload);
      };
    }, []);

  const handleCopyClick = () => {
    const summaryText = summaryChunks.join('');
    clipboardCopy(summaryText);
    toast.success('Copied to Clipboard', { position: 'top-center', autoClose: 500, hideProgressBar: true, pauseOnHover: false });
  }

  async function divideSummaryAndQuestions(jsonString: string) {
    try {
      jsonString = jsonString.split('json')[1].split('```')[0];
      const jsonData: SummaryResponse = JSON.parse(jsonString);
      setSummaryJson(jsonData);
      setSummaryChunks([jsonData.summary]);
    } catch (error) {
      console.error('Error while dividing summary and questions:', error);
    }
  }

  async function getAbstractSummary(textContent: any): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});;
      const prompt = textContent + " \n Analyze the given text content from the webpage and give me an abstract summary of this webpage with what this webpage is about. And also give me 5 potential most important questions from the given content with the answers for them. Only add questions which can be answered from the given content. Don't include questions which can't be answered using only the given content. Send your response as a json with summary,questions array with question and answer";
      const result = await model.generateContentStream(prompt);
  
      let fullResponse = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
      }
      setTyping(false);
      return fullResponse;
    } catch (error) {
      console.error('Error while getting abstract summary:', error);
      throw error;
    }
  }

  async function handleSummaryClick() {
    try {
      setSummaryChunks(['Generating...']);
      setSummaryJson(undefined);
      const storageData = await browser.storage.local.get('textContent');
      let textContent = storageData.textContent;

      // Check if textContent exists and limit its length if necessary
      if (textContent) {
        const MAX_TEXT_LENGTH = 10000; // Define maximum text length
        if (textContent.length > MAX_TEXT_LENGTH) {
          textContent = textContent.substring(0, MAX_TEXT_LENGTH); // Limit text content length
        }
        setTyping(true);
        const jsonString = await getAbstractSummary(textContent);
        divideSummaryAndQuestions(jsonString);
      } else {
        console.log('No text content found');
      }
    } catch (error) {
      console.error('Error occurred while handling summary click:', error);
      setTyping(false)
      setSummaryChunks(['Something Went Wrong!'])
    }
  }

  return (
    <div>
      <Header heading={ModuleNames.SUMMARIZATION} handleCopyClick={handleCopyClick} isSummary={true}/>
      <div className='h-auto mt-5 mb-10 px-5 text-base overflow-y-scroll'>
        <button onClick={handleSummaryClick} className="p-2 h-7 inline-flex gap-3 items-center rounded-lg bg-primary text-white">
          <span>Get Summary</span>
          {typing && <div className="spinner border-t-4 border-b-4 border-primary rounded-full w-6 h-6 animate-spin"></div>}
          <FontAwesomeIcon icon={faRotate} />
        </button> 
        <p className='font-kanit w-full'>
          {summaryChunks.map((chunk, index) => (
            <span key={index}>
              {chunk}
              {index === summaryChunks.length - 1 && typing && <span className="animate-pulse inline-block h-4 w-4 bg-black mx-2 rounded-full"></span>}
            </span>
          ))}
        </p>
        <div className='mt-3'>
          {summaryJson?.questions.map((question, index) => (
            <Question key={index} question={question.question} answer={question.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summarization;
