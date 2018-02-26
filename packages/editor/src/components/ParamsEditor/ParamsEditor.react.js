import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { formatLabel } from '../utils';
import getParamComponent from './components';
import GenericInput from './components/GenericInput.react';
import ArrayEditor from './components/ArrayEditor.react';
import MultiSelect from './components/MultiSelect.react';

export default class GenericEditor extends PureComponent {
  static propTypes = {
    paramsSchema: PropTypes.shape({
      properties: PropTypes.objectOf.isRequired
    }),
    values: PropTypes.object,
    componentsRegistry: PropTypes.objectOf(PropTypes.func),
    onChangeParam: PropTypes.func.isRequired
  }

  getParamValue = name => (this.props.values || {})[name];

  render() {
    const { onChangeParam, componentsRegistry } = this.props;
    const { properties: params } = this.props.paramsSchema;

    const inputs = Object.keys(params).map((name, i) => {
      const paramSchema = params[name];
      const paramValue = this.getParamValue(name);
      const type = (paramSchema || {}).type;
      const customComponentName = (paramSchema || {}).uiComponent;
      const CustomComponent = (componentsRegistry || {})[customComponentName];
      const handleChange = onChangeParam(name);

      return type === 'array' ?
        ((paramSchema || {}).items || {}).enum ?
          (
            <MultiSelect
              key={name}
              id={`${name}-${i}`}
              label={formatLabel(name)}
              value={paramValue}
              schema={paramSchema}
              onChange={handleChange}
            />
          ) :
          (
            <ArrayEditor
              key={name}
              label={formatLabel(name)}
              schema={paramSchema}
              value={paramValue}
              onChange={handleChange}
            />
          ) :
        // not an array
        CustomComponent ?
          (
            <CustomComponent
              label={formatLabel(name)}
              value={paramValue}
              onChange={handleChange}
            />
          ) :
          (
            <GenericInput
              key={name}
              id={`${name}-${i}`}
              label={formatLabel(name)}
              component={getParamComponent(paramSchema)}
              onChange={handleChange}
              placeholder="Enter value"
              value={paramValue}
            />
          )
    });

    const grid = [];

    if (inputs && inputs.length) {
      for (let rowIndex = 0; rowIndex < Math.ceil(inputs.length); rowIndex++) {
        const cols = []
        for (let colIndex = 0; colIndex < 2; colIndex++) {
          cols.push(
            <Col key={colIndex} sm={6}>
              {inputs[rowIndex * 2 + colIndex]}
            </Col>
          )
        }
        const row = (<Row key={rowIndex}>{cols}</Row>);
        grid.push(row);
      }
    }

    return (
      <div>
        {
          grid
        }
      </div>
    )
  }
}
