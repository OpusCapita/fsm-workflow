import React, { PureComponent } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import isEqual from 'lodash/isEqual';
import WorkflowEditor from '../components/WorkflowEditor';
import WorkflowGraph from '../components/WorkflowGraph';

export default class Editor extends PureComponent {
  static propTypes = WorkflowEditor.propTypes;

  static defaultProps = {
    onChange: _ => {}
  }

  constructor(...args) {
    super(...args);

    this.state = {
      ...this.stateFromProps(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.setState(this.stateFromProps(nextProps))
    }
  }

  stateFromProps = props => {
    const schema = (props.workflow || {}).schema || {};
    return ({ schema })
  }

  handleChange = stateObjOrFunc => this.setState(stateObjOrFunc, _ => this.props.onChange(this.state.schema));

  render() {
    const { schema } = this.state;

    const editorProps = {
      ...this.props,
      workflow: {
        ...this.props.workflow,
        schema
      }
    }

    return (
      <Grid>
        <Row>
          <Col sm={12}>
            <WorkflowEditor
              {...editorProps}
              onChange={this.handleChange}
            />
            <WorkflowGraph schema={schema}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}
