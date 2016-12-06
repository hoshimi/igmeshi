import React from 'react';
import {render} from 'react-dom';
import {Grid, Col, Row, FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
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

class DetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FoodTitle: "",
            Effect1: "",
            Effect2: "",
            Effect3: "",
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, e) {
        this.setState({[key]: e.target.value})
    }

    render() {
        return (
            <FormGroup controlId="meshiForm">
            <ControlLabel>料理名</ControlLabel>
            <FormControl type="text" value={this.state.FoodTitle} onChange={this.handleChange.bind(this, "FoodTitle")}/>
            <ControlLabel>効果1</ControlLabel>
            <FormControl type="text" value={this.state.Effect1} onChange={this.handleChange.bind(this, "Effect1")}/>
            <ControlLabel>効果2</ControlLabel>
            <FormControl type="text" value={this.state.Effect2} onChange={this.handleChange.bind(this, "Effect2")}/>
            <ControlLabel>効果3</ControlLabel>
            <FormControl type="text" value={this.state.Effect3} onChange={this.handleChange.bind(this, "Effect3")}/>
            </FormGroup>
            )
    }
}

render(
    <MainContainer/>,
    document.getElementById("app")
);
