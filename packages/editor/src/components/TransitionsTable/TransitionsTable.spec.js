import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import TransitionsTable from './TransitionsTable.react';
import startCase from 'lodash/startCase';

Enzyme.configure({ adapter: new Adapter() });

describe('<TransitionsTable />', () => {
  it('renders a table of states', () => {
    const props = {
      transitions: [
        {
          "from": "inspectionRequired",
          "to": "approvalRequired",
          "event": "automatic-inspect"
        },
        {
          "from": "inspectionRequired",
          "to": "inspClrRequired",
          "event": "sendToClarification"
        }
      ],
      states: [
        "inspectionRequired",
        "approvalRequired",
        "inspClrRequired"
      ],
      getStateLabel: startCase,
      onEditTransition: () => {},
      onDeleteTransition: () => {},
      onSaveGuards: () => {},
      onSaveActions: () => {},
      objectConfig: {}
    };

    const wrapper = mount(<TransitionsTable {...props}/>);
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions
    // check table header
    const header = wrapper.find('thead tr').at(0).find('th');
    expect(header.length).to.equal(4);
    expect(header.at(0).text().trim()).to.equal('Event');
    expect(header.at(1).text().trim()).to.equal('From');
    expect(header.at(2).text().trim()).to.equal('To');
    expect(header.at(3).find('button').text().trim()).to.equal('Add');

    const rows = wrapper.find('tbody tr');
    const firstRow = rows.at(0).find('td');
    expect(firstRow.at(0).text().trim()).to.equal(props.transitions[0].event);
    expect(firstRow.at(1).text().trim()).to.equal(props.getStateLabel(props.transitions[0].from))
    expect(firstRow.at(2).text().trim()).to.equal(props.getStateLabel(props.transitions[0].to))
  });
});
