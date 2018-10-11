import React from 'react';

class RefreshWindow extends React.Component {
    handleClick(e) {
        chrome.devtools.inspectedWindow.reload({
            ignoreCache: false,
        });
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)}>Refresh Window</button>
        )
    }
}

export default RefreshWindow;