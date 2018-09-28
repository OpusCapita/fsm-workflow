import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import Label from './Label.react';
import ErrorLabel from './ErrorLabel.react';

Enzyme.configure({ adapter: new Adapter() });

describe('<ErrorLabel />', () => {
  it('renders error label', () => {
    const props = {
      error: 'Something went wrong'
    }
    const wrapper = mount(<ErrorLabel {...props}/>);
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.contains(Label)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(wrapper.text().trim()).to.equal(props.error);
    expect(wrapper.getDOMNode().style.opacity).to.not.equal('0');
  });

  it('hides if error is empty', () => {
    const props = {
      error: ''
    }
    const wrapper = mount(<ErrorLabel {...props}/>);
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.contains(Label)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(wrapper.text().trim()).to.equal(props.error);
    expect(wrapper.getDOMNode().style.opacity).to.equal('0');
  });
});
