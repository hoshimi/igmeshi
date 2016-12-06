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
               <Grid>
               <Row>
                    <h3>イグニスメシ</h3>
                    <Col xs={12}><MeshiImage meshiState={this.state.meshiState} /></Col>
                    <Col xs={12}><DetailForm onChangeMeshiState={(s) => this.onChangeMeshiState(s)} /></Col>
               </Row>
               </Grid>
               </div>
    }
}

render(
    <MainContainer/>,
    document.getElementById("app")
);
