import React from 'react';

class RefreshPanel extends React.Component {
    handleClick(e) {
        window.location.reload();
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)}>Refresh Panel</button>
        )
    }
}

export default RefreshPanel;