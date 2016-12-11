import React from 'react';
import {FormGroup, FormControl, Navbar, Nav, NavItem, MenuItem, Button, ButtonGroup} from 'react-bootstrap';
import {UA} from './utils.js';

export default class MeshiHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postMessage: "#FFXVCOLLA / http://hsimyu.net/igmeshi",
            postingMessage: false,
        }
    }

    uploadImageToTwitter() {
        this.setState({postingMessage: true})
        let cv = document.getElementById("meshiCanvas");

        let png_data = cv.toDataURL('image/png');
        let jpg_data = cv.toDataURL('image/jpeg');

        let dataURL = (png_data.length > jpg_data.length ? jpg_data : png_data);

        $.ajax({
            url: "upload.php",
            dataType: 'text',
            type: 'POST',
            data: {"data": dataURL, "message": this.state.postMessage},
            success: function(data) {
                console.log(data);
                let received = data.split(":");

                if(received.length > 1 && received[0] != "200"){
                    alert("Error: " + received[1]);
                }
                this.setState({postingMessage: false})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("upload.php:", status, err.toString());
            }.bind(this),
        });
    }

    handleChange(key, e) {
        this.setState({[key]: e.target.value});
    }

    render() {
        const {language} = this.props;
        if(UA.Mobile || UA.Tablet){
            return (
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {language == "ja" ? <a href="#">イグニスメシ</a> : <a href="#">IGNIS MESHI</a>}
                        </Navbar.Brand>
                        <Nav>
                        {isTwitterLoggedIn ?
                            <NavItem href="./logout.php">Twitter Log out</NavItem>
                            :
                            <NavItem href="./login.php">Twitter Log in</NavItem>
                        }
                        </Nav>

                    </Navbar.Header>

                    {isTwitterLoggedIn ?
                        <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl style={{width: "100%"}} type="text" value={this.state.postMessage} onChange={(event) => this.handleChange("postMessage", event)} />
                        </FormGroup>

                        {this.state.postingMessage ?
                            <Button block disabled bsStyle="primary" onClick={(event) => this.uploadImageToTwitter(event)} type="submit">
                                <i className="fa fa-refresh fa-spin"></i>
                                &nbsp;
                                {language == "ja" ? "Twitter投稿" : "Post to Twitter"}
                            </Button>
                            :
                            <Button block bsStyle="primary" onClick={(event) => this.uploadImageToTwitter(event)} type="submit">
                                <i className="fa fa-refresh"></i>
                                &nbsp;
                                {language == "ja" ? "Twitter投稿" : "Post to Twitter"}
                            </Button>
                        }
                        </Navbar.Form>
                        :
                        null
                    }
                    <Navbar.Form>
                        <ButtonGroup>
                            <Button onClick={(e) => this.props.changeLang("ja")}>日本語</Button>
                            <Button onClick={(e) => this.props.changeLang("en")}>English</Button>
                        </ButtonGroup>
                    </Navbar.Form>
                </Navbar>
            );
        } else {
            return (
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {language == "ja" ? <a href="#">イグニスメシ</a> : <a href="#">IGNIS MESHI</a>}
                        </Navbar.Brand>
                    </Navbar.Header>

                    <Nav>
                        {isTwitterLoggedIn ?
                            <NavItem href="./logout.php">Twitter Log out</NavItem>
                            :
                            <NavItem href="./login.php">Twitter Log in</NavItem>
                        }
                    </Nav>

                    {isTwitterLoggedIn ?
                        <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl style={{width: "300px", marginRight: "10px"}} type="text" value={this.state.postMessage} onChange={(event) => this.handleChange("postMessage", event)} />
                        </FormGroup>

                        {this.state.postingMessage ?
                            <Button disabled bsStyle="primary" onClick={(event) => this.uploadImageToTwitter(event)} type="submit">
                                <i className="fa fa-refresh fa-spin"></i>
                                &nbsp;
                                {language == "ja" ? "Twitter投稿" : "Post to Twitter"}
                            </Button>
                            :
                            <Button bsStyle="primary" onClick={(event) => this.uploadImageToTwitter(event)} type="submit">
                                <i className="fa fa-refresh"></i>
                                &nbsp;
                                {language == "ja" ? "Twitter投稿" : "Post to Twitter"}
                            </Button>
                        }

                        </Navbar.Form>
                        :
                        null
                    }

                    <Nav>
                        <NavItem href="https://twitter.com/hsimyu">Created By @hsimyu</NavItem>
                    </Nav>

                    <Navbar.Form>
                        <ButtonGroup>
                            <Button onClick={(e) => this.props.changeLang("ja")}>日本語</Button>
                            <Button onClick={(e) => this.props.changeLang("en")}>English</Button>
                        </ButtonGroup>
                    </Navbar.Form>
                </Navbar>
            );
        }
    }
}
