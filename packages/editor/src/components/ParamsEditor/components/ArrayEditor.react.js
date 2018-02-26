import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import getParamComponent from './';
import './ArrayEditor.less';

export default class ArrayEditor extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.any),
    schema: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  handleAdd = _ => this.props.onChange((this.props.value || []).concat(null))

  handleChange = index => newValue => this.props.onChange([
    ...this.props.value.slice(0, index), newValue, ...this.props.value.slice(index + 1)
  ])

  handleDelete = index => _ => this.props.onChange([
    ...this.props.value.slice(0, index), ...this.props.value.slice(index + 1)
  ])

  render() {
    const { label, value, schema } = this.props;

    return (
      <div className='form-group'>
        <table className='oc-fsm-crud-editor--table-array-editor'>
          <thead>
            <tr>
              <th>
                <label className="control-label">{label}</label>
              </th>
              <th className='text-right'>
                <i
                  className='fa fa-plus'
                  style={{ cursor: 'pointer' }}
                  onClick={this.handleAdd}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              (
                Component => (value || []).map((v, i) => (
                  <tr key={`${i}-${v}`}>
                    <td>
                      {
                        <Component
                          value={v}
                          onChange={this.handleChange(i)}
                        />
                      }
                    </td>
                    <td className='text-right'>
                      <i
                        className='fa fa-minus'
                        style={{ cursor: 'pointer', marginTop: '10px' }}
                        onClick={this.handleDelete(i)}
                      />
                    </td>
                  </tr>
                ))
              )(getParamComponent(schema.items))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
