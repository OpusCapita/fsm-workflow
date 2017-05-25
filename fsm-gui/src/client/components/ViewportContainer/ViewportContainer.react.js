import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewport from '../Viewport';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';
import * as selectedItemActions from '../App/redux/reducer/selected-item';
import * as stateNodesActions from '../App/redux/reducer/state-nodes';
import * as transitionsActions from '../App/redux/reducer/transitions';
import * as newTransitionActions from '../App/redux/reducer/new-transition';
import * as layoutActions from '../App/redux/reducer/layout';
import { ITEM_TYPES } from '../App/redux/reducer/selected-item';
import { straightensBezier } from '../../svg-utils';

import BezierTransition from '../BezierTransition';
import StateNode from '../StateNode';

const scaleFactor = 0.06;
const minScale = 0.1;
const maxScale = 5;
const gridSize = 10;

const propTypes = {
  cursorPosition: PropTypes.object,
  viewportRect: PropTypes.object,
  viewportScale: PropTypes.number,
  viewportPanOffset: PropTypes.object,
  showGrid: PropTypes.bool,
  stateNodes: PropTypes.object,
  transitions: PropTypes.object,
  stickyPoints: PropTypes.object,
  selectedItemType: PropTypes.string,
  selectedItemId: PropTypes.string,
  snapDistance: PropTypes.number,
  hoveredStateNode: PropTypes.string,
  transitionCreationStarted: PropTypes.bool,
  lastCreatedTransition: PropTypes.string,
  viewportFocused: PropTypes.bool
};

const defaultProps = {
};

