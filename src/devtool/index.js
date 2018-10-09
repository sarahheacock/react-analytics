// DevTools page -- devtools.js
// Create a connection to the background page
chrome.devtools.panels.create("MyReactAnalytics",
                              "coldfusion10.png",
                              "panel.html",
                              (panel) => { });
