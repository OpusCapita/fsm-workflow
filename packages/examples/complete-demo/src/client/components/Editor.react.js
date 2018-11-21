import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import WorkflowEditor from '@opuscapita/fsm-workflow-editor';
import componentsRegistry from '../customComponentsRegistry';
import { notificationSuccess, notificationError } from '../constants';
import { url } from '../utils';

export default class Editor extends PureComponent {
  static contextTypes = {
    uiMessageNotifications: PropTypes.object.isRequired
  }

  state = {}

  componentDidMount() {
    this.getWorkflowJSON()
  }

  getWorkflowJSON = _ => {
    const { uiMessageNotifications } = this.context;
    const self = this;
    superagent.
      get(url('/api/editordata')).
      then(res => {
        self.setState({ ...res.body })
      }).
      catch(err => {
        console.log(err);
        uiMessageNotifications.error({
          id: notificationError,
          message: 'Failed to load editor data: ' + err.message
        });
      })
  }

  handleSave = data => {
    console.log({ data });
    const { uiMessageNotifications } = this.context;
    superagent.
      post(url('/api/editordata')).
      send(data).
      then(res => {
        uiMessageNotifications.success({
          id: notificationSuccess,
          message: 'Workflow schema saved successfully'
        });
      }).
      catch(err => {
        console.log(err);
        uiMessageNotifications.error({
          id: notificationError,
          message: 'Save failed: ' + err.message
        });
      })
  }

  render() {
    const { schema, actions, conditions, objectConfiguration } = this.state;

    const props = {
      workflow: {
        schema,
        actions,
        conditions,
        objectConfiguration
      },
      componentsRegistry,
      onSave: this.handleSave
    }

    return schema ? (<WorkflowEditor {...props}/>) : null
  }
}
