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
import useStore from '../../context/store';
import SummaryHeader from './SummaryHeader';

interface Question {
  question: string;
  answer: string;
}

interface SummaryResponse {
  summary: string;
  questions: Question[];
}

const Summarization: React.FC<{ genAI: GoogleGenerativeAI}> = ({ genAI}) => {

    const {
      summary, questions, updateSummary, clearSummary, loading, generatingSummary, 
      selectedParagraph, updateSelectedParagraph,clearSelectedParagraph, 
      paragraphSummary, updateParagraphSummary, clearParagraphSummary,
      summaryType, updateSummaryType
    } = useStore()
  
    useEffect(() => {
      const handleUnload = () => {
        clearSummary();
        clearParagraphSummary();
        clearSelectedParagraph();
        browser.storage.local.remove('textContent')
      };

      const handleMenuClick = (info:browser.Menus.OnClickData, tab:browser.Tabs.Tab | undefined)=>{
        const mediaTypes = ['audio','video','image']
        const mediaType:string = info?.mediaType || 'ok';
        clearSelectedParagraph()
    
        if (info.menuItemId === "generateSummaryItem" && !(mediaTypes.includes(mediaType))) {
          const selectedText = info.selectionText || "summary";
          updateSelectedParagraph(selectedText)
          toast.success('Selected', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false, theme: 'colored' });
          updateSummaryType('paragraph')
        } else{
          console.log("Invalid text paragraph")
          clearSelectedParagraph()
          updateSummaryType('page')
          toast.error('Please select a text paragraph', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false, theme: 'colored' });
        }
      }
  
      browser.tabs.onUpdated.addListener(handleUnload);
      browser.contextMenus.onClicked.addListener(handleMenuClick);
  
      return () => {
        browser.tabs.onUpdated.removeListener(handleUnload);
        browser.contextMenus.onClicked.removeListener(handleMenuClick);
      };
    }, []);

  const handleCopyClick = () => {
    if(summary.length > 1){
      clipboardCopy(summary);
      console.log("Copying");
      toast.success('Copied to Clipboard', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false });
    }
    
  }

  async function divideSummaryAndQuestions(jsonString: string) {
    try {
      console.log(jsonString)
      jsonString = jsonString.split('json')[1].split('```')[0];
      const jsonData: SummaryResponse = JSON.parse(jsonString);
      updateSummary(jsonData)
    } catch (error) {
      console.error('Error while dividing summary and questions:', error);
      toast.error('Incomplete response from model', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false })
    }
  }


  async function getAbstractSummary(textContent: any): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt =
        textContent +
        " \n Analyze the given text content from the webpage and give me an abstract summary of this webpage with what this webpage is about. And also give me 5 potential most important questions from the given content with the answers for them. Only add questions which can be answered from the given content. Don't include questions which can't be answered using only the given content. Send your response as a json with summary,questions array with question and answer";
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const fullResponse = response.text();
      generatingSummary(false);
      divideSummaryAndQuestions(fullResponse);
      return fullResponse;
    } catch (error) {
      console.error('Error while getting abstract summary:', error);
      throw error;
    }
  }

  async function generateSummary(){
    try {
      const storageData = await browser.storage.local.get('textContent');

      let textContent = storageData.textContent;

      // Check if textContent exists and limit its length if necessary
      if (textContent) {
        const MAX_TEXT_LENGTH = 10000; // Define maximum text length
        if (textContent.length > MAX_TEXT_LENGTH) {
          textContent = textContent.substring(0, MAX_TEXT_LENGTH); // Limit text content length
        }
        generatingSummary(true);
        let getSummary = getAbstractSummary(textContent).catch((reason)=>{
          throw new Error(reason)
        });
        toast.promise(getSummary,{
          pending:'Generating Summary',
          success:'Successfully Generated',
          error:'Something went wrong'
        })
        //divideSummaryAndQuestions(jsonString);
      } else {
        console.log('No text content found');
        generatingSummary(false)
        toast.error('Please visit a valid site', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false, theme:'colored' })
      }
    } catch (error) {
      console.error('Error occurred while handling summary click:', error);
      generatingSummary(false)
      toast.error('Uh Oh! Something went wrong', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false })
    }
  }

  async function handleSummaryClick() {
    updateSummaryType('page')
    if(summary.length > 1 && questions.length > 1){
      generatingSummary(false)
      return
    }
    generatingSummary(true)
    generateSummary();
  }

  async function handleParaSummaryClick(){
    updateSummaryType('paragraph')

    if(selectedParagraph.length > 1){
      generatingSummary(false)
      return
    }
    generatingSummary(true)
    console.log("Generating Para Summary")
  }


  return (
    <div>
      <Header heading={ModuleNames.SUMMARIZATION} handleCopyClick={handleCopyClick} isSummary={true}/>
      <div className='h-auto mt-5 mb-10 px-5 text-base overflow-y-scroll'>
        <SummaryHeader handleSummaryClick={handleSummaryClick} handleParaSummaryClick={handleParaSummaryClick}/>
          {summaryType == 'page' &&  
            <div className='font-kanit w-full'>
              <p>
                {loading && <span>Generating...</span>}
                {!loading && summary}
              </p>
              <div className='mt-3'>
                {questions.map((question, index) => (
                  <Question key={index} question={question.question} answer={question.answer} />
                ))}
              </div>
            </div>
          }
          
          {summaryType == 'paragraph' &&  
            <div className='font-kanit w-full'>
              <p>
                {loading && <span>Generating...</span>}
                {!loading && selectedParagraph}
              </p>
            </div>
          }
        
      </div>
      <Footer module={ModuleNames.SUMMARIZATION}/>
    </div>
  );
};

export default Summarization;
