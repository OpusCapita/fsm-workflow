// import React from 'react';
import StringInput from './StringInput';
import BooleanInput from './BooleanInput';
import IntegerInput from './IntegerInput';
import DecimalInput from './DecimalInput';

const components = {
  string: StringInput,
  boolean: BooleanInput,
  integer: IntegerInput,
  number: DecimalInput
}

const getParamComponent = (schema = {}) => {
  const { type } = schema;

  let Component = components[type] || components.string;

  if (schema.enum) {
    // const options = schema.enum;
    // Component = props => (<EnumInput {...props} options={options}/>)
  }

  return Component
}

export default getParamComponent;
