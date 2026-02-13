export default defineBackground(() => {
  // Open side panel when extension icon is clicked
  browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  // Listen for messages from side panel
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'FETCH_HEADERS') {
      fetch(message.url, { method: 'HEAD', mode: 'no-cors' })
        .then((response) => {
          const headers: Record<string, string> = {};
          response.headers.forEach((value, key) => {
            headers[key] = value;
          });
          sendResponse({ headers });
        })
        .catch((err) => sendResponse({ error: err.message }));
      return true;
    }
  });
});
