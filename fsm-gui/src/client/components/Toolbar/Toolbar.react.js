import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Toolbar.less';
import TitledButton from 'opuscapita-react-ui-buttons/lib/TitledButton';

const propTypes = {
  controlsLeft: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func,
    iconSVG: PropTypes.string,
    title: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    bgColor: PropTypes.string
  })),
  controlsRight: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func,
    iconSVG: PropTypes.string,
    title: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool
  })),
  restrictorNode: PropTypes.object
};

const defaultProps = {
  restrictorNode: null
};

export default
class Toolbar extends Component {
  renderControls(controls) {
    return controls.map((control, i) => control === null ? (<div key={i} className="fsm--toolbar__divider"></div>) :       (
        <TitledButton
          key={i}
          svg={control.iconSVG}
          title={control.title}
          disabled={control.disabled}
          color={control.color || '#333'}
          bgColor={control.bgColor || null}
          label={control.label}
          contentPosition="before"
          isActive={control.active}
          onClick={control.action}
          className="fsm--toolbar__button"
          restrictorNode={this.props.restrictorNode}
        />
      ));
  }
  render() {
    const {
      controlsLeft,
      controlsRight
    } = this.props;

    return (
      <div className="fsm--toolbar">
        <div className="fsm--toolbar__controls-left">
          {this.renderControls(controlsLeft)}
        </div>
        <div className="fsm--toolbar__controls-right">
          {this.renderControls(controlsRight)}
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;
