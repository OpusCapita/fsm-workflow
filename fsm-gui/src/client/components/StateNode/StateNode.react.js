import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import { getCirclePath, pathToPoints, pointsToPath } from '../../svg-utils';
import tinycolor from 'tinycolor2';
import isEqual from 'lodash/isEqual';
import './StateNode.less';

const paddingV = 20;
const paddingH = 60;
const pointOffset = 1;
const pointOffsetMultiper = 2;
const outlinePadding = 3;
const getContrastColor = (color, amount = 10) => tinycolor(color).getBrightness() > 70 ?
  tinycolor(color).darken(amount) :
      tinycolor(color).lighten(amount) ;

const getLabelColor = (bgColor) => tinycolor(bgColor).getBrightness() > 127 ? '#000' : '#fff';

const propTypes = {
  label: PropTypes.string,
  lineWidth: PropTypes.number,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  snapStep: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  selected: PropTypes.bool,
  selectedPoints: PropTypes.arrayOf(PropTypes.number),
  finalState: PropTypes.bool,
  snap: PropTypes.bool,
  showPoints: PropTypes.bool,
  snapDistance: PropTypes.number,
  onClick: PropTypes.func,
  onMousedDown: PropTypes.func,
  onMousedUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onPointMouseDown: PropTypes.func,
  onPointMouseUp: PropTypes.func,
  onPointMouseEnter: PropTypes.func,
  onPointMouseLeave: PropTypes.func,
  onPointRef: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  onDrag: PropTypes.func
};
const defaultProps = {
  label: '',
  lineWidth: 1,
  color: '#000',
  bgColor: '#0277bd',
  textColor: '#fff',
  snapStep: 20,
  x: 0,
  y: 0,
  selected: false,
  selectedPoints: [],
  finalState: false,
  snap: true,
  showPoints: false,
  snapDistance: 12,
  onClick: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onPointMouseDown: () => {},
  onPointMouseUp: () => {},
  onPointMouseEnter: () => {},
  onPointMouseLeave: () => {},
  onPointRef: () => {},
  onDoubleClick: () => {},
  onDragStart: () => {},
  onDragStop: () => {},
  onDrag: () => {}
};

