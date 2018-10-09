// Background page -- background.js

chrome.runtime.onConnect.addListener((devToolsConnection) => {
    // assign the listener function to a variable so we can remove it later
    const devToolsListener = (message, sender, sendResponse) => {
        // Inject a content script into the identified tab
        chrome.tabs.executeScript(message.tabId, { file: message.scriptToInject }, (results) => {
            window.alert('DONE');
        });
    }

    // add the listener
    if (chrome.runtime) {
        chrome.runtime.onMessage.addListener(devToolsListener);
    }

    // chrome.runtime.onDisconnect.addListener(() => {
    //     if (chrome.runtime && chrome.runtime.onMessage) {
    //         chrome.runtime.onMessage.removeListener(devToolsListener);
    //     }
    // });
})