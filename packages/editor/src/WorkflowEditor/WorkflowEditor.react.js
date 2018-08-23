import React, { PureComponent } from 'react';
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

  /**
   * @param {object|func} stateObjOrFunc - same as first argument for this.setState
   */
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
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <Editor
              {...editorProps}
              onChange={this.handleChange}
            />
            <Graph schema={schema}/>
          </div>
        </div>
      </div>
    )
  }
}
