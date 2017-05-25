import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StatusLine.less';
import Button from 'opuscapita-react-ui-buttons/lib/Button';

import gridOnSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/border_inner.svg';
import gridOffSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/border_clear.svg';

const propTypes = {
  mousePositionX: PropTypes.number,
  mousePositionY: PropTypes.number,
  viewportScale: PropTypes.number,
  onZoomClick: PropTypes.func,
  showGrid: PropTypes.bool,
  onGridButtonClick: PropTypes.func
};

const defaultProps = {
  onZoomClick: () => {},
  onGridButtonClick: () => {}
};

const maxValueLength = 6;

export default
class StatusLine extends Component {
  constructor(props) {
    super(props);
    this.handleGridButtonClick = this.handleGridButtonClick.bind(this);
    this.handleZoomClick = this.handleZoomClick.bind(this);
  }

  handleZoomClick(e) {
    this.props.onZoomClick(e);
  }

  handleGridButtonClick(e) {
    this.props.onGridButtonClick(e);
  }

  render() {
    const {
      mousePositionX,
      mousePositionY,
      viewportScale,
      showGrid
    } = this.props;

    return (
      <div className="fsm--status-line">
        <div
          className="fsm--status-line__scale fsm--status-line__action"
          title="Reset"
          onClick={this.handleZoomClick}
        >
          <div className="fsm--status-line__label">
            Zoom:
          </div>
          <div className="fsm--status-line__value fsm--status-line__value--zoom">
            {Math.floor(viewportScale * 100)}%
          </div>
        </div>

        <div className="fsm--status-line__controls-right">
          <Button
            svg={showGrid ? gridOffSVG : gridOnSVG}
            title={showGrid ? 'Hide grid' : 'Show grid'}
            color="#333"
            onClick={this.handleGridButtonClick}
          />
        </div>

        <div className="fsm--status-line__mouse-position">
          <div className="fsm--status-line__label">
            X:
          </div>
          <div className="fsm--status-line__value">
            {typeof mousePositionX === 'number' ? mousePositionX.toString().slice(0, maxValueLength) : '―'}
          </div>
          <div className="fsm--status-line__label">
            Y:
          </div>
          <div className="fsm--status-line__value">
            {typeof mousePositionY === 'number' ? mousePositionY.toString().slice(0, maxValueLength) : '―'}
          </div>
        </div>
      </div>
    );
  }
}

StatusLine.propTypes = propTypes;
