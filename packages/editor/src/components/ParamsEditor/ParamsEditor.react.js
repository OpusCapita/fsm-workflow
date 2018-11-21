import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import getParamComponent from './components';
import GenericInput from './components/GenericInput.react';
import ArrayEditor from './components/ArrayEditor.react';
import MultiSelect from './components/MultiSelect.react';

export default class ParamsEditor extends PureComponent {
  static propTypes = {
    paramsSchema: PropTypes.shape({
      properties: PropTypes.objectOf.isRequired
    }),
    params: PropTypes.object,
    componentsRegistry: PropTypes.objectOf(PropTypes.func),
    onChangeParam: PropTypes.func.isRequired,
    getLabel: PropTypes.func.isRequired
  }

  getParam = name => (this.props.params || {})[name] || {};

  render() {
    const { onChangeParam, componentsRegistry, getLabel } = this.props;
    const { properties: params } = this.props.paramsSchema;

    const inputs = Object.keys(params).map((name, i) => {
      const param = this.getParam(name);
      const paramSchema = params[name];
      const type = (paramSchema || {}).type;
      const customComponentName = (paramSchema || {}).uiComponent;
      const CustomComponent = (componentsRegistry || {})[customComponentName];
      const handleChange = onChangeParam(name);

      // TODO maybe unify components API / create a common wrapper to abstract param/component props logic
      return type === 'array' ?
        ((paramSchema || {}).items || {}).enum ?
          (
            <MultiSelect
              key={name}
              id={`${name}-${i}`}
              label={getLabel(name)}
              param={param}
              schema={paramSchema}
              onChange={handleChange}
            />
          ) :
          (
            <ArrayEditor
              key={name}
              label={getLabel(name)}
              param={param}
              onChange={handleChange}
              itemComponent={getParamComponent(paramSchema.items)}
            />
          ) :
        // not an array
        CustomComponent ?
          (
            <CustomComponent
              label={getLabel(name)}
              param={param}
              onChange={handleChange}
            />
          ) :
          (
            <GenericInput
              key={name}
              id={`${name}-${i}`}
              label={getLabel(name)}
              component={getParamComponent(paramSchema)}
              onChange={handleChange}
              param={param}
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

    return (<div>{grid}</div>)
  }
}
