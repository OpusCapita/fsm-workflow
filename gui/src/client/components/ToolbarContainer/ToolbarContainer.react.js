import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../Toolbar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';
import * as layoutActions from '../App/redux/reducer/layout';

import addSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/add.svg';
import backSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/arrow_back.svg';
import forwardSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/arrow_forward.svg';
import cutSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/content_cut.svg';
import copySVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/content_copy.svg';
import pasteSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/content_paste.svg';
import selectSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/select_all.svg';
import simulateSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/all_inclusive.svg';
import helpSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/live_help.svg';
import inspectorSVG from '!!raw-loader!opuscapita-ui-svg-icons/lib/tune.svg';

@connect(
  state => ({
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset,
    appElementRef: state.layout.appElementRef,
    showInspector: state.layout.showInspector
  }),
  dispatch => ({ actions: bindActionCreators({ ...viewportActions, ...layoutActions } , dispatch) })
)
export default class ToolbarContainer extends Component {
  constructor(props) {
    super(props);
    this.handleShowInspector = this.handleShowInspector.bind(this);
    this.handleShowHelp = this.handleShowHelp.bind(this);
  }

  handleShowInspector() {
    this.props.actions.updateLayoutProperty('showInspector', !this.props.showInspector);
  }

  handleShowHelp() {
    this.props.actions.updateLayoutProperty('showHelp', true);
  }

  render() {
    const {
      appElementRef,
      showInspector
    } = this.props;

    return (
      <Toolbar
        restrictorNode={appElementRef}
        controlsLeft={[
          {
            action: () => {},
            iconSVG: backSVG,
            title: 'Back',
            label: '',
            active: false,
            disabled: true
          },
          {
            action: () => {},
            iconSVG: forwardSVG,
            title: 'Forward',
            label: '',
            active: false,
            disabled: true
          },
          {
            action: () => {},
            iconSVG: cutSVG,
            title: 'Cut',
            label: '',
            active: false,
            disabled: true
          },
          {
            action: () => {},
            iconSVG: copySVG,
            title: 'Copy',
            label: '',
            active: false,
            disabled: true
          },
          {
            action: () => {},
            iconSVG: pasteSVG,
            title: 'Paste',
            label: '',
            active: false,
            disabled: true
          },
          null,
          {
            action: () => {},
            iconSVG: selectSVG,
            title: 'Multiple select',
            label: '',
            active: false,
            disabled: false
          },
          null,
          {
            action: () => {},
            iconSVG: addSVG,
            title: 'Add State',
            label: 'State',
            active: false,
            disabled: false
          },
          {
            action: () => {},
            iconSVG: addSVG,
            title: 'Add Transition',
            label: 'Transition',
            active: false,
            disabled: false
          },
          {
            action: () => {},
            iconSVG: simulateSVG,
            title: 'Simulate',
            label: 'Simulate',
            active: false,
            disabled: false
          },
          null,
          {
            action: this.handleShowInspector,
            iconSVG: inspectorSVG,
            title: 'Show inspector',
            label: '',
            active: showInspector,
            disabled: false
          }
        ]}

        controlsRight={[
          {
            action: () => {},
            iconSVG: null,
            title: 'Cancel',
            label: 'Cancel',
            active: false,
            disabled: false
          },
          {
            action: () => {},
            iconSVG: null,
            title: 'Save',
            label: 'Save',
            active: false,
            disabled: false,
            color: '#fff',
            bgColor: '#0277bd'
          },
          null,
          {
            action: this.handleShowHelp,
            iconSVG: helpSVG,
            title: 'Need help?',
            label: '',
            active: false,
            disabled: false
          }
        ]}
      />
    );
  }
}
