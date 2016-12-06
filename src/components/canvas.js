// Copied from http://qiita.com/pullphone/items/1b4f4f1c973d9b9342aa
import React, { Component, PropTypes } from 'react';

export default class CanvasComponent extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const { canvas } = this.refs;
    const context = canvas.getContext('2d');
    this.props.updateCanvas(context);
  }

  render() {
    return <canvas id="meshiCanvas" ref="canvas" width={this.props.width} height={this.props.height}></canvas>;
  }
}

CanvasComponent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  updateCanvas: PropTypes.func.isRequired,
};
