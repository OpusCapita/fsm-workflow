import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { I18nManager } from '@opuscapita/i18n';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import TabContent from 'react-bootstrap/lib/TabContent';
import WorkflowEditor from './WorkflowEditor.react';
import StatesTable from '../StatesTable';
import TransitionsTable from '../TransitionsTable';
import EditorOutput from '../EditorOutput.react';
import TopForm from '../TopForm.react';

Enzyme.configure({ adapter: new Adapter() });

const i18n = new I18nManager();

describe('<WorkflowEditor />', () => {
  it('renders editor', () => {
    const props = {
      onSave: sinon.spy(),
      workflow: {
        schema: {
          name: 'invoiceFlow',
          initialState: 'open',
          finalStates: ['approved', 'rejected'],
          transitions: [
            {
              from: 'open',
              to: 'validated',
              event: 'validate'
            },
            {
              from: 'validated',
              to: 'approved',
              event: 'approve'
            },
            {
              from: 'open',
              to: 'rejected',
              event: 'reject'
            }
          ],
          states: [
            { name: 'open' },
            { name: 'approved' },
            { name: 'rejected' },
            { name: 'validated' }
          ]
        },
        objectConfiguration: {
          alias: 'invoice',
          example: {
            invoiceNo: "inv5566"
          },
          schema: {
            type: "object",
            properties: {
              invoiceNo: {
                type: "string"
              }
            }
          }
        },
        actions: {
          sendMail: {
            paramsSchema: {
              type: "object",
              properties: {
                fromAddress: {
                  type: "string"
                },
                greeting: {
                  type: "string"
                },
                sendCopy: {
                  type: "boolean"
                }
              },
              required: ["fromAddress", "greeting"]
            }
          }
        }
      }
    };

    const wrapper = mount(<WorkflowEditor {...props}/>, {
      context: { i18n }
    });
    expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions

    const { schema } = props.workflow;
    // schema is initially copied from props to state
    expect(wrapper.state().schema).to.deep.equal(schema);

    // test onSave handler
    expect(wrapper.find('h1').find('button').at(0).text().trim()).to.equal('Save');
    wrapper.find('h1').find('button').at(0).simulate('click');
    expect(props.onSave.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
    expect(props.onSave.getCall(0).args[0]).to.deep.equal({ schema });

    expect(wrapper.contains(TopForm)).to.be.true; // eslint-disable-line no-unused-expressions

    // check tabs
    expect(wrapper.find(Tabs).exists()).to.be.true; // eslint-disable-line no-unused-expressions
    const tabs = wrapper.find(Tabs);
    expect(tabs.find(Tab)).to.have.lengthOf(2);
    expect(tabs.find('a').map(el => el.text())).to.deep.equal(['States', 'Transitions']);

    expect(tabs.find(TabContent).find(StatesTable).exists()).to.equal(true);
    expect(tabs.find(TabContent).find(TransitionsTable).exists()).to.equal(false);

    // check output presence
    expect(wrapper.contains(EditorOutput)).to.be.true; // eslint-disable-line no-unused-expressions
  });
});
