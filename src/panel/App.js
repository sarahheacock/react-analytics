import React from 'react';
import RefreshPanel from './RefreshPanel';
import RefreshWindow from './RefreshWindow';

// measure page load on refresh
// measure square color change onClick

const limit = 30;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            log: [],
            sum: 0,
        }

        // this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => this.devToolsListener(message.message));
    }

    devToolsListener(num) {
        this.setState(prevState => {
            return {
                log: [...prevState.log, num],
                sum: prevState.sum + num
            };
        }, () => {
            if (this.state.log.length < limit) {
                setTimeout(() => {
                    this.analyze();
                }, 100);
            }
        });
    }

    analyze() {
        const start = Date.now();

        chrome.devtools.inspectedWindow.reload({
            injectedScript: `window.onload = () => {
                const end = Date.now() - ${start};
                console.log(end); 
                const editorExtensionId = "jildfejnioddhchjponibnknlcnoekgn";
                chrome.runtime.sendMessage(editorExtensionId, { message: end });
            };`
        }, (res, err) => {
            console.log(res);
        })
    }

    clear() {
        this.setState({ log: [], sum: 0 });
    }

    average() {
        return this.state.sum / this.state.log.length;
    }

    deviation() {
        const mean = this.average();
        const result = this.state.log.reduce((total, num) => {
            return total + Math.pow(num - mean, 2);
        }, 0);
        return Math.pow(result / this.state.log.length, 0.5);
    }

    render() {
        return (
            <div>
                <RefreshPanel />
                <RefreshWindow />
                <button onClick={(e) => this.clear(e)}>Clear</button>
                <button onClick={(e) => this.analyze(e)}>Analyze</button>
                <h2>React Analytics!!</h2>
                <p><b>Average:</b>{this.average()}</p>
                <p><b>SD:</b>{this.deviation()}</p>
                <p><b>Num:</b>{this.state.log.length}</p>
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