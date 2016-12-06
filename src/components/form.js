import React from 'react';
import {FormControl, ControlLabel, FormGroup} from 'react-bootstrap';

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

    componentDidMount() {
        this.props.onChangeMeshiState(this.state);
    }

    handleChange(key, e) {
        let newState = this.state;
        newState[key] = e.target.value;

        this.setState(newState);
        this.props.onChangeMeshiState(newState);
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

export default DetailForm;
