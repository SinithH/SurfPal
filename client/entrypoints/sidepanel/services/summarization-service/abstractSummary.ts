import { GoogleGenerativeAI } from "@google/generative-ai";
import browser from 'webextension-polyfill';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Question {
  question: string;
  answer: string;
}
interface SummaryResponse {
  summary: string;
  questions: Question[];
}
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY|| '');


async function divideSummaryAndQuestions(jsonString: string, updateSummary:any) {
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


async function getAbstractSummary(textContent: any, generatingSummary:any, updateSummary:any): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt =
      textContent +
      " \n Analyze the given text content from the webpage and give me an abstract summary of this webpage with what this webpage is about. And also give me 5 potential most important questions from the given content with the answers for them. Only add questions which can be answered from the given content. Don't include questions which can't be answered using only the given content. Send your response as a json with summary,questions array with question and answer";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const fullResponse = response.text();
    generatingSummary(false);
    divideSummaryAndQuestions(fullResponse, updateSummary);
    return fullResponse;
  } catch (error) {
    console.error('Error while getting abstract summary:', error);
    throw error;
  }
}

async function generateSummary(generatingSummary:any, updateSummary:any ){
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
      let getSummary = getAbstractSummary(textContent,generatingSummary, updateSummary).catch((reason)=>{
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

export default {generateSummary}