import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import DeleteStateDialogBody from './DeleteStateDialogBody.react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Radio from 'react-bootstrap/lib/Radio';
import { I18nManager } from '@opuscapita/i18n';

Enzyme.configure({ adapter: new Adapter() });

describe('<DeleteStateDialogBody />', () => {
  it('renders an modal', () => {
    const props = {
      i18n: new I18nManager(),
      states: [
        {
          name: 'one',
          isInitial: true,
          isFinal: false
        },
        {
          name: 'two',
          isInitial: false,
          isFinal: true
        }
      ],
      stateName: 'one',
      onSelect: () => {}
    };

    const wrapper = mount(<DeleteStateDialogBody {...props}/>);
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.contains(FormGroup)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(Radio).length).to.equal(2);
    expect(wrapper.find(Radio).at(0).prop('checked')).to.be.true; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(Radio).at(1).prop('checked')).to.be.false; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(Radio).at(1).find(FormControl).prop('value')).to.equal('two');
  });
});
