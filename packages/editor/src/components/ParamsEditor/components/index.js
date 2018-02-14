import React from 'react';
import StringInput from './StringInput.react';
import BooleanInput from './BooleanInput.react';
import IntegerInput from './IntegerInput.react';
import DecimalInput from './DecimalInput.react';
import EnumInput from './EnumInput.react';
import DateInput from './DateInput.react';

const components = {
  string: StringInput,
  boolean: BooleanInput,
  integer: IntegerInput,
  number: DecimalInput
}

export default (schema = {}) => {
  const { type } = schema;

  let Component = components[type] || components.string;

  if (schema.enum) {
    Component = props => (
      <EnumInput
        {...props}
        options={schema.enum}
        type={type}
      />
    )
  }

  if (type === 'string' && schema.format === 'date') {
    Component = DateInput
  }

  return Component
}

