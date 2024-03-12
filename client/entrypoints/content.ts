import browser from 'webextension-polyfill';
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
          // Extract text content from the entire document
        const textContent: string = extractTextFromDOM(document.body)
        const textBody = document.body.innerHTML;
          // Send text content to the background script
        browser.runtime.sendMessage({ textContent, textBody });
        browser.storage.sync.set({ textContent });
        browser.storage.local.set({textContent})
    }
})