import browser from 'webextension-polyfill';


export default defineBackground(() => {
  
  console.log('Hello background!', { id: browser.runtime.id });
  // Listen for messages from the content script
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Process the text content
    console.log('Text content:', message.textContent);

    localStorage.setItem("textContent", message.textContent)
    // You can further process or send the text content to your backend server here
  });

  browser.tabs.onActivated.addListener(async(activeInfo)=>{
    const tab = await browser.tabs.get(activeInfo.tabId)
    const reloadText:string = 'reloadText';
    browser.tabs.sendMessage(tab.id || 99999999,{reloadText})
  })

  browser.contextMenus.create({
    id: "generateSummaryItem",
    title: "Generate Summary",
    contexts: ["selection"]
  });





});
