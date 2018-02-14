import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import StatesEditor from './StatesEditor.react';
import Modal from 'react-bootstrap/lib/Modal';

Enzyme.configure({ adapter: new Adapter() });

describe('<StatesEditor />', () => {
  it('renders an editor modal', () => {
    const props = {
      state: {
        name: 'one',
        isInitial: true,
        isFinal: false
      },
      existingStates: ['one', 'two', 'three'],
      onSave: () => {},
      onClose: () => {},
    };

    const wrapper = mount(<StatesEditor {...props}/>);
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.find('modal-header button.close')).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(Modal).length).to.equal(1);
  });
});
