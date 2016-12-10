import React from 'react';
import {render} from 'react-dom';
import DetailForm from './components/form.js';
import MeshiImage from './components/meshiImage.js';
import MeshiHeader from './components/meshiHeader.js';
import {UA, getLanguage} from './components/utils.js';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "meshiState": {},
            "language": getLanguage(),
        };
    }

    onChangeLang(locale) {
        this.setState({language: locale});
    }

    onChangeMeshiState(newState) {
        this.setState({"meshiState": newState})
    }

    render() {
        return <div className="mainContainer">
                    <MeshiHeader changeLang={(locale) => this.onChangeLang(locale) } language={this.state.language} />
                    <MeshiImage meshiState={this.state.meshiState} language={this.state.language} />
                    <DetailForm onChangeMeshiState={(s) => this.onChangeMeshiState(s)} language={this.state.language} />
               </div>
    }
}

render(
    <MainContainer/>,
    document.getElementById("app")
);
