import React from 'react';
import Dropzone from 'react-dropzone';
import CanvasComponent from './canvas.js';
import {Button, ButtonGroup} from 'react-bootstrap';
import {UA, language} from './utils.js';
import effects_descriptions from './effect_consts.js';

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
                        style={{width: "100%", height: "300px", borderWidth: 2, borderColor: '#666', borderStyle: 'dashed', borderRadius: 5}}
                    >
                    {(UA.Mobile || UA.Tablet) ?
                        <h2 className="text-primary text-center">
                        {language == "ja" ? "タップしてください" : "Tap Here"}
                        </h2>
                        :
                        <div>
                        <h2 className="text-primary text-center">
                        めしがぞうをドラッグアンドドロップ<br/>
                        対応形式: gif, jpeg, jpg, png
                        </h2>

                        <h2 className="text-primary text-center">
                        Drag and Drop food image here<br/>
                        Formats: gif, jpeg, jpg, png
                        </h2>
                        </div>
                    }
                    </Dropzone>
                :
                    <div>
                        <i className="fa fa-times fa-2x closeButton" aria-hidden="true" onClick={(event) => this.onClickRemoveButton(event)}></i>
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
        let imageObject = new Image();
        imageObject.src = this.props.previewUrl;

        // imageObjectがロードされたらstateが更新されるようにしてしまう
        imageObject.onload = () => {
            this.setState({isLoaded: true})
        };

        this.state = {
            image: imageObject,
            isLoaded: false,
            rotation: 0,
        }
    }

    componentWillReceiveProps(props) {
        if(props.previewUrl != this.props.previewUrl){
            let imageObject = new Image();
            imageObject.src = props.previewUrl;
            // imageObjectがロードされたらstateが更新されるようにしてしまう
            imageObject.onload = () => {
                this.setState({isLoaded: true})

            };

            this.setState({image: imageObject, isLoaded: false});
        }
    }

    imageResize(image_src, mime_type, width, height, rotate) {
        // New Canvas
        let canvas = document.createElement('canvas');
        if(rotate == 90 || rotate == 270) {
            // swap w <==> h
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }
        // Draw (Resize)
        let ctx = canvas.getContext('2d');
        if(rotate && rotate > 0) {
            ctx.rotate(rotate * Math.PI / 180);
            if(rotate == 90)
                ctx.translate(0, -height);
            else if(rotate == 180)
                ctx.translate(-width, -height);
            else if(rotate == 270)
                ctx.translate(-width, 0);
        }
        ctx.drawImage(image_src, 0, 0, width, height);
        // Image Base64
        return canvas.toDataURL(mime_type);
    }

    onClickRotation(e) {
        let rotation = this.state.rotation + 90;

        if(rotation > 360) rotation = 0;
        this.setState({rotation: rotation});

        let imageObject = this.state.image;
        imageObject.src = this.imageResize(imageObject, "image/jpeg", imageObject.width, imageObject.height, 90.0);

        this.setState({isLoaded: false})

        imageObject.onload = () => {
            this.setState({isLoaded: true})
            this.setState({image: imageObject});
        };
    }

    render() {
        let imageObject = this.state.image;

        // CANVASサイズは固定で、アスペクト比だけ保存
        const aspect = (imageObject.height/imageObject.width);
        let CANVAS_WIDTH = 1920;
        let CANVAS_HEIGHT = 1920 * aspect;

        const {meshiState} = this.props;

        // let detailSize = {
        //     x: 3.2 * CANVAS_WIDTH/5,
        //     y: 3.0 * CANVAS_HEIGHT/5,
        //     width: (1.3 * CANVAS_WIDTH/4),
        //     height: (1.5 * CANVAS_HEIGHT/5),
        // };

        // 効果枠はワイドかノーマルかで大きく分けて、あとは固定にする
        let detailSize;
        if(aspect > 10/16) {
            // ノーマルの時
            detailSize = {
                x: 1229,
                y: 3.0 * CANVAS_HEIGHT/5,
                width: 624,
                height: 432,
            };
        } else {
            // ワイドの時
            detailSize = {
                x: 1229,
                y: 2.7 * CANVAS_HEIGHT/5,
                width: 624,
                height: 432,
            };
        }

        let drawMeshiEffect = (ctx, baseX, baseY, meshiId) => {
            let meshiEff = effects_descriptions[meshiState["Effect" + meshiId]];

            ctx.textAlign = "left";
            // box
            ctx.fillStyle = "rgba(40, 76, 92, 0.3)";
            ctx.fillRect(baseX, baseY, detailSize.width - 30, 100);
            // line
            ctx.fillStyle = "rgba(204, 222, 232, 0.6)";
            ctx.fillRect(baseX + 15, baseY + 30, detailSize.width - 60, 1);
            // text
            ctx.font = "22px 'YuGothic','Meiryo UI','メイリオ','Meiryo'";
            ctx.fillStyle = "rgba(134, 195, 237, 1.0)";
            if(meshiEff.ja.nolv) {
                ctx.fillText(meshiEff[language].title, baseX + 15, baseY + 27);
            } else {
                if(language == "ja") {
                    ctx.fillText(meshiEff[language].title + "Lvl." + meshiState["Effect" + meshiId + "Lv"], baseX + 15, baseY + 27);
                } else {
                    ctx.fillText(meshiEff[language].title + " (Level " + meshiState["Effect" + meshiId + "Lv"] + ")", baseX + 15, baseY + 27, detailSize.width - 30);
                }
            }

            ctx.font = "18px 'YuGothic','Meiryo UI','メイリオ','Meiryo'";
            ctx.fillStyle = "rgba(204, 222, 232, 1.0)";
            ctx.fillText(meshiState["Effect" + meshiId + "Desc"], baseX + 15, baseY + 70);

        }

        const canvasProps = {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            updateCanvas: (ctx) => {
                let imageObject = this.state.image;
                ctx.drawImage(imageObject, 0, 0, imageObject.width, imageObject.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                // 枠
                ctx.strokeStyle = 'rgba(256, 256, 256, 0.2)';
                ctx.strokeRect(detailSize.x, detailSize.y, detailSize.width, detailSize.height);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(detailSize.x, detailSize.y, detailSize.width, detailSize.height);

                // タイトル上下の緑線
                ctx.fillStyle = 'rgba(141, 209, 137, 1.0)';
                ctx.fillRect(detailSize.x + 15, detailSize.y + 40, detailSize.width - 30, 2);
                ctx.fillStyle = 'rgba(67, 101, 67, 1.0)';
                ctx.fillRect(detailSize.x + 15, detailSize.y + 42, detailSize.width - 30, 2);

                ctx.fillStyle = 'rgba(76, 114, 76, 1.0)';
                ctx.fillRect(detailSize.x + 15, detailSize.y + 80, detailSize.width - 30, 2);
                ctx.fillStyle = 'rgba(122, 181, 119, 1.0)';
                ctx.fillRect(detailSize.x + 15, detailSize.y + 82, detailSize.width - 30, 2);

                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.font = "24px 'YuGothic','Meiryo UI','メイリオ','Meiryo'";
                ctx.textAlign = "center";
                ctx.fillText(meshiState.FoodTitle, detailSize.x + (detailSize.width/2), detailSize.y + 72);

                ctx.textAlign = "left";
                drawMeshiEffect(ctx, detailSize.x + 15, detailSize.y + 92, "1");
                drawMeshiEffect(ctx, detailSize.x + 15, detailSize.y + 202, "2");
                drawMeshiEffect(ctx, detailSize.x + 15, detailSize.y + 312, "3");

                // next button
                ctx.textAlign = "right";
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.font = "30px 'YuGothic','Meiryo UI','メイリオ','Meiryo'";
                ctx.fillText("◯ 次へ", detailSize.x + detailSize.width, detailSize.y + detailSize.height + 40);
            },
        }

        return (
            <div>
                <ButtonGroup>
                <Button onClick={(e) => this.onClickRotation(e)} bsStyle="default">
                <i className="fa fa-repeat" aria-hidden="true"></i>&nbsp;右に回転 / Rotate
                </Button>
                </ButtonGroup>
                <CanvasComponent {...canvasProps} />
            </div>
        );
    }
}

export default MeshiImage;
