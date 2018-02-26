import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// polyfills needed for 'react-inspector'
import 'core-js/fn/array/from';
import 'core-js/es6/symbol';
import {
  ObjectInspector,
  ObjectName,
  ObjectValue,
  chromeLight
} from 'react-inspector';

export default class ExampleObjectInspector extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    object: PropTypes.object,
    onClickPropName: PropTypes.func,
    hideValues: PropTypes.bool
  }

  static defaultProps = {
    object: {},
    hideValues: false
  }

  handleClickPropName = propData => _ => this.props.onClickPropName(propData);

  exampleObjectNodeRenderer = ({ depth, name, data, isNonenumerable, path }) => {
    const { onClickPropName } = this.props;

    return depth === 0 ?
      (
        <span>
          <ObjectName name={name}/>:
        </span>
      ) :
      (
        <span style={{ margin: '5px' }}>
          <span
            {...(
              onClickPropName && {
                onClick: this.handleClickPropName({ name, data, path }),
                style: { cursor: 'pointer' }
              }
            )}
          >
            <ObjectName
              name={name}
              dimmed={isNonenumerable}
            />
          </span>
          <span>: </span>
          <ObjectValue object={data}/>
        </span>
      )
  }

  render() {
    const { name, object } = this.props;

    return (
      <ObjectInspector
        data={object}
        expandLevel={2}
        name={name}
        theme={{ ...chromeLight, ...({
          TREENODE_FONT_SIZE: '14px',
          TREENODE_LINE_HEIGHT: '24px'
        }) }}
        nodeRenderer={this.exampleObjectNodeRenderer}
      />
    )
  }
}
