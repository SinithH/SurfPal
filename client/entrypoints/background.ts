import { Purpose } from '@/enum/purpose-enum';
import browser from 'webextension-polyfill';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let textContent = message.textContent
    browser.storage.local.set({textContent})
  });

  browser.tabs.onActivated.addListener(async(activeInfo)=>{
    const tab = await browser.tabs.get(activeInfo.tabId)
    await browser.tabs.sendMessage(tab.id || 99999999,{purpose: Purpose.RELOAD_TEXT})
  })

  browser.contextMenus.create({
    id: "generateSummaryItem",
    title: "Generate Summary",
    contexts: ["selection"]
  });
});
