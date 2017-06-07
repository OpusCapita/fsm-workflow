import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import sizeMe from 'react-sizeme';
import './Viewport.less';

const workareaWidth = 10000;
const workareaHeight = 10000;

const propTypes = {
  allowPan: PropTypes.bool,
  gridSize: PropTypes.number,
  showGrid: PropTypes.bool,
  scale: PropTypes.number,
  size: PropTypes.object,
  snap: PropTypes.bool,
  onWheel: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseClick: PropTypes.func,
  onPan: PropTypes.func,
  onKeyDown: PropTypes.func,
  onClickOutside: PropTypes.func,
  panOffsetX: PropTypes.number,
  panOffsetY: PropTypes.number
};
const defaultProps = {
  allowPan: true,
  gridSize: 40,
  showGrid: false,
  scale: 1,
  size: null,
  snap: true,
  snapSize: 10,
  onWheel: () => {},
  onMouseMove: () => {},
  onMouseLeave: () => {},
  onPan: () => {},
  onKeyDown: () => {},
  onClickOutside: () => {},
  panOffsetX: 0,
  panOffsetY: 0
};

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseInside: false,
      panning: false
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount () {
    document.body.addEventListener('click', this.handleBodyClick);
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    document.body.removeEventListener('click', this.handleBodyClick);
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBodyClick(e) {
    if (!this.viewportRef.contains(e.target)) {
      this.props.onClickOutside(e);
    }
  }

  handleKeyDown(e) {
    this.props.onKeyDown(e);
  }

  handleMouseDown(e) {
    this.setState({ panning: true });
    this.props.onMouseDown(e);
  }

  handleMouseUp(e) {
    this.setState({ panning: false });
    this.props.onMouseUp(e);
  }

  handleMouseEnter(e) {
    this.setState({ mouseInside: true });
  }

  handleMouseLeave(e) {
    this.setState({ mouseInside: false });
    this.props.onMouseLeave(e, { x: null, y: null });
  }

  handleMouseMove(e) {
    const viewportMouseX = (e.clientX - this.props.size.position.left) / this.props.scale - this.props.panOffsetX;
    const viewportMouseY = (e.clientY - this.props.size.position.top) / this.props.scale - this.props.panOffsetY;
    this.props.onMouseMove(e, { x: viewportMouseX, y: viewportMouseY });
  }

  handleWheel(e) {
    e.preventDefault();
    this.handleMouseMove(e);
    this.props.onWheel(e);
  }

  handleDrag(e, data) {
    if(this.props.allowPan) {
      this.props.onPan(e, data);
    }
  }

  render() {
    const {
      allowPan,
      gridSize,
      showGrid,
      onWheel,
      onClick,
      onMouseDown,
      onMouseUp,
      scale,
      snap,
      size,
      children,
      panOffsetX,
      panOffsetY
    } = this.props;

    const { panning } = this.state;

    const viewportWidth = size.width / scale;
    const viewportHeight = size.height / scale;

    const bigGridSize = gridSize * 10;
    const defs = (
      <defs key={Math.random()}>
        <pattern id="smallGrid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#eee" strokeWidth="0.5"/>
        </pattern>
        <pattern id="grid" width={bigGridSize} height={bigGridSize} patternUnits="userSpaceOnUse">
          <rect width={bigGridSize} height={bigGridSize} fill="url(#smallGrid)"/>
          <path d={`M ${bigGridSize} 0 L 0 0 0 ${bigGridSize}`} fill="none" stroke="#aaa" strokeWidth="1"/>
        </pattern>
      </defs>
    );

    return (
      <div
        ref={ref => (this.viewportRef = ref)}
        className={`fsm--viewport ${(panning) ? 'fsm--viewport--panning' : ''}`}
        onWheel={this.handleWheel}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <DraggableCore
          onDrag={this.handleDrag}
          grid={snap ? [gridSize, gridSize] : null}
        >
          <svg
            version="1.1"
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewportWidth} ${viewportHeight}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            {defs}
            <g transform={`translate(${panOffsetX},${panOffsetY})`}>
              <rect
                width={workareaWidth}
                height={workareaHeight}
                fill={showGrid ? 'url(#grid)' : 'none'}
                stroke="#aaa"
                onMouseDown={onMouseDown}
                onClick={onClick}
              />
              {children}
            </g>
          </svg>
        </DraggableCore>
      </div>
    );
  }
}

Viewport.propTypes = propTypes;
Viewport.defaultProps = defaultProps;

const sizeMeConfig = {
  monitorWidth: true,
  monitorHeight: true,
  monitorPosition: true
};
export default sizeMe(sizeMeConfig)(Viewport);