export default
class StateNode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labelElement: null,
      selectedPoint: null
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleLabelElementRef = this.handleLabelElementRef.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handlePointMouseDown = this.handlePointMouseDown.bind(this);
    this.handlePointMouseUp = this.handlePointMouseUp.bind(this);
    this.handlePointMouseEnter = this.handlePointMouseEnter.bind(this);
    this.handlePointMouseLeave = this.handlePointMouseLeave.bind(this);
    this.handlePointRef = this.handlePointRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.label !== nextProps.label ||
      this.props.lineWidth !== nextProps.lineWidth ||
      this.props.color !== nextProps.color ||
      this.props.bgColor !== nextProps.bgColor ||
      this.props.textColor !== nextProps.textColor ||
      this.props.snapStep !== nextProps.snapStep ||
      this.props.x !== nextProps.x ||
      this.props.y !== nextProps.y ||
      this.props.selected !== nextProps.selected ||
      !isEqual(this.props.selectedPoints, nextProps.selectedPoints) ||
      this.props.finalState !== nextProps.finalState ||
      this.props.snap !== nextProps.snap ||
      this.props.showPoints !== nextProps.showPoints ||
      this.state.labelElement !== nextState.labelElement ||
      this.state.selectedPoint !== nextState.selectedPoint
    );
  }

  handleStart(e, data) {
    this.props.onDragStart(e, data);
  }

  handleStop(e, data) {
    this.props.onDragStop(e, data);
  }

  handleDrag(e, data) {
    this.props.onDrag(e, data);
  }

  handleLabelElementRef(ref) {
    this.setState({ labelElement: ref });
  }

  handleMouseDown(e) {
    this.props.onMouseDown(e);
  }

  handleMouseUp(e) {
    this.props.onMouseUp(e);
  }

  handleMouseEnter(e) {
    this.props.onMouseEnter(e);
  }

  handleMouseLeave(e) {
    this.props.onMouseLeave(e);
  }

  handlePointMouseEnter(e, index, pointPosition) {
    this.setState({ selectedPoint: index });
    this.props.onPointMouseEnter(e, index, pointPosition);
  }

  handlePointMouseLeave(e, index, pointPosition) {
    this.setState({ selectedPoint: null });
    this.props.onPointMouseLeave(e, index, pointPosition);
  }

  handlePointMouseDown(e, index, pointPosition) {
    this.setState({ selectedPoint: index });
    this.props.onMouseDown(e);
    this.props.onPointMouseDown(e, index, pointPosition);
  }

  handlePointMouseUp(e, index, pointPosition) {
    this.setState({ selectedPoint: null });
    this.props.onMouseDown(e);
    this.props.onPointMouseUp(e, index, pointPosition);
  }

  handlePointRef(ref, index, pointPosition) {
    this.props.onPointRef(ref, index, pointPosition);
  }

  renderPoints(x, y, width, height, xPointsCount = 3) {
    const xStep = width / (xPointsCount + 1);
    const edgePointsOffset = xStep / 4;
    const pointPositions = [
      // To remove corners on 'lines <-> points' joints: 'x,y' - are real; 'xG,yG' - where point renders visually.

      // Top points
      {
        x: x + xStep - edgePointsOffset, y: y + pointOffset * pointOffsetMultiper,
        xG: x + xStep - edgePointsOffset, yG: y - pointOffset
      },
      {
        x: x + xStep * 2, y: y + pointOffset * pointOffsetMultiper,
        xG: x + xStep * 2, yG: y - pointOffset
      },
      {
        x: x + xStep * 3 + edgePointsOffset, y: y + pointOffset * pointOffsetMultiper,
        xG: x + xStep * 3 + edgePointsOffset, yG: y - pointOffset
      },

      // Right points
      {
        x: x + width - pointOffset * pointOffsetMultiper, y: y + height / 2,
        xG: x + width + pointOffset, yG: y + height / 2
      },

      // Bottom point
      {
        x: x + xStep * 3 + edgePointsOffset, y: y + height - pointOffset * pointOffsetMultiper,
        xG: x + xStep * 3 + edgePointsOffset, yG: y + height + pointOffset
      },
      {
        x: x + xStep * 2, y: y + height - pointOffset * pointOffsetMultiper,
        xG: x + xStep * 2, yG: y + height + pointOffset
      },
      {
        x: x + xStep - edgePointsOffset, y: y + height - pointOffset * pointOffsetMultiper,
        xG: x + xStep - edgePointsOffset, yG: y + height + pointOffset
      },
      // Left points
      {
        x: x + pointOffset * pointOffsetMultiper, y: y + height / 2,
        xG: x - pointOffset, yG: y + height / 2
      }
    ];

    const contrastBg = getContrastColor(this.props.bgColor);
      return pointPositions.map((pointPosition, index) => {
        const selected = (
          this.state.selectedPoint === index ||
          this.props.selectedPoints.some(selectedPoint => selectedPoint === index)
        );

        return (
          <g
            key={index}
            onMouseDown={(e) => this.handlePointMouseDown(e, index, pointPosition)}
            onMouseUp={(e) => this.handlePointMouseUp(e, index, pointPosition)}
            onMouseEnter={(e) => this.handlePointMouseEnter(e, index, pointPosition)}
            onMouseLeave={(e) => this.handlePointMouseLeave(e, index, pointPosition)}
          >
            <circle
              className={`fsm--state-node__point-active-area`}
              cx={pointPosition.xG}
              cy={pointPosition.yG}
              r={this.props.snapDistance}
              fill={contrastBg}
              opacity={this.props.showPoints || selected ? 0.3 : 0}
            />
            <circle
              className={`fsm--state-node__point ${this.props.drag ? 'fsm--state-node__point--drag' : ''}`}
              ref={(ref) => this.handlePointRef(ref, index, pointPosition)}
              cx={pointPosition.xG}
              cy={pointPosition.yG}
              r={6}
              strokeWidth="2"
              stroke={contrastBg}
              fill={selected ? contrastBg : '#fff'}
              opacity={this.props.showPoints || selected ? 1 : 0}
              />
          </g>
        );
      });
  }

  render() {
    const {
      label,
      lineWidth,
      color,
      bgColor,
      snapStep,
      textColor,
      x,
      y,
      selected,
      selectedPoints,
      finalState,
      snap,
      showPoints,
      onClick,
      onMouseDown,
      onMouseUp,
      onDoubleClick,
      onDragStart,
      onDragStop,
      onDrag
    } = this.props;

    const labelElementBBox = this.state.labelElement && this.state.labelElement.getBBox();
    const labelWidth = labelElementBBox && labelElementBBox.width;
    const labelHeight = labelElementBBox && labelElementBBox.height;
    const labelX = x - labelWidth / 2 - paddingH / 2 - outlinePadding;
    const labelY = y - labelHeight / 2 - paddingV / 2 - outlinePadding;

    const rectWidth = labelWidth + paddingH;
    const rectHeight = labelHeight + paddingV;
    const rectX = x - labelWidth / 2 - paddingH / 2;
    const rectY = y - labelHeight / 2 - paddingV / 2;

    const outline = (
      <rect
        className="fsm--state-node__outline"
        x={labelX}
        y={labelY}
        rx="2"
        ry="2"
        width={labelWidth + paddingH + outlinePadding * 2}
        height={labelHeight + paddingV + outlinePadding * 2}
        fill={selected ? '#fff' : 'transparent'}
        strokeWidth={2}
        stroke={selected ? getContrastColor(this.props.bgColor) : 'transparent'}
      />
    );

    const points = this.renderPoints(rectX, rectY, rectWidth, rectHeight);

    return (
      <g
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <DraggableCore
          grid={snap ? [snapStep, snapStep] : null}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onDrag={this.handleDrag}
        >
          <g
            className="fsm--state-node"
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
          >
            {outline}
            <rect
              className="fsm--state-node__rect"
              x={rectX}
              y={rectY}
              rx="2"
              ry="2"
              width={rectWidth}
              height={rectHeight}
              fill={bgColor}
              strokeWidth={lineWidth}
            />
            <text
              ref={this.handleLabelElementRef}
              x={x}
              y={y}
              fontSize="16"
              alignmentBaseline="middle"
              dominantBaseline="middle"
              textAnchor="middle"
              fill={getLabelColor(bgColor)}
              className="fsm--state-node__label"
            >
              {label}
            </text>
          </g>
        </DraggableCore>
        {points}
      </g>
    );
  }
}

StateNode.propTypes = propTypes;
StateNode.defaultProps = defaultProps;
