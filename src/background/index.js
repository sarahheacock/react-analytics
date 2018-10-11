// Background page -- background.js

// DOMContentLoaded indicates when the browser has finished parsing the document
// (but other resources such as images and stylesheets may/may not have been downloaded). It is represented as a blue line.

// The load event fired will occur once all the initial resources (images, stylesheets, JavaScript) have been downloaded.
// It is represented as a red line.

const injectCode = (start) => (
    `const myScript = document.createElement('script');
    myScript.text = "window.onload = () => console.log(Date.now() - ${start});";
    document.getElementsByTagName('head')[0].appendChild(myScript);`
);

// assign the listener function to a variable so we can remove it later
const devToolsListener = (message, sender, sendResponse) => {
    window.alert(message);
    // Inject a content script into the identified tab
    // message.scriptToInject
    // const count = 10;
    // for (let i = 0; i < limit; i++) {
        // chrome.tabs.reload(message.tabId, { bypassCache: true }, () => {
        //     // hacky way to inject script after DOMContentLoaded but before window.onload
        //     const start = Date.now();
        //     setTimeout(() => {
        //         chrome.tabs.executeScript(message.tabId, {
        //             code: injectCode(start),
        //             runAt: "document_end",
        //         }, (results) => {
        //             window.alert(JSON.stringify(results, null, 4));
        //         });
        //     }, 100);
        // });
    // }
}

// chrome.runtime.onMessageExternal.addListener(devToolsListener);
chrome.runtime.onConnect.addListener((devToolsConnection) => {
    // add the listener
    window.alert('Connect');
    chrome.runtime.onMessage.addListener(devToolsListener);
});

// chrome.runtime.onDisconnect.addListener(() => {
//     chrome.runtime.onMessage.removeListener(devToolsListener);
// });