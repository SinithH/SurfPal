import browser from 'webextension-polyfill';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let textContent = message.textContent
    browser.storage.local.set({textContent})
  });

  browser.tabs.onActivated.addListener(async(activeInfo)=>{
    const tab = await browser.tabs.get(activeInfo.tabId)
    const reloadText:string = 'reloadText';
    await browser.tabs.sendMessage(tab.id || 99999999,{reloadText})
  })

  browser.contextMenus.create({
    id: "generateSummaryItem",
    title: "Generate Summary",
    contexts: ["selection"]
  });
});
