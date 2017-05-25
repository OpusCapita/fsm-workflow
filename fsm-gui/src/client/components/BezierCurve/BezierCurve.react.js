import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import Bezier from 'bezier-js';
import './BezierCurve.less';
import isEqual from 'lodash/isEqual';

const paddingV = 10;
const paddingH = 30;

const propTypes = {
  bezier: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  onPoint1Drag: PropTypes.func,
  onPoint2Drag: PropTypes.func,
  onPoint3Drag: PropTypes.func,
  onPoint4Drag: PropTypes.func,
  label: PropTypes.string,
  scale: PropTypes.number,
  pointColor1: PropTypes.string,
  pointColor2: PropTypes.string,
  pointSize: PropTypes.number,
  snap: PropTypes.bool,
  snapStep: PropTypes.number,
  showControls: PropTypes.bool
};
const defaultProps = {
  bezier: [0,0 , 0,0 , 0,0 , 0,0],
  onChange: () => {},
  label: '',
  onPoint1Drag: () => {},
  onPoint2Drag: () => {},
  onPoint3Drag: () => {},
  onPoint4Drag: () => {},
  pointColor1: '#76FF03',
  pointColor2: '#FF1744',
  pointSize: 16,
  showControls: true,
  stroke: '#0091EA',
  scale: 1,
  snap: true,
  snapStep: 20,
  strokeWidth: 1
};

