import { Purpose } from '@/enum/purpose-enum';
import browser from 'webextension-polyfill';

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
    const textContent: string = extractTextFromDOM(document.body)
    browser.runtime.sendMessage({
      textContent,
      textBody: document.body.innerHTML,
      currentUrl: window.location.href
    });
    browser.storage.local.set({ textContent });

    browser.runtime.onMessage.addListener(async (message) => {
      if (message.purpose === Purpose.RELOAD_TEXT) {
        await browser.runtime.sendMessage({
          textContent: extractTextFromDOM(document.body),
          textBody: document.body.innerHTML,
          currentUrl: window.location.href
        });
        //browser.storage.sync.set({ textContent });
        await browser.storage.local.set({ textContent });
      }
      if (message.purpose === Purpose.NAVIGATE) { 
        window.location.href=message.url
      }
    })
  }
})