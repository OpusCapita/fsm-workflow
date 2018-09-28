import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import TransitionsTable from './TransitionsTable.react';
import { I18nManager } from '@opuscapita/i18n';
import messages from '../../i18n';
import { getLabel } from '../utils';

const i18n = new I18nManager();
i18n.register('asdaa', messages);

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
      getStateLabel: getLabel(i18n)('states'),
      onEditTransition: () => {},
      onDeleteTransition: () => {},
      onSaveGuards: () => {},
      onSaveActions: () => {},
      objectConfiguration: {}
    };

    const wrapper = mount(<TransitionsTable {...props}/>, { context: { i18n } });
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions
    // check table header
    const header = wrapper.find('thead tr').at(0).find('th');
    expect(header.length).to.equal(4);
    expect(header.at(0).text().trim()).to.equal(i18n.getMessage('fsmWorkflowEditor.ui.transitions.event.label'));
    expect(header.at(1).text().trim()).to.equal(i18n.getMessage('fsmWorkflowEditor.ui.transitions.from.label'));
    expect(header.at(2).text().trim()).to.equal(i18n.getMessage('fsmWorkflowEditor.ui.transitions.to.label'));
    expect(header.at(3).find('button').text().trim()).
      to.equal(i18n.getMessage('fsmWorkflowEditor.ui.buttons.add.label'));

    const rows = wrapper.find('tbody tr');
    const firstRow = rows.at(0).find('td');
    expect(firstRow.at(0).text().trim()).to.equal(props.transitions[0].event);
    expect(firstRow.at(1).text().trim()).to.equal(props.getStateLabel(props.transitions[0].from))
    expect(firstRow.at(2).text().trim()).to.equal(props.getStateLabel(props.transitions[0].to))
  });
});
