import React from 'react';
import {render} from 'react-dom';
import {Grid, Col, Row} from 'react-bootstrap';
import DetailForm from './components/form.js';
// import ReactCanvas from 'react-canvas';
// import {Surface, Image, Text} from 'react-canvas';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mainContainer">
               <Grid>
               <Row>
                    <h3>イグニスメシ</h3>
                    <Col xs={12}><DetailForm/></Col>
               </Row>
               </Grid>
               </div>
    }
}

render(
    <MainContainer/>,
    document.getElementById("app")
);
