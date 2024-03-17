import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../shared/Footer';
import browser from 'webextension-polyfill';
import Question from './Question';
import { GoogleGenerativeAI } from '@google/generative-ai';
import useStore from '../../context/store';
import SummaryHeader from './SummaryHeader';
import generateSummary from '../../services/summarization-service/getSummary';

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
      summaryType, updateSummaryType,
      userSettings
    } = useStore()

    const [mode, setMode] = useState('');

    useEffect(() => {
      if(userSettings && userSettings.theme == 'dark') {
        setMode('bg-darkBg text-white');
      }
    }, [userSettings])
  
    useEffect(() => {
      const handleUnload = async(tabId:number,changeInfo: browser.Tabs.OnUpdatedChangeInfoType, tab: browser.Tabs.Tab) => {
        console.log("On updated")
        console.log(tab)
        clearSummary();
        clearParagraphSummary();
        clearSelectedParagraph();
        generatingSummary(false)
        updateSummaryType('paragraph')
        browser.storage.local.remove('textContent')
        const reloadText:string = 'reloadText';
        browser.tabs.sendMessage(tab.id || 99999999,{reloadText})
      };

      const handleTabChange = async(activeInfo:browser.Tabs.OnActivatedActiveInfoType)=>{
        console.log("Tab updated")
        console.log(activeInfo)
        clearSummary();
        clearParagraphSummary();
        clearSelectedParagraph();
        generatingSummary(false)
        updateSummaryType('paragraph')
        browser.storage.local.remove('textContent')
        const activeTab = await browser.tabs.get(activeInfo.tabId)
        const reloadText:string = 'reloadText';
        browser.tabs.sendMessage(activeTab.id || 99999999,{reloadText})
      }

      const handleMenuClick = (info:browser.Menus.OnClickData, tab:browser.Tabs.Tab | undefined)=>{
        const mediaTypes = ['audio','video','image']
        const mediaType:string = info?.mediaType || 'ok';
        clearSelectedParagraph()
        clearParagraphSummary()
    
        if (info.menuItemId === "generateSummaryItem" && !(mediaTypes.includes(mediaType))) {
          const selectedText = info.selectionText || "summary";
          console.log(selectedText)
          let selectionDone = updateSelectedParagraph(selectedText)
          if(selectionDone){
            console.log(selectedParagraph)
            toast.success('Selected', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false});
            updateSummaryType('paragraph')
            generatingSummary(true)
            directlyGenerateParagraphSummary(selectedText);

          }


        } else{
          console.log("Invalid text paragraph")
          clearSelectedParagraph()
          updateSummaryType('page')
          toast.error('Please select a text paragraph', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false});
        }
      }


  
      browser.tabs.onUpdated.addListener(handleUnload);
      browser.contextMenus.onClicked.addListener(handleMenuClick);
      browser.tabs.onActivated.addListener(handleTabChange)
  
      return () => {
        browser.tabs.onUpdated.removeListener(handleUnload);
        browser.contextMenus.onClicked.removeListener(handleMenuClick);
        browser.tabs.onActivated.removeListener(handleTabChange)

      };
    }, []);

  const handleCopyClick = () => {
    if(summary.length > 1){
      clipboardCopy(summary);
      console.log("Copying");
      toast.success('Copied to Clipboard', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false });
    }
    
  }

  async function directlyGenerateParagraphSummary(selectedText:string){
    await generateSummary(generatingSummary,updateSummary, genAI,selectedText, 'paragraph', updateParagraphSummary).then(()=>{console.log(paragraphSummary)})
  }

  async function handleSummaryClick() {
    updateSummaryType('page')
    if(summary.length > 1){
      generatingSummary(false)
      return
    }
    const storageData = await browser.storage.local.get('textContent');

    const textContent:string = storageData.textContent;
    console.log(textContent)
    generatingSummary(true)
    await generateSummary(generatingSummary,updateSummary, genAI,textContent, 'page', updateParagraphSummary)
  }

  async function handleParaSummaryClick(){
    updateSummaryType('paragraph')
    console.log(paragraphSummary)
    console.log(selectedParagraph)
    if(paragraphSummary.length > 1){
      console.log("Existing para summary")
      generatingSummary(false)
      return
    } else if(selectedParagraph.length > 1){
      console.log("Generating Para Summary")
      await generateSummary(generatingSummary,updateSummary, genAI,selectedParagraph, 'paragraph', updateParagraphSummary).then(()=>{console.log(paragraphSummary)})
      
    } else{
      toast.warn('Please select a text paragraph', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false });
    }
  }


  return (
    <div className={`${mode} h-full`}>
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
                {!loading && paragraphSummary}
              </p>
            </div>
          }
        
      </div>
      <Footer module={ModuleNames.SUMMARIZATION}/>
    </div>
  );
};

export default Summarization;
