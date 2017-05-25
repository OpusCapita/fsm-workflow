import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'opuscapita-react-ui-buttons/lib/Button';
import SimpleModal from 'opuscapita-react-ui-overlays/lib/SimpleModal';
import './Modal.less';

const propTypes = {
  isShow: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.string
};

const defaultProps = {
  isShow: false,
  onHide: true,
  title: PropTypes.string
};

export default
class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleHideClick = this.handleHideClick.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.body.addEventListener('keydown', this.handleEsc);
  }

  handleEsc(e) {
    if(e.which === 27) { // ESC keycode
      this.handleHideClick();
    }
  }

  handleHideClick() {
    this.props.onHide();
  }

  render() {
    const {
      isShow,
      onHide,
      title,
      children
    } = this.props;
    return (
      <SimpleModal
        isShow={isShow}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="fsm--modal">
          <div className="fsm--modal__header">
            <h4>{title}</h4>
            <Button
              className="fsm--modal__header-close-button"
              label="✕"
              color="#aaa"
              onClick={this.handleHideClick}
            />
          </div>
          <div className="fsm--modal__content">
            {children}
          </div>
        </div>
      </SimpleModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
