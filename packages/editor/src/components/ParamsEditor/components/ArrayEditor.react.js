import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ArrayEditor.less';
import withExpressionInput from './PathExpressionInputInjector';

@withExpressionInput
export default class ArrayEditor extends PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.any),
      PropTypes.string
    ]),
    itemComponent: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    component: PropTypes.func
  }

  handleAdd = _ => this.props.onChange((this.props.value || []).concat(null))

  handleChange = index => newValue => this.props.onChange(
    [...this.props.value.slice(0, index), newValue, ...this.props.value.slice(index + 1)]
  )

  handleDelete = index => _ => this.props.onChange(
    [...this.props.value.slice(0, index), ...this.props.value.slice(index + 1)]
  )

  render() {
    const { label, value, itemComponent: ItemComponent, component: CustomComponent } = this.props;

    let renderLabel = label;

    if (typeof label === 'function') {
      const Label = label;
      renderLabel = (<Label/>)
    }

    return (
      <div className='form-group'>
        <table className='oc-fsm-crud-editor--table-array-editor'>
          <thead>
            <tr>
              <th>
                <label className="control-label">{renderLabel}</label>
              </th>
              {
                !CustomComponent && (
                  <th className='text-right'>
                    <i
                      className='fa fa-plus'
                      style={{ cursor: 'pointer' }}
                      onClick={this.handleAdd}
                    />
                  </th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              CustomComponent ?
                (
                  <tr>
                    <td>
                      <CustomComponent value={value} onChange={this.props.onChange}/>
                    </td>
                  </tr>
                ) :
                (
                  (Array.isArray(value) ? value : []).map((v, i, arr) => (
                    <tr key={`${i}-${arr.length}`}>
                      <td>
                        <ItemComponent value={v} onChange={this.handleChange(i)}/>
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
                )
            }
          </tbody>
        </table>
      </div>
    )
  }
}
