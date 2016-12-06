import React from 'react';
import Dropzone from 'react-dropzone';

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
        return <div><img src={previewUrl}/> </div>;
    }
}

export default MeshiImage;
