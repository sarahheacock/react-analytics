import React from 'react';
import RefreshPanel from './RefreshPanel';
import RefreshWindow from './RefreshWindow';

// measure page load on refresh
// measure square color change onClick

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            log: [],
        }

        this.getHAR = this.getHAR.bind(this);
    }

    componentDidMount() {
        // chrome.devtools.network.onRequestFinished(() => {
        //     this.getHAR();
        // })
        // this.getHAR();
        // chrome.devtools.inspectedWindow.eval('window.onload = function() { console.log("HELLO"); }');
    }

    sendMessage() {
        // Relay the tab ID to the background page
        chrome.runtime.sendMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            scriptToInject: "content_script.js"
        });
    }

    getHAR() {
        chrome.devtools.network.getHAR((har) => {
            this.setState({ log: [...this.state.log, JSON.stringify(har, null, 4)] });
        });
    }

    clear() {
        this.setState({ log: [] });
    }

    render() {
        return (
            <div>
                <RefreshPanel />
                <RefreshWindow getHAR={this.getHAR} />
                <button onClick={(e) => this.clear(e)}>Clear</button>
                <button onClick={(e) => this.sendMessage(e)}>Message</button>
                <h2>React Analytics!!</h2>
                {this.state.log.map((line, i) => (
                    <div key={`log${i}`}>
                        <p>{line}</p>
                        <hr />
                    </div>
                ))}
            </div>
        )
    }
}

export default App;