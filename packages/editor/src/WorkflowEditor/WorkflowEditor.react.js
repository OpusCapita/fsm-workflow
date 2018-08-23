import React, { PureComponent } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import isEqual from 'lodash/isEqual';
import Editor from '../components/Editor';
import Graph from '../components/Graph';

export default class WorkflowEditor extends PureComponent {
  static propTypes = Editor.propTypes;

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

  handleChange = stateObjOrFunc => this.setState(
    stateObjOrFunc,
    _ => this.props.onChange({ schema: this.state.schema })
  );

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
            <Editor
              {...editorProps}
              onChange={this.handleChange}
            />
            <Graph schema={schema}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}
