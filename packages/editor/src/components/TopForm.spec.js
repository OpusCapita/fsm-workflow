import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import sinon from 'sinon';
import FormControl from 'react-bootstrap/lib/FormControl';
import TopForm from './TopForm.react';
import { I18nManager } from '@opuscapita/i18n';

Enzyme.configure({ adapter: new Adapter() });

describe('<TopForm />', () => {
  it('renders top form', () => {
    const props = {
      name: 'Invoice workflow',
      onNameChange: sinon.spy()
    };

    const wrapper = mount(<TopForm {...props}/>, { context: { i18n: new I18nManager() } });
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.contains(FormControl)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(FormControl).prop('value')).to.equal(props.name);
    expect(wrapper.find(FormControl).prop('onChange')).to.equal(props.onNameChange);
  });
});
