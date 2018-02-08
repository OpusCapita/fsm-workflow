import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import './WorkflowSimulator.less';
import ReactJson from 'react-json-view';

const propTypes = {
  exampleObject: PropTypes.object,
  onExampleObjectChange: PropTypes.func
};
const defaultProps = {
  exampleObject: {},
  onExampleObjectChange: () => {}
};

export default
class WorkflowSimulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  handleExampleObjectChange = exampleObject => {
    this.props.onExampleObjectChange(exampleObject);
  }

  render() {
    let { exampleObject } = this.props;
    let { code, codeError } = this.state;

    return (
      <div className="oc-fsm-crud-editor--workflow-simulator">
        <div className="oc-fsm-crud-editor--workflow-simulator__content">
          <div className="oc-fsm-crud-editor--workflow-simulator__content-pane">
            <Navbar fluid={true}>
              <Navbar.Header>
                <Navbar.Brand>
                  <span>Example object</span>
                </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
            <div className="oc-fsm-crud-editor--workflow-simulator__example-object-editor">
              <ReactJson
                name={null}
                src={exampleObject}
                indentWidth={8}
                enableClipboard={false}
                displayObjectSize={false}
                displayDataTypes={false}
                onEdit={(data) => this.handleExampleObjectChange(data['updated_src'])}
                onAdd={(data) => this.handleExampleObjectChange(data['updated_src'])}
                onDelete={(data) => this.handleExampleObjectChange(data['updated_src'])}
              />
            </div>
            <div className="panel panel-default oc-fsm-crud-editor--workflow-simulator__example-object-validation">
              <div className="panel-body">
                <span
                  className={`
                    oc-fsm-crud-editor--workflow-simulator__example-object-validation-message
                    ${codeError ? 'oc-fsm-crud-editor--workflow-simulator__example-object-validation-message--error' : ''}
                  `}
                >
                  {codeError || 'Object is valid'}
                </span>
              </div>
            </div>
          </div>

          <div className="oc-fsm-crud-editor--workflow-simulator__content-pane">
            <Navbar fluid={true}>
              <Navbar.Header>
                <Navbar.Brand>
                  <span>Activity log</span>
                </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
            <div className="oc-fsm-crud-editor--workflow-simulator__example-object-editor">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkflowSimulator.propTypes = propTypes;
WorkflowSimulator.defaultProps = defaultProps;
