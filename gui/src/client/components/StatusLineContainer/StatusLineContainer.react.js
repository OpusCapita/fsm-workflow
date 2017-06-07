import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StatusLine from '../StatusLine';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';

const propTypes = {
  cursorPosition: PropTypes.object,
  viewportRect: PropTypes.object,
  viewportScale: PropTypes.number,
  viewportSize: PropTypes.number,
  viewportPanOffset: PropTypes.object,
  showGrid: PropTypes.bool
};

@connect(
  state => ({
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportSize: state.viewport.viewportSize,
    viewportPanOffset: state.viewport.viewportPanOffset,
    showGrid: state.viewport.showGrid
  }),
  dispatch => ({ actions: bindActionCreators(viewportActions, dispatch) })
)
export default class StatusLineContainer extends Component {
  constructor(props) {
    super(props);
    this.handleZoomClick = this.handleZoomClick.bind(this);
    this.handleGridButtonClick = this.handleGridButtonClick.bind(this);
  }

  handleZoomClick(e) {
    this.props.actions.updateViewportScale(1);
  }

  handleGridButtonClick(e) {
    this.props.actions.updateViewportShowGrid(!this.props.showGrid);
  }

  render() {
    const {
      cursorPosition,
      viewportRect,
      viewportScale,
      viewportPanOffset,
      viewportSize,
      showGrid
    } = this.props;

    const isOutOfViewport = (
      cursorPosition.x < 0 ||
      cursorPosition.y < 0 ||
      cursorPosition.x > viewportSize ||
      cursorPosition.y > viewportSize
    );

    return (
      <StatusLine
      mousePositionX={isOutOfViewport ? null : Math.floor(cursorPosition.x / 10) + 1}
      mousePositionY={isOutOfViewport ? null : Math.floor(cursorPosition.y / 10) + 1}
        viewportScale={viewportScale}
        showGrid={showGrid}
        onZoomClick={this.handleZoomClick}
        onGridButtonClick={this.handleGridButtonClick}
      />
    );
  }
}

StatusLineContainer.propTypes = propTypes;
