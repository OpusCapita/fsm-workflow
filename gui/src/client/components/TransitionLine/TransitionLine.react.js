import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import './TransitionLine.less';

const propTypes = {
  arrowPosition: PropTypes.number,
  arrowSize: PropTypes.number,
  color: PropTypes.string,
  isSelected: PropTypes.bool,
  snap: PropTypes.bool,
  snapStep: PropTypes.number,
  showPoints: PropTypes.bool,
  label: PropTypes.string,
  lineWidth: PropTypes.number,
  coords: PropTypes.array,
  pointFromColor: PropTypes.string,
  pointSize: PropTypes.number,
  pointToColor: PropTypes.string,
  snapStep: PropTypes.number,
  turnLength: PropTypes.number
};
const defaultProps = {
  arrowPosition: 0,
  arrowSize: 20,
  color: '#000',
  isSelected: false,
  snap: true,
  snapStep: 20,
  showPoints: true,
  label: 'Transition Label',
  lineWidth: 1,
  coords: [40, 20, 60, 20, 60, 220, 80, 220],
  pointFromColor: "#0f0",
  pointSize: 8,
  pointToColor: "#f00",
  snapStep: 10,
  turnLength: 10
};

const debugRects = (
  <g>
    <rect
      x="600" y="600" width="100" height="50" stroke="#0f0" fill="transparent"
    />
    <rect
      x="300" y="300" width="100" height="50" stroke="#f00" fill="transparent"
    />
  </g>
);


export default
class TransitionLine extends PureComponent {
  constructor(props) {
    super(props);
    this.handlePoint1Drag = this.handlePoint1Drag.bind(this);
    this.handlePoint2Drag = this.handlePoint2Drag.bind(this);
    this.handlePoint3Drag = this.handlePoint3Drag.bind(this);
    this.handlePoint4Drag = this.handlePoint4Drag.bind(this);
  }

  handleStart(e, data) {
    console.log('start');
  }

  handleStop(e, data) {
    console.log('stop');
  }

  handleDrag(e, data) {
    console.log('drag');
  }

  handlePoint1Drag(e, data) {
    let coords = [...this.props.coords];
    let x = coords[0] + data.deltaX;
    let y = coords[1] + data.deltaY;
    coords[0] = x;
    coords[1] = y;

    coords[3] = y;

    this.props.onCoordsChange(coords);
  }

  handlePoint2Drag(e, data) {
    let coords = [...this.props.coords];
    coords[2] = coords[2] + data.deltaX;
    coords[3] = coords[3] + data.deltaY;
    this.props.onCoordsChange(coords);
  }

  handlePoint3Drag(e, data) {
    let coords = [...this.props.coords];
    coords[4] = coords[4] + data.deltaX;
    coords[5] = coords[5] + data.deltaY;
    this.props.onCoordsChange(coords);
  }

  handlePoint4Drag(e, data) {
    let coords = [...this.props.coords];
    coords[6] = coords[6] + data.deltaX;
    coords[7] = coords[7] + data.deltaY;
    this.props.onCoordsChange(coords);
  }

  render() {
    const {
      arrowPosition,
      arrowSize,
      color,
      isSelected,
      snap,
      label,
      lineWidth,
      coords,
      pointFromColor,
      pointSize,
      pointToColor,
      snapStep,
      turnLength
    } = this.props;

    let d = `M ${coords[0]} ${coords[1]} L ${coords[2]} ${coords[3]} ${coords[4]} ${coords[5]} ${coords[6]} ${coords[7]}`;
    let inputTextPosition = { x: 20, y: 30 };

    let markerPath = arrowPosition === 1 ?
      `M${arrowSize},0 L${arrowSize},${arrowSize / 2} L${0},${arrowSize / 4}` :
      `M0,0 L0,${arrowSize / 2} L${arrowSize},${arrowSize / 4}`;


    let points = (
      <g>
        <DraggableCore
          grid={snap ? [snapStep, snapStep] : null}
          onDrag={this.handlePoint1Drag}
        >
          <rect
            className="fsm--transition-line__point"
            x={coords[0] - pointSize / 2 }
            y={coords[1] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointFromColor}
            stroke={pointFromColor}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore
          grid={snap ? [snapStep, snapStep] : null}
          onDrag={this.handlePoint2Drag}
        >
          <rect
            className="fsm--transition-line__point"
            x={coords[2] - pointSize / 2 }
            y={coords[3] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointFromColor}
            stroke={pointFromColor}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore
          grid={snap ? [snapStep, snapStep] : null}
          onDrag={this.handlePoint3Drag}
        >
          <rect
            className="fsm--transition-line__point"
            x={coords[4] - pointSize / 2 }
            y={coords[5] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointFromColor}
            stroke={pointFromColor}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore
          grid={snap ? [snapStep, snapStep] : null}
          onDrag={this.handlePoint4Drag}
        >
          <rect
            className="fsm--transition-line__point"
            x={coords[6] - pointSize / 2 }
            y={coords[7] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointFromColor}
            stroke={pointFromColor}
            strokeWidth={1}
          />
        </DraggableCore>
      </g>
    );
    return (
        <g>
          <defs>
            <marker
              id="fsm--transition-line__arrow"
              markerWidth={arrowSize}
              markerHeight={arrowSize}
              refX={arrowPosition === 1 ? arrowSize / 2 : arrowSize}
              refY={arrowSize / 4}
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d={markerPath} fill={color} />
            </marker>
          </defs>
          <path
            d={d}
            fill="none"
            stroke={color}
            markerStart={arrowPosition === 1 ? 'url(#fsm--transition-line__arrow)' : 'none'}
            markerEnd={arrowPosition === 2 ? 'url(#fsm--transition-line__arrow)' : 'none'}
            strokeWidth={lineWidth}
          />
          <text
            x={inputTextPosition.x}
            y={inputTextPosition.y}
            fontSize="16"
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {label}
          </text>
          {points}
          {debugRects}
        </g>
    );
  }
}

TransitionLine.propTypes = propTypes;
TransitionLine.defaultProps = defaultProps;