export default
class BezierCurve extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labelElement: null
    };
    this.handlePoint1Drag = this.handlePoint1Drag.bind(this);
    this.handlePoint2Drag = this.handlePoint2Drag.bind(this);
    this.handlePoint3Drag = this.handlePoint3Drag.bind(this);
    this.handlePoint4Drag = this.handlePoint4Drag.bind(this);
    this.handleLabelDrag = this.handleLabelDrag.bind(this);
    this.handleLabelElementRef = this.handleLabelElementRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.props.bezier, nextProps.bezier) ||
      this.props.label !== nextProps.label ||
      this.props.scale !== nextProps.scale ||
      this.props.pointColor1 !== nextProps.pointColor1 ||
      this.props.pointColor2 !== nextProps.pointColor2 ||
      this.props.pointSize !== nextProps.pointSize ||
      this.props.snap !== nextProps.snap ||
      this.props.snapStep !== nextProps.snapStep ||
      this.props.showControls !== nextProps.showControls ||
      this.state.labelElement !== nextState.labelElement
    );
  }

  handleChange(bezier, d) {
    this.props.onChange(bezier, this.pathElement);
  }

  handlePoint1Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[0] = bezier[0] + data.deltaX / this.props.scale;
    bezier[1] = bezier[1] + data.deltaY / this.props.scale;

    bezier[2] = bezier[2] + data.deltaX / this.props.scale;
    bezier[3] = bezier[3] + data.deltaY / this.props.scale;
    this.handleChange(bezier);
  }

  handlePoint2Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[2] = bezier[2] + data.deltaX / this.props.scale;
    bezier[3] = bezier[3] + data.deltaY / this.props.scale;
    this.handleChange(bezier);
  }

  handlePoint3Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[4] = bezier[4] + data.deltaX / this.props.scale;
    bezier[5] = bezier[5] + data.deltaY / this.props.scale;
    this.handleChange(bezier);
  }

  handlePoint4Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[6] = bezier[6] + data.deltaX / this.props.scale;
    bezier[7] = bezier[7] + data.deltaY / this.props.scale;

    bezier[4] = bezier[4] + data.deltaX / this.props.scale;
    bezier[5] = bezier[5] + data.deltaY / this.props.scale;
    this.handleChange(bezier);
  }

  handleLabelDrag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[2] = bezier[2] + data.deltaX / this.props.scale;
    bezier[3] = bezier[3] + data.deltaY / this.props.scale;
    bezier[4] = bezier[4] + data.deltaX / this.props.scale;
    bezier[5] = bezier[5] + data.deltaY / this.props.scale;
    this.handleChange(bezier);
  }

  handleLabelElementRef(ref) {
    this.setState({ labelElement: ref });
  }

  render() {
    const {
      bezier,
      pointColor1,
      pointColor2,
      pointSize,
      label,
      showControls,
      snap,
      snapStep,
      onChange,
      onPoint1Drag,
      onPoint2Drag,
      onPoint3Drag,
      onPoint4Drag,
      ...restProps
    } = this.props;

    let curve = new Bezier(...bezier);
    let d = curve.toSVG();
    let labelPosition = curve.get(0.5);

    const labelElementBBox = this.state.labelElement && this.state.labelElement.getBBox();
    const labelWidth = labelElementBBox && labelElementBBox.width;
    const labelHeight = labelElementBBox && labelElementBBox.height;
    const labelX = labelPosition.x - labelWidth / 2 - paddingH / 2;
    const labelY = labelPosition.y - labelHeight / 2 - paddingV / 2;

    const rectWidth = labelWidth + paddingH;
    const rectHeight = labelHeight + paddingV;
    const rectX = labelPosition.x - labelWidth / 2 - paddingH / 2;
    const rectY = labelPosition.y - labelHeight / 2 - paddingV / 2;

    let controls1 = showControls ? (
      <g>
        <line
          className="bezier-curve__control-line"
          x1={bezier[0]}
          y1={bezier[1]}
          x2={bezier[2]}
          y2={bezier[3]}
        />
        <DraggableCore
          onDrag={this.handlePoint1Drag}
          grid={snap ? [snapStep, snapStep] : null}
        >
          <rect
            className="bezier-curve__control-point"
            x={bezier[0] - pointSize / 2 }
            y={bezier[1] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointColor1}
            stroke={pointColor1}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore
          onDrag={this.handlePoint2Drag}
          grid={snap ? [snapStep, snapStep] : null}
        >
          <rect
            className="bezier-curve__control-point"
            x={bezier[2] - pointSize / 2 }
            y={bezier[3] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointColor2}
            stroke={pointColor2}
            strokeWidth={1}
          />
        </DraggableCore>
      </g>
    ) : null;

    let controls2 = showControls ? (
      <g>
        <line
          className="bezier-curve__control-line"
          x1={bezier[4]}
          y1={bezier[5]}
          x2={bezier[6]}
          y2={bezier[7]}
        />
        <DraggableCore
          onDrag={this.handlePoint4Drag}
          grid={snap ? [snapStep, snapStep] : null}
        >
          <rect
            className="bezier-curve__control-point"
            x={bezier[6] - pointSize / 2 }
            y={bezier[7] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointColor1}
            stroke={pointColor1}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore
          onDrag={this.handlePoint3Drag}
          grid={snap ? [snapStep, snapStep] : null}
        >
          <rect
            className="bezier-curve__control-point"
            x={bezier[4] - pointSize / 2 }
            y={bezier[5] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointColor2}
            stroke={pointColor2}
            strokeWidth={1}
          />
        </DraggableCore>
      </g>
    ) : null;

    return (
      <g>
        <path
          d={d}
          fill="none"
          ref={ref => (this.pathElement = ref)}
          {...restProps}
        />
        <DraggableCore
          onDrag={this.handleLabelDrag}
          grid={snap ? [snapStep, snapStep] : null}
        >
          <g>
            <rect
              x={rectX}
              y={rectY}
              rx="2"
              ry="2"
              width={rectWidth}
              height={rectHeight}
              fill="#fff"
              stroke="#333"
              className="bezier-curve__label-box"
            />
            <text
              ref={this.handleLabelElementRef}
              x={labelPosition.x}
              y={labelPosition.y}
              fontSize="12"
              alignmentBaseline="middle"
              dominantBaseline="middle"
              textAnchor="middle"
              textAnchor="middle"
              className="bezier-curve__label-text"
            >
              {label}
            </text>
          </g>
        </DraggableCore>
        {controls1}
        {controls2}
      </g>
    );
  }
}

BezierCurve.propTypes = propTypes;
BezierCurve.defaultProps = defaultProps;
