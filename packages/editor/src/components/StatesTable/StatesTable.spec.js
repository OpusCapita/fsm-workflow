import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import StatesTable from './StatesTable.react';

Enzyme.configure({ adapter: new Adapter() });

describe('<StatesTable />', () => {
  it('renders a table of states', () => {
    const props = {
      states: [
        { name: 'one' },
        { name: 'two' }
      ],
      initialState: 'one',
      finalStates: ['two'],
      onDelete: () => {},
      onEdit: () => {},
      statesInTransitions: []
    };

    const wrapper = mount(<StatesTable {...props}/>);
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions

    const header = wrapper.find('thead tr').at(0).find('th');
    expect(header.length).to.equal(5);
    expect(header.at(0).text().trim()).to.equal('Name');
    expect(header.at(1).text().trim()).to.equal('Description');
    expect(header.at(2).text().trim()).to.equal('Initial');
    expect(header.at(3).text().trim()).to.equal('Final');
    expect(header.at(4).find('button').text().trim()).to.equal('Add');

    expect(wrapper.find('tbody tr')).to.have.length(props.states.length);

    // expect(wrapper.find('button').at(0).text().trim()).to.equal('Add');

    const firstRow = wrapper.find('tbody tr').at(0).find('td');
    expect(firstRow.at(0).text()).to.equal(props.states[0].name);
    expect(firstRow.at(2).childAt(0).exists()).to.be.true; // eslint-disable-line no-unused-expressions
    expect(firstRow.at(3).childAt(0).exists()).to.be.false; // eslint-disable-line no-unused-expressions
    expect(firstRow.at(4).find('button').at(0).text().trim()).to.equal('Edit');
    expect(firstRow.at(4).find('button').at(1).text().trim()).to.equal('Delete');

    const secondRow = wrapper.find('tbody tr').at(1).find('td');
    expect(secondRow.at(0).text()).to.equal(props.states[1].name);
    expect(secondRow.at(2).childAt(0).exists()).to.be.false; // eslint-disable-line no-unused-expressions
    expect(secondRow.at(3).childAt(0).exists()).to.be.true; // eslint-disable-line no-unused-expressions
    expect(secondRow.at(4).find('button').at(0).text().trim()).to.equal('Edit');
    expect(secondRow.at(4).find('button').at(1).text().trim()).to.equal('Delete');
  });
});
