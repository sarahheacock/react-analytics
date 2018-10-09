// const button = document.getElementById('refresh');
// button.onclick = () => {
//     window.location.reload();
// }

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    // window.alert(message);
});

ReactDOM.render(<App />, document.getElementById('root'));