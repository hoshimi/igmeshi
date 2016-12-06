import React from 'react';
import {render} from 'react-dom';
import {Navbar, Nav, NavItem, MenuItem, Button} from 'react-bootstrap';
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
                    <MeshiHeader/>
                    <MeshiImage meshiState={this.state.meshiState} />
                    <DetailForm onChangeMeshiState={(s) => this.onChangeMeshiState(s)} />
               </div>
    }
}

class MeshiHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    uploadImageToTwitter() {
        let cv = document.getElementById("meshiCanvas");

        $.ajax({
            url: "upload.php",
            dataType: 'text',
            type: 'POST',
            data: {"data": cv.toDataURL()},
            success: function(data) {
                console.log("success: ", data);
            },
            error: function(xhr, status, err) {
                console.error("upload.php:", status, err.toString());
            },
        });
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">イグニスメシ</a>
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    {isTwitterLoggedIn ?
                        <NavItem href="./logout.php">Twitterログアウト</NavItem>
                        :
                        <NavItem href="./login.php">Twitter認証</NavItem>
                    }
                </Nav>

                <Navbar.Form pullLeft>
                <Button bsStyle="primary" onClick={(event) => this.uploadImageToTwitter(event)} type="submit">Twitter投稿</Button>
                </Navbar.Form>
            </Navbar>
        );
    }
}

render(
    <MainContainer/>,
    document.getElementById("app")
);
