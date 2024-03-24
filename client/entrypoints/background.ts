import browser from 'webextension-polyfill';


export default defineBackground(() => {
  
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if(reason === 'install'){
      storage.setItem('local:installDate', '2023-12-22T15:27:25.950Z');
    }
  });

  // Listen for messages from the content script
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Process the text content
    let textContent = message.textContent
    browser.storage.local.set({textContent})
    // You can further process or send the text content to your backend server here
  });

  browser.tabs.onActivated.addListener(async(activeInfo)=>{
    console.log("Tab activated")
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