@connect(
  state => ({
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset,
    showGrid: state.viewport.showGrid,
    stateNodes: state.stateNodes,
    transitions: state.transitions,
    stickyPoints: state.viewport.stickyPoints,
    snapDistance: state.viewport.snapDistance,
    selectedItemType: state.selectedItem.itemType,
    selectedItemId: state.selectedItem.itemId,
    transitionCreationStarted: state.newTransition.creationStarted,
    lastCreatedTransition: state.newTransition.lastCreated,
    hoveredStateNode: state.selectedItem.hoveredStateNode,
    viewportFocused: state.layout.viewportFocused
  }),
  dispatch => ({ actions: bindActionCreators({
    ...viewportActions,
    ...selectedItemActions,
    ...stateNodesActions,
    ...transitionsActions,
    ...newTransitionActions,
    ...layoutActions
  }, dispatch) })
)
export default class ViewportContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panning: false
    };

    // To view crossair on transition creation
    const cursorCss = '* { cursor: crosshair !important; }';
    this.cursorStyleElement = document.createElement('style');
    this.cursorStyleElement.type = 'text/css';
    if (this.cursorStyleElement.styleSheet) {
      this.cursorStyleElement.styleSheet.cssText = cursorCss;
    } else {
      this.cursorStyleElement.appendChild(document.createTextNode(cursorCss));
    }


    this.handleDeleteKey = this.handleDeleteKey.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handlePan = this.handlePan.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleStateNodeClick = this.handleStateNodeClick.bind(this);
    this.handleStateNodeMouseDown = this.handleStateNodeMouseDown.bind(this);
    this.handleStateNodeMouseEneter = this.handleStateNodeMouseEnter.bind(this);
    this.handleStateNodeMouseLeave = this.handleStateNodeMouseLeave.bind(this);
    this.handleStateNodeDrag = this.handleStateNodeDrag.bind(this);
    this.handleTransitionChange = this.handleTransitionChange.bind(this);
    this.handleTransitionMouseDown = this.handleTransitionMouseDown.bind(this);
    this.handleTransitionClick = this.handleTransitionClick.bind(this);
    this.handleStateNodePointMouseDown = this.handleStateNodePointMouseDown.bind(this);
    this.handleStateNodePointMouseUp = this.handleStateNodePointMouseUp.bind(this);
    this.handleTransitionCreationMouseMove = this.handleTransitionCreationMouseMove.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* Perf optimization. Avoid frequent rerenders
     If you remove it you loose about 10 frames per second */
    const cursorPositionChanged = this.props.cursorPosition && (
      this.props.cursorPosition.x !== nextProps.cursorPosition.x ||
        this.props.cursorPosition.y !== nextProps.cursorPosition.y
    );

    if(this.props.viewportScale !== nextProps.viewportScale) {
      return true;
    }

    if(cursorPositionChanged) {
      return false;
    }

    return true;
  }

  handleWheel(e) {
    let scale = e.deltaY > 0 ?
      this.props.viewportScale - scaleFactor :
        this.props.viewportScale + scaleFactor;

    if(scale < minScale) {
      scale = minScale;
    }
    if(scale > maxScale) {
      scale = maxScale;
    }

    this.props.actions.updateViewportScale(scale);
  }

  handleMouseMove(e, mousePosition) {
    this.props.actions.updateCursorPosition(mousePosition);
  }

  handleMouseLeave(e, mousePosition) {
    this.props.actions.updateCursorPosition(mousePosition);
  }

  handlePan(e, draggableData) {
    if(this.state.panning) {
      let x = this.props.viewportPanOffset.x + draggableData.deltaX / this.props.viewportScale;
      let y = this.props.viewportPanOffset.y + draggableData.deltaY / this.props.viewportScale;
      this.props.actions.updateViewportPanOffset({ x, y });
    }
  }

  handleStateNodeMouseDown(e, key) {
    e.stopPropagation();
    this.props.actions.updateSelectedItem(ITEM_TYPES.STATE, key);
  }

  handleStateNodeClick(e, key) {
    this.props.actions.updateSelectedItem(ITEM_TYPES.STATE, key);
  }

  handleStateNodeMouseEnter(e, key) {
    this.props.actions.updateHoveredStateNode(key);
  }

  handleStateNodeMouseLeave(e, key) {
    this.props.actions.updateHoveredStateNode(null);
  }

  handleStateNodePointMouseDown(e, stateNodeKey, pointIndex, pointPosition) {
    this.props.actions.startCreateNewTransition(
      this.props.cursorPosition.x,
      this.props.cursorPosition.y,
      stateNodeKey,
      pointIndex
    );

    document.head.appendChild(this.cursorStyleElement);

    document.body.addEventListener('mouseup', this.handleStateNodePointMouseUp);
    document.body.addEventListener('mousemove', this.handleTransitionCreationMouseMove);
  }

  handleStateNodePointMouseUp(e, stateNodeKey, pointIndex, pointPosition) {
    const transitionCreationFinished = (
      this.props.transitionCreationStarted &&
        typeof stateNodeKey !== 'undefined' &&
        typeof pointIndex !== 'undefined'
    );
    if (transitionCreationFinished) {
      this.props.actions.finishCreateNewTransition(this.props.lastCreatedTransition, stateNodeKey, pointIndex);
    }

    // document.head.removeChild(this.cursorStyleElement);

    document.body.removeEventListener('mouseup', this.handleStateNodePointMouseUp);
    document.body.removeEventListener('mousemove', this.handleTransitionCreationMouseMove);
  }

  handleStateNodePointRef(ref, stateNodeKey, pointIndex, pointPosition) {
    if(!ref) {
      this.props.actions.unregisterStickyPoint(`${stateNodeKey}_${pointIndex}`);
      return;
    }
    const pointKey = `${ITEM_TYPES.STATE}.${stateNodeKey}.${pointIndex}`;
    this.props.actions.registerStickyPoint(pointKey, pointPosition);
  }

  handleTransitionCreationMouseMove(e) {
    const { lastCreatedTransition, transitions, cursorPosition } = this.props;
    const newTransition = lastCreatedTransition && transitions[lastCreatedTransition];

    if(!newTransition) {
      return false;
    }

    const deltaX = (this.lastCursorPosition && this.lastCursorPosition.x || 0) - cursorPosition.x;
    const deltaY = (this.lastCursorPosition && this.lastCursorPosition.y || 0) - cursorPosition.y;
    const points = newTransition.points
      .slice(0, 6)
      .concat([
        this.props.cursorPosition.x + deltaX,
        this.props.cursorPosition.y + deltaY
      ]);

    this.lastCursorPosition = { ...this.props.cursorPosition };
    const straightensBezierPoints = straightensBezier(points);
    this.props.actions.updateTransition(lastCreatedTransition, { points: straightensBezierPoints });
  }

  handleMouseDown(e) {
    this.mouseDownX = e.clientX;
    this.mouseDownY = e.clientY;

    this.setState({ panning: true });
  }

  handleStateNodeDrag(e, data, stateNodeKey) {
    const stateNode = this.props.stateNodes[stateNodeKey];
    const points = [
      stateNode.points[0] + data.deltaX / this.props.viewportScale,
      stateNode.points[1] + data.deltaY / this.props.viewportScale
    ];
    const updatedStateNode = Object.assign({}, stateNode, { points });
    this.props.actions.updateStateNode(stateNodeKey, updatedStateNode);
  }

  handleTransitionChange(transitionKey, points, d) {
    const transition = this.props.transitions[transitionKey];
    const updatedTransition = Object.assign({}, transition, { points });
    this.props.actions.updateTransition(transitionKey, updatedTransition);
  }

  handleTransitionMouseDown(e, key) {
    e.stopPropagation();
    this.props.actions.updateSelectedItem(ITEM_TYPES.TRANSITION, key);
  }

  handleTransitionClick(e, key) {
    e.stopPropagation();
    this.props.actions.updateSelectedItem(ITEM_TYPES.TRANSITION, key);
  }

  handleMouseUp(e) {
    const cursorHasMoved = Math.abs(this.mouseDownX - e.clientX) > 0 || Math.abs(this.mouseDownY - e.clientY) > 0;

    if(!cursorHasMoved) {
      this.props.actions.updateSelectedItem(ITEM_TYPES.VIEWPORT);
    }

    this.setState({ panning: false });
  }

  handleClick(e) {
    this.props.actions.updateLayoutProperty('viewportFocused', true);
  }

  handleClickOutside(e) {
    this.props.actions.updateLayoutProperty('viewportFocused', false);
  }

  handleTabKey(e) {
    if(this.props.viewportFocused) {
      e.preventDefault();
    }
  }

  handleDeleteKey(e) {
    if(this.props.selectedItemType === ITEM_TYPES.VIEWPORT) {
      return false;
    }

    if(this.props.selectedItemType === ITEM_TYPES.STATE) {
      this.props.actions.deleteStateNode(this.props.selectedItemId);
      this.props.actions.updateSelectedItem(ITEM_TYPES.VIEWPORT);
    }

    if(this.props.selectedItemType === ITEM_TYPES.TRANSITION) {
      this.props.actions.deleteTransition(this.props.selectedItemId);
      this.props.actions.updateSelectedItem(ITEM_TYPES.VIEWPORT);
    }
  }

  handleKeyDown(e) {
    switch(e.which) {
      case 8: this.handleDeleteKey(e); // Backspace key
      case 9: this.handleTabKey(e); // TAB key
      case 46: this.handleDeleteKey(e); // Del key
      default: return false;
    }
  }

  render() {
    const {
      viewportScale,
      viewportPanOffset,
      showGrid,
      stateNodes,
      transitions,
      stickyPoints,
      snapDistance,
      hoveredStateNode,
      selectedItemType,
      selectedItemId,
      transitionCreationStarted,
      viewportFocused
    } = this.props;

    const stateNodesElements = Object.keys(stateNodes).map(stateNodeKey => {
      const stateNode = stateNodes[stateNodeKey];
      const selected = selectedItemType === ITEM_TYPES.STATE && selectedItemId === stateNodeKey;
      const showPoints = hoveredStateNode === stateNodeKey || selected || transitionCreationStarted;
      let selectedPoints = [];

      if(
        selectedItemType === ITEM_TYPES.TRANSITION &&
        transitions[selectedItemId] &&
        transitions[selectedItemId].from === stateNodeKey
      ) {

        selectedPoints = [transitions[selectedItemId].fromPoint];
      }

      if(
        selectedItemType === ITEM_TYPES.TRANSITION &&
        transitions[selectedItemId] &&
        transitions[selectedItemId].to === stateNodeKey
      ) {
        selectedPoints = [transitions[selectedItemId].toPoint];
      }

      return (
        <StateNode
          key={stateNodeKey}
          label={stateNode.name}
          x={stateNode.points[0]}
          y={stateNode.points[1]}
          bgColor={stateNode.bgColor}
          textColor={stateNode.textColor}
          finalState={false}
          selected={selected}
          selectedPoints={selectedPoints}
          showPoints={showPoints}
          onMouseEnter={(e) => this.handleStateNodeMouseEnter(e, stateNodeKey)}
          onMouseLeave={(e) => this.handleStateNodeMouseLeave(e, stateNodeKey)}
          onMouseDown={(e) => this.handleStateNodeMouseDown(e, stateNodeKey)}
          onPointMouseDown={
            (e, index, pointPosition) => this.handleStateNodePointMouseDown(e, stateNodeKey, index, pointPosition)
          }
          onPointMouseUp={
            (e, index, pointPosition) => this.handleStateNodePointMouseUp(e, stateNodeKey, index, pointPosition)
          }
          onPointRef={
            (ref, index, pointPosition) => this.handleStateNodePointRef(ref, stateNodeKey, index, pointPosition)
          }
          onClick={(e) => this.handleStateNodeClick(e, stateNodeKey)}
          onDoubleClick={() => {}}
          onDragStart={(e, data) => {}}
          onDragStop={(e, data) => {}}
          onDrag={(e, data) => this.handleStateNodeDrag(e, data, stateNodeKey)}
          snap={false}
          snapDistance={snapDistance}
        />
      );
    });

    const transitionsElements = Object.keys(transitions).map(transitionKey => {
      const transition = transitions[transitionKey];
      const selected = selectedItemType === ITEM_TYPES.TRANSITION && selectedItemId === transitionKey;
      return (
        <BezierTransition
          key={transitionKey}
          label={transition.name}
          bezier={transition.points}
          lineWidth={4}
          color="#0277bd"
          pointSize={12}
          scale={viewportScale}
          onChange={(bezierPoints, d) => this.handleTransitionChange(transitionKey, bezierPoints, d)}
          onClick={(e) => this.handleTransitionClick(e, transitionKey)}
          onMouseDown={(e) => this.handleTransitionMouseDown(e, transitionKey)}
          arrowPosition={2}
          arrowSize={30}
          selected={selected}
          snap={false}
          stickyPoints={stickyPoints}
        />
      );
    });

    return (
      <Viewport
        scale={viewportScale}
        gridSize={gridSize}
        showGrid={showGrid}
        snap={false}
        onWheel={this.handleWheel}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onPan={this.handlePan}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
        onClickOutside={this.handleClickOutside}
        onKeyDown={this.handleKeyDown}
        panOffsetX={viewportPanOffset.x}
        panOffsetY={viewportPanOffset.y}
        focused={viewportFocused}
      >
        {transitionsElements}
        {stateNodesElements}
      </Viewport>
    );
  }
}

ViewportContainer.propTypes = propTypes;
ViewportContainer.defaultProps = defaultProps;
