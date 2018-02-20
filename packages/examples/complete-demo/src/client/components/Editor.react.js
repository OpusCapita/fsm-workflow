import React, { PureComponent } from 'react';
import superagent from 'superagent';
import WorkflowEditor from '@opuscapita/fsm-workflow-editor';
import componentsRegistry from '../customComponentsRegistry';

export default class Editor extends PureComponent {
  state = {}

  componentDidMount() {
    this.getWorkflowJSON()
  }

  getWorkflowJSON = _ => {
    const self = this;
    superagent.
      get('/editordata').
      then(res => self.setState(prevState => ({ ...res.body }))).
      catch(err => { console.log('editor received error', err); throw err })
  }

  handleSave = data => {
    superagent.
      post('/editordata').
      send(data).
      then(res => console.log('editor response after save', res.body)).
      catch(err => { console.log('editor error after save', err); throw err })
  }

  render() {
    const { schema, actions, conditions } = this.state;

    const props = {
      workflow: {
        schema,
        actions,
        conditions
      },
      componentsRegistry,
      onSave: this.handleSave
    }

    return schema ? (<WorkflowEditor {...props}/>) : null
  }
}
