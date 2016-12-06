import React from 'react';
import Dropzone from 'react-dropzone';
import CanvasComponent from './canvas.js';

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

class MeshiImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preview: []
        };
    }

    onClickRemoveButton(event) {
        this.setState({"preview": ""});
    }

    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({"preview": acceptedFiles[0].preview});
        console.log(acceptedFiles[0]);
    }

    render() {
        const {meshiState} = this.props;

        return (
        <div>
            {this.state.preview == "" ?
                    <Dropzone
                        onDrop={(e) => this.onDrop(e)}
                        accept="image/gif,image/jpeg,image/png,image/jpg"
                        multiple={false}
                    >
                    めしがぞう
                    </Dropzone>
                :
                    <div align="right">
                        <i className="fa fa-times fa-4x" aria-hidden="true" onClick={(event) => this.onClickRemoveButton(event)}></i>
                        <MeshiImagePreview previewUrl={this.state.preview} meshiState={meshiState} />
                    </div>
            }
        </div>
    );
    }
}

class MeshiImagePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {previewUrl, meshiState} = this.props;
        const detailSize = {
            x: CANVAS_WIDTH - 250,
            y: CANVAS_HEIGHT - 180,
            width: 230,
            height: 140,
        };

        const canvasProps = {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            updateCanvas: (ctx) => {
                const imageObject = new Image();
                imageObject.src = previewUrl;
                imageObject.onload = () => {
                    ctx.drawImage(imageObject, 0, 0, imageObject.width, imageObject.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                    ctx.strokeRect(detailSize.x, detailSize.y, detailSize.width, detailSize.height);
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    ctx.fillRect(detailSize.x, detailSize.y, detailSize.width, detailSize.height);

                    ctx.font = "11px 'メイリオ'";
                    ctx.fillStyle = "rgba(256, 256, 256, 1.0)";
                    ctx.textAlign = "center";
                    ctx.fillText(meshiState.FoodTitle, detailSize.x + (detailSize.width/2), detailSize.y + 20);

                    ctx.fillText(meshiState.Effect1, detailSize.x + (detailSize.width/2), detailSize.y + 40);
                    ctx.fillText(meshiState.Effect2, detailSize.x + (detailSize.width/2), detailSize.y + 60);
                    ctx.fillText(meshiState.Effect3, detailSize.x + (detailSize.width/2), detailSize.y + 80);

                }
            },
        }

        return (
            <div>
                <CanvasComponent {...canvasProps} />
            </div>
        );
    }
}

export default MeshiImage;
