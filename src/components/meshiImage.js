import React from 'react';
import Dropzone from 'react-dropzone';
import CanvasComponent from './canvas.js';
import {Button} from 'react-bootstrap';

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
                        style={{width: "100%", height: CANVAS_HEIGHT, borderWidth: 2, borderColor: '#666', borderStyle: 'dashed', borderRadius: 5}}
                    >
                    <p className="text-primary">
                    めしがぞうをドラッグアンドドロップ<br/>
                    対応形式: gif, jpeg, jpg, png
                    </p>
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
            x: CANVAS_WIDTH - 280,
            y: CANVAS_HEIGHT - 180,
            width: 260,
            height: 145,
        };

        let drawMeshiEffect = function(ctx, baseX, baseY, meshiId) {
            ctx.textAlign = "left";
            // box
            ctx.fillStyle = "rgba(40, 76, 92, 0.3)";
            ctx.fillRect(baseX, baseY, detailSize.width - 20, 30);
            // line
            ctx.fillStyle = "rgba(40, 76, 92, 0.3)";
            ctx.fillRect(baseX + 5, baseY + 10, detailSize.width - 25, 1);
            // text
            ctx.font = "8pt 'YuGothic','Meiryo UI','メイリオ','Meiryo'";
            ctx.fillStyle = "rgba(134, 195, 237, 1.0)";
            ctx.fillText(meshiState["Effect" + meshiId + "Title"] + "Lvl." + meshiState["Effect" + meshiId + "Lv"], baseX + 10, baseY + 9);

            ctx.font = "4pt 'YuGothic','Meiryo UI','メイリオ','Meiryo'";
            ctx.fillStyle = "rgba(204, 222, 232, 1.0)";
            ctx.fillText(meshiState["Effect" + meshiId + "Desc"], baseX + 10, baseY + 24);
        }

        const canvasProps = {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            updateCanvas: (ctx) => {
                const imageObject = new Image();
                imageObject.src = previewUrl;
                imageObject.onload = () => {
                    ctx.drawImage(imageObject, 0, 0, imageObject.width, imageObject.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                    // 枠
                    ctx.strokeStyle = 'rgba(256, 256, 256, 0.2)';
                    ctx.strokeRect(detailSize.x, detailSize.y, detailSize.width, detailSize.height);
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    ctx.fillRect(detailSize.x, detailSize.y, detailSize.width, detailSize.height);

                    // タイトル上下の緑線
                    ctx.fillStyle = 'rgba(141, 209, 137, 1.0)';
                    ctx.fillRect(detailSize.x + 10, detailSize.y + 20, detailSize.width - 20, 2);
                    ctx.fillStyle = 'rgba(67, 101, 67, 1.0)';
                    ctx.fillRect(detailSize.x + 10, detailSize.y + 21, detailSize.width - 20, 1);

                    ctx.fillStyle = 'rgba(76, 114, 76, 1.0)';
                    ctx.fillRect(detailSize.x + 10, detailSize.y + 35, detailSize.width - 20, 1);
                    ctx.fillStyle = 'rgba(122, 181, 119, 1.0)';
                    ctx.fillRect(detailSize.x + 10, detailSize.y + 36, detailSize.width - 20, 1);

                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.font = "8pt 'YuGothic','Meiryo UI','メイリオ','Meiryo'";
                    ctx.textAlign = "center";
                    ctx.fillText(meshiState.FoodTitle, detailSize.x + (detailSize.width/2), detailSize.y + 32);

                    ctx.textAlign = "left";
                    drawMeshiEffect(ctx, detailSize.x + 10, detailSize.y + 41, "1");
                    drawMeshiEffect(ctx, detailSize.x + 10, detailSize.y + 74, "2");
                    drawMeshiEffect(ctx, detailSize.x + 10, detailSize.y + 107, "3");

                    // next button
                    ctx.textAlign = "right";
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.fillText("◯ 次へ", detailSize.x + detailSize.width, detailSize.y + detailSize.height + 20);
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
