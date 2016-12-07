import React from 'react';
import {Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
import UA from './utils.js';
import effects_descriptions from './effect_consts.js';

const effects_raw = ["ATKUP", "DEFUP", "HPUP", "INTUP", "MNDUP", "HPCUREUP", "POISSON_GUARD", "TODO_GUARD", "DEATH_GUARD", "STATUS_GUARD", "FIRE_GUARD", "ICE_GUARD", "THUNDER_GUARD", "ELEMENT_GUARD", "GOODNESS", "LVBONUS"];
const effectsLVs_raw = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150];

const effects = effects_raw.map( (eff, ind) => <option key={ind} value={eff}>{effects_descriptions[eff]["ja"]["title"]}</option> );
const effectsLVs = effectsLVs_raw.map( (eff, ind) => <option key={ind} value={eff}>Lv.{eff}</option> );

class DetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FoodTitle: "",
            Effect1: "none",
            Effect1Lv: 1,
            Effect1Desc: "",
            Effect2: "none",
            Effect2Desc: "",
            Effect2Lv: 1,
            Effect3: "none",
            Effect3Desc: "",
            Effect3Lv: 1,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.onChangeMeshiState(this.state);
    }

    generateRandomEffect(event) {
        let meshiInd, meshiLVInd;
        let newState = this.state;
        let usedKeys = [];
        for(let i = 1; i <= 3; i++){
            let temp_key = "Effect" + i;
            meshiInd = Math.floor(effects_raw.length * Math.random());
            while(usedKeys.indexOf(meshiInd) >= 0) {
                meshiInd = Math.floor(effects_raw.length * Math.random());
            }

            let eff = effects_descriptions[effects_raw[meshiInd]];
            newState[temp_key] = effects_raw[meshiInd];

            usedKeys.unshift(meshiInd);

            if(!eff["ja"]["nolv"]) {
                temp_key = "Effect" + i + "Lv";
                meshiLVInd = Math.floor(effectsLVs_raw.length * Math.random());
                newState[temp_key] = effectsLVs_raw[meshiLVInd];
            }
        }
        this.updateEffectDesc(newState);
        this.setState(newState);
        this.props.onChangeMeshiState(this.state);
    }

    updateEffectDesc(newState) {
        if(newState["Effect1"] != "") {
            let desc = effects_descriptions[newState["Effect1"]].ja.desc;
            let descAmount = effects_descriptions[newState["Effect1"]].ja.amount;
            let lv = newState["Effect1Lv"];
            desc = desc.replace(/@@/g, (descAmount * lv).toString());
            newState["Effect1Desc"] = desc;
        }

        if(newState["Effect2"] != "") {
            let desc = effects_descriptions[newState["Effect2"]].ja.desc;
            let descAmount = effects_descriptions[newState["Effect2"]].ja.amount;
            let lv = newState["Effect2Lv"];
            desc = desc.replace(/@@/g, (descAmount * lv).toString());
            newState["Effect2Desc"] = desc;
        }

        if(newState["Effect3"] != "") {
            let desc = effects_descriptions[newState["Effect3"]].ja.desc;
            let descAmount = effects_descriptions[newState["Effect3"]].ja.amount;
            let lv = newState["Effect3Lv"];
            desc = desc.replace(/@@/g, (descAmount * lv).toString());
            newState["Effect3Desc"] = desc;
        }
    }

    handleChange(key, e) {
        let newState = this.state;
        newState[key] = e.target.value;

        if(key != "FoodTitle") {
            this.updateEffectDesc(newState);
        }

        this.setState(newState);
        this.props.onChangeMeshiState(newState);
    }

    render() {
        return (
            <FormGroup controlId="meshiForm">
            {(UA.Mobile || UA.Tablet) ?
                <Button block onClick={(event) => this.generateRandomEffect(event)} bsSize="large" bsStyle="primary">めし効果生成(ランダム)</Button>
                :
                <Button onClick={(event) => this.generateRandomEffect(event)} bsSize="large" bsStyle="primary">めし効果生成(ランダム)</Button>
            }

            <hr/>
            <ControlLabel>料理名</ControlLabel>
            <FormControl type="text" value={this.state.FoodTitle} onChange={this.handleChange.bind(this, "FoodTitle")}/>

            <ControlLabel>効果1</ControlLabel>
            <FormControl componentClass="select" value={this.state.Effect1} onChange={(event) => this.handleChange("Effect1", event)}>
            {effects}
            </FormControl>
            <FormControl componentClass="select" value={this.state.Effect1Lv} onChange={(event) => this.handleChange("Effect1Lv", event)}>
            {effectsLVs}
            </FormControl>

            <ControlLabel>効果2</ControlLabel>
            <FormControl componentClass="select" value={this.state.Effect2} onChange={(event) => this.handleChange("Effect2", event)}>
            {effects}
            </FormControl>
            <FormControl componentClass="select" value={this.state.Effect2Lv} onChange={(event) => this.handleChange("Effect2Lv", event)}>
            {effectsLVs}
            </FormControl>

            <ControlLabel>効果3</ControlLabel>
            <FormControl componentClass="select" value={this.state.Effect3} onChange={(event) => this.handleChange("Effect3", event)}>
            {effects}
            </FormControl>
            <FormControl componentClass="select" value={this.state.Effect3Lv} onChange={(event) => this.handleChange("Effect3Lv", event)}>
            {effectsLVs}
            </FormControl>

            </FormGroup>
            )
    }
}

export default DetailForm;
