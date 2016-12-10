import React from 'react';
import Dropzone from 'react-dropzone';
import CanvasComponent from './canvas.js';
import {Button, ButtonGroup} from 'react-bootstrap';
import {UA} from './utils.js';
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
        const {meshiState, language} = this.props;

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
                        <h3 className="text-primary text-center">
                        {language == "ja" ? "タップしてください" : "Tap Here"}
                        </h3>
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
                        <MeshiImagePreview previewUrl={this.state.preview} meshiState={meshiState} language={language} />
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

    downloadImage(event) {
        let cv = document.getElementById("meshiCanvas");

        let png_data = cv.toDataURL('image/png');
        let jpg_data = cv.toDataURL('image/jpeg');

        let dataURL = (png_data.length > jpg_data.length ? jpg_data : png_data);
        let dataEXT = (png_data.length > jpg_data.length ? ".jpg" : ".png")

        let a = document.createElement('a');
        let e = document.createEvent('MouseEvent');

        a.download = "igmeshi" + this.getDate() + dataEXT;
        a.href = dataURL;

        e.initEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }

    getDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth();
        let yyyy = today.getFullYear();

        if(dd < 0) dd = '0' + dd
        if(mm < 0) mm = '0' + mm

        return yyyy.toString() + mm.toString() + dd.toString()
    }

    render() {
        let imageObject = this.state.image;

        // CANVASサイズは固定で、アスペクト比だけ保存
        const aspect = (imageObject.height/imageObject.width);
        let CANVAS_WIDTH = 1920;
        let CANVAS_HEIGHT = 1920 * aspect;

        const {meshiState, language} = this.props;

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
                ctx.fillText(meshiEff[language].title, baseX + 15, baseY + 27, detailSize.width - 30);
            } else {
                if(language == "ja") {
                    ctx.fillText(meshiEff[language].title + "Lvl." + meshiState["Effect" + meshiId + "Lv"], baseX + 15, baseY + 27, detailSize.width - 30);
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
                ctx.strokeStyle = 'rgba(174, 156, 132, 0.5)';
                ctx.strokeRect(detailSize.x, detailSize.y, detailSize.width, detailSize.height);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(detailSize.x, detailSize.y, detailSize.width, detailSize.height);

                // タイトル上の線
                ctx.fillStyle = 'rgba(237, 215, 168, 1.0)';
                ctx.fillRect(detailSize.x + 15, detailSize.y + 40, detailSize.width - 30, 2);
                ctx.fillStyle = 'rgba(196, 175, 128, 1.0)';
                ctx.fillRect(detailSize.x + 15, detailSize.y + 43, detailSize.width - 30, 1);

                // タイトル背景のグラデーション
                // 横にグラデーションなのでxのみ指定
                // ctx.beginPath();
                // let grad = ctx.createLinearGradient(0, 0, detailSize.width - 30, 0);
                // grad.addColorStop(0,'rgba(0, 0, 0, 0.0)');
                // grad.addColorStop(0.5,'rgba(72, 38, 3, 0.5)');
                // grad.addColorStop(1.0,'rgba(0, 0, 0, 0.0)');
                //
                // ctx.fillStyle = grad;
                // ctx.rect(detailSize.x + 15, detailSize.y + 44, detailSize.width - 30, 35);
                // ctx.fill();

                // タイトル下の線
                ctx.fillStyle = 'rgba(196, 175, 128, 1.0)';
                ctx.fillRect(detailSize.x + 15, detailSize.y + 80, detailSize.width - 30, 1);
                ctx.fillStyle = 'rgba(237, 215, 168, 1.0)';
                ctx.fillRect(detailSize.x + 15, detailSize.y + 82, detailSize.width - 30, 2);

                ctx.fillStyle = "rgba(255, 250, 252, 0.8)";
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
                <CanvasComponent {...canvasProps} />
                <ButtonGroup style={{width: "100%", marginBottom:"15px"}}>
                    <Button onClick={(e) => this.onClickRotation(e)} bsStyle="default">
                    <i className="fa fa-repeat" aria-hidden="true"></i>&nbsp;
                    <span className="text-center">{language == "ja" ? "右に回転" : "Rotate"}</span>
                    </Button>

                    <Button bsStyle="default" onClick={(event) => this.downloadImage(event)}>
                    <i className="fa fa-download"></i>&nbsp;
                    <span className="text-center">{language == "ja" ? "保存用画像を生成" : "Download"}</span>
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default MeshiImage;
