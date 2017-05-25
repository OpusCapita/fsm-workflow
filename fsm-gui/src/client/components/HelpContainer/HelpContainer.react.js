import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Help from '../Help';
import Modal from '../Modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as layoutActions from '../App/redux/reducer/layout';
import './HelpContainer.less';

@connect(
  state => ({
    showHelp: state.layout.showHelp
  }),
  dispatch => ({ actions: bindActionCreators(layoutActions, dispatch) })
)
export default
class HelpContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.props.actions.updateLayoutProperty('showHelp', false);
  }

  render() {
    const {
      showHelp
    } = this.props;

    return (
      <div className="fsm--help-container">
        <Modal
          isShow={showHelp}
          onHide={this.handleHide}
          title="Help information"
        >
          <Help onHide={this.handleHide} />
        </Modal>
      </div>
    );
  }
}
