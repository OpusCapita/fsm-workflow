import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BezierCurve from '../BezierCurve';
import './BezierTransition.less';
import { DraggableCore } from 'react-draggable';

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string),
  arrowPosition: PropTypes.number,
  arrowSize: PropTypes.number,
  bezier: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
  selected: PropTypes.bool,
  showPoints: PropTypes.bool,
  snap: PropTypes.bool,
  snapStep: PropTypes.number,
  scale: PropTypes.number,
  label: PropTypes.string,
  lineWidth: PropTypes.number,
  cursorPosition: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  onChange: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onClick: PropTypes.func,
  pointSize: PropTypes.number,
  pointsColor1: PropTypes.string,
  pointsColor2: PropTypes.string,
  snapStep: PropTypes.number,
  stickyDistance: PropTypes.number,
  stickyPoints: PropTypes.objectOf(PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }))
};
const defaultProps = {
  arrowPosition: 0,
  arrowSize: 30,
  bezier: [100,25 , 10,90 , 110,100 , 150,195],
  color: '#333',
  cursorPosition: { x: 0, y: 0 },
  selected: false,
  showPoints: false,
  snap: true,
  snapStep: 20,
  scale: 1,
  lineWidth: 4,
  label: '',
  onChange: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onClick: () => {},
  pointSize: 12,
  pointsColor1: "#0f0",
  pointsColor2: "#f00",
  snapStep: 30,
  stickyDistance: 20,
  stickyPoints: {}
};

export default
class BezierTransition extends PureComponent {
  constructor(props) {
    super(props);
    this.handleBezierChange = this.handleBezierChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.prevBezier = nextProps.bezier;
  }

  handleBezierChange(bezier) {
    this.props.onChange(bezier);
  }

  handleMouseDown(e) {
    this.props.onMouseDown(e);
  }

  handleMouseUp(e) {
    this.props.onMouseUp(e);
  }

  handleClick(e) {
    this.props.onClick(e);
  }

  render() {
    const {
      label,
      actions,
      arrowPosition,
      arrowSize,
      lineWidth,
      color,
      pointsColor1,
      pointsColor2,
      pointSize,
      snap,
      snapStep,
      bezier,
      selected,
      showPoints,
      scale,
      onChange,
      stickyPoints
    } = this.props;

    let markerPath = arrowPosition === 1 ?
      `M${arrowSize},0 L${arrowSize},${arrowSize / 2} L${0},${arrowSize / 4}` :
      `M0,0 L0,${arrowSize / 2} L${arrowSize},${arrowSize / 4}`;

    return (
      <g
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
      >
        <defs>
          <marker
            id="fsm--bezier-transition__arrow"
            markerWidth={arrowSize}
            markerHeight={arrowSize}
            refX={arrowPosition === 1 ? arrowSize / 6 : arrowSize - arrowSize / 6}
            refY={arrowSize / 4}
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d={markerPath} fill={color} />
          </marker>
        </defs>
        <BezierCurve
          bezier={bezier}
          snap={snap}
          snapStep={snapStep}
          onChange={this.handleBezierChange}
          label={label}
          scale={scale}
          markerStart={arrowPosition === 1 ? 'url(#fsm--bezier-transition__arrow)' : 'none'}
          markerEnd={arrowPosition === 2 ? 'url(#fsm--bezier-transition__arrow)' : 'none'}
          pointSize={pointSize}
          stroke={color}
          strokeWidth={lineWidth}
          showControls={selected}
        />
      </g>
    );
  }
}

BezierTransition.propTypes = propTypes;
BezierTransition.defaultProps = defaultProps;
