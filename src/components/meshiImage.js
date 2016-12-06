import React from 'react';
import Dropzone from 'react-dropzone';
import CanvasComponent from './canvas.js';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

class MeshiImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preview: []
        };
    }

    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({"preview": acceptedFiles[0].preview});
    }

    render() {

        return (
        <div>
            <Dropzone
                onDrop={(e) => this.onDrop(e)}
                accept="image/gif,image/jpeg,image/png,image/jpg"
                multiple={false}
            >
            めしがぞう
            </Dropzone>
            {this.state.preview == "" ? null : <MeshiImagePreview previewUrl={this.state.preview}/>}
        </div>
    );
    }
}

class MeshiImagePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {previewUrl} = this.props;

        const canvasProps = {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            updateCanvas: (context) => {
                const imageObject = new Image(CANVAS_WIDTH, CANVAS_HEIGHT);
                imageObject.src = previewUrl;
                imageObject.onload = () => {
                    context.drawImage(imageObject, 0, 0);
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
