import { createMock } from '@vitejs/plugin-test-utils';
// Import the test utils from Vite


// Create a mock implementation of browser.contextMenus.create
const mockCreate = jest.fn();

// Mock the browser object
const mockBrowser = createMock({
  browser: {
    contextMenus: {
      create: mockCreate
    }
  }
});

// Use the mock browser in your tests
test('your test case', async () => {
  // Use mockCreate as the mock implementation of browser.contextMenus.create

  // Example usage:
  await mockCreate(/* specify parameters here */);

  // Add assertions as needed
});
