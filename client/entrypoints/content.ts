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
    await browser.runtime.sendMessage({
      textContent,
      textBody: document.body.innerHTML,
      currentUrl: window.location.href
    });
    await browser.storage.local.set({ textContent });
    document.addEventListener('keydown', (e: KeyboardEvent) => {      
      const linksObjectString = localStorage.getItem('navigationLinks')
      if ([
        'Digit1',
        'Digit2',
        'Digit3',
        'Digit4',
        'Digit5',
        'Digit6',
        'Digit7',
        'Digit8',
        'Digit9',
        'Digit0'
      ].includes(e.code) && e.ctrlKey && e.shiftKey && linksObjectString) {        
        const linksObject = JSON.parse(linksObjectString)
        const links = linksObject[window.location.href]
        window.location.href = links[Number(e.code.replace('Digit', ''))]
      }
    })

    browser.runtime.onMessage.addListener(async (message) => {
      switch (message.purpose) {
        case Purpose.RELOAD_TEXT:
          await browser.runtime.sendMessage({
            textContent: extractTextFromDOM(document.body),
            textBody: document.body.innerHTML,
            currentUrl: window.location.href
          });
          //browser.storage.sync.set({ textContent });
          await browser.storage.local.set({ textContent });
          break;
        case Purpose.NAVIGATE:
          // window.location.href = message.url
          console.log(`Navigated to: ${message.url}`);
          break;
        case Purpose.NAVIGATION_KEYBOARD_SHORTCUT:
          const navigationLinks = JSON.parse(localStorage.getItem('navigationLinks') ?? '{}')
          if (!message.links) {
            break;
          }
          navigationLinks[window.location.href] = message.links
          localStorage.setItem('navigationLinks', JSON.stringify(navigationLinks))
          break;
      }
    })
  }
})