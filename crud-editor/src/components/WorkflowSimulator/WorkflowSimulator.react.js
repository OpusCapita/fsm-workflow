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


const ActivityLogItem = ({ from, to, i, itemNumberLength }) => {
  return (
    <div
      className={`oc-fsm-crud-editor--workflow-simulator__activity-log-item`}
    >
      <div className={`oc-fsm-crud-editor--workflow-simulator__activity-log-item-part`}>
        <div
          className={`oc-fsm-crud-editor--workflow-simulator__activity-log-item-i`}
          style={{ width: `${itemNumberLength}ch` }}
        >
          {i}
        </div>
      </div>
      <div className={`oc-fsm-crud-editor--workflow-simulator__activity-log-item-part`}>Transition occurred:</div>
      <div className={`oc-fsm-crud-editor--workflow-simulator__activity-log-item-part`}>{from} </div>
      <div className={`oc-fsm-crud-editor--workflow-simulator__activity-log-item-part`}><i className="fa fa-arrow-right"/></div>
      <div className={`oc-fsm-crud-editor--workflow-simulator__activity-log-item-part`}>{to}</div>
    </div>
  );
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
                  <span>Available transitions</span>
                </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
            <div className="oc-fsm-crud-editor--workflow-simulator__example-object-editor">

            </div>
          </div>

          <div
            className={`
              oc-fsm-crud-editor--workflow-simulator__content-pane
              oc-fsm-crud-editor--workflow-simulator__content-pane--example-object-editor
            `}
          >
            <Navbar fluid={true}>
              <Navbar.Header>
                <Navbar.Brand>
                  <span>Example object</span>
                </Navbar.Brand>
                <span
                  className={`
                    oc-fsm-crud-editor--workflow-simulator__example-object-validation-message
                    ${codeError ? 'text-danger' : 'text-success'}
                  `}
                >
                  {codeError || 'Object is valid'}
                </span>
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
          <div className="oc-fsm-crud-editor--workflow-simulator__activity-log">
            {Array.from(Array(1000)).fill((v, k) => k).map((v, k, arr) => (
              <ActivityLogItem
                key={k}
                i={k + 1}
                from={`Approval Required`}
                to={`Approved`}
                itemNumberLength={parseInt(arr.length).toString().length + 1}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

WorkflowSimulator.propTypes = propTypes;
WorkflowSimulator.defaultProps = defaultProps;
