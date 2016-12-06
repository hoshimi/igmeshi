import React from 'react';
import {render} from 'react-dom';
import {Grid, Col, Row} from 'react-bootstrap';
import DetailForm from './components/form.js';
import MeshiImage from './components/meshiImage.js';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "meshiState": {},
        };
    }

    onChangeMeshiState(newState) {
        this.setState({"meshiState": newState})
    }

    render() {
        return <div className="mainContainer">
                    <h3>イグニスメシ</h3>
                    <MeshiImage meshiState={this.state.meshiState} />
                    <DetailForm onChangeMeshiState={(s) => this.onChangeMeshiState(s)} />
               </div>
    }
}

render(
    <MainContainer/>,
    document.getElementById("app")
);
