import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import WorkflowGraph from './WorkflowGraph';

export default class EditorOutput extends PureComponent {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    createJsonOutput: PropTypes.func.isRequired
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  state = {
    fullScreen: false
  }

  handleFullscreen = _ => this.setState(({ fullScreen }) => ({ fullScreen: !fullScreen }));

  render() {
    const { i18n } = this.context;
    const { schema } = this.props;
    const { fullScreen } = this.state;

    const title = i18n.getMessage('fsmWorkflowEditor.ui.preview.title');
    const description = i18n.getMessage('fsmWorkflowEditor.ui.preview.description');

    if (!fullScreen) {
      return (
        <div>
          <h2>
            {title}
            <div className='pull-right'>
              <Button onClick={this.handleFullscreen}>FS</Button>
            </div>
          </h2>
          <p>{description}</p>
          <div className="oc-fsm-crud-editor--workflow-editor__tab">
            <WorkflowGraph schema={schema}/>
          </div>
        </div>
      )
    }

    return (
      <Modal show={fullScreen} onHide={this.handleFullscreen}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WorkflowGraph schema={schema}/>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-right">
            <Button
              onClick={this.handleFullscreen}
            >
              {i18n.getMessage('fsmWorkflowEditor.ui.buttons.close.label')}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}
