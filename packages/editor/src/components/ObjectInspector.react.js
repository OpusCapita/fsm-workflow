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
import { unifyPath } from './utils';

export default class ExampleObjectInspector extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    object: PropTypes.object,
    onClickPropName: PropTypes.func,
    showValues: PropTypes.bool,
    currentPath: PropTypes.string
  }

  static defaultProps = {
    object: {},
    showValues: true
  }

  handleClickPropName = propData => _ => this.props.onClickPropName(propData);

  exampleObjectNodeRenderer = ({ depth, name, data, isNonenumerable, path }) => {
    const { onClickPropName, showValues, currentPath } = this.props;

    return depth === 0 ?
      (
        <span>
          <ObjectName name={name} styles={{ fontWeight: 'bold' }}/>
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
              styles={{
                padding: '5px',
                ...(currentPath === unifyPath(path) && {
                  background: '#337ab7',
                  color: 'white'
                })
              }}
            />
          </span>
          {
            showValues && (
              <span style={{ marginLeft: '10px' }}><ObjectValue object={data}/></span>
            )
          }
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
          TREENODE_LINE_HEIGHT: '24px',
          BASE_FONT_FAMILY: `"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif`,
          TREENODE_FONT_FAMILY: `"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif`,
          OBJECT_NAME_COLOR: 'black',
          ARROW_COLOR: 'black',
          ARROW_FONT_SIZE: 14
        }) }}
        nodeRenderer={this.exampleObjectNodeRenderer}
      />
    )
  }
}
