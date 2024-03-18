import browser from 'webextension-polyfill';
import abstractSummary from './sidepanel/services/summarization-service/getSummary';
// Function to extract text content from DOM
function extractTextFromDOM(node: Node): string {
    let text = '';
    if (node.nodeType === Node.TEXT_NODE) {
      text += (node as Text).textContent?.trim() + ' ';
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let childNode of (node as Element).childNodes) {
        text += extractTextFromDOM(childNode);
      }
    }
    return text;
  }

export default defineContentScript({
    matches: ['*://*/*'],
    async main(ctx) {
        // console.log("Hello");
        // alert("Hello")
          // Extract text content from the entire document
        let utterance = new SpeechSynthesisUtterance("Hello Started")
        console.log(window.speechSynthesis.getVoices())
        window.speechSynthesis.speak(utterance);
        const textContent: string = extractTextFromDOM(document.body)
          // Send text content to the background script
        browser.runtime.sendMessage({ 
          textContent, 
          textBody: document.body.innerHTML, 
          currentUrl: window.location.href
        });
        //browser.storage.sync.set({ textContent });
        browser.storage.local.set({textContent});

        browser.runtime.onMessage.addListener((message)=>{
          if(message.reloadText == 'reloadText'){
            const textContent: string = extractTextFromDOM(document.body);
            
            // Send text content to the background script
            browser.runtime.sendMessage({ textContent });
            //browser.storage.sync.set({ textContent });
            browser.storage.local.set({textContent});
          }
        })
    }
})