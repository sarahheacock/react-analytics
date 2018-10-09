import React from 'react';

class RefreshWindow extends React.Component {
    handleClick(e) {
        chrome.devtools.inspectedWindow.reload({
            ignoreCache: false,
            // userAgent: '',
            // injectedScript: 'myScript.js',
        });
        
        // let entries = 10;
        // const check = () => {
        //     setTimeout(() => {
        //         this.props.getHAR();
        //         entries--;
        //         if(entries) {
        //             check();
        //         }
        //     }, 100);
        // }
        // check();
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)}>Refresh Window</button>
        )
    }
}

export default RefreshWindow;