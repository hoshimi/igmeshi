import React from 'react';
import {render} from 'react-dom';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="main_container"> Main Container </div>
    }
}

render(
    <MainContainer/>,
    document.getElementById("app")
);
