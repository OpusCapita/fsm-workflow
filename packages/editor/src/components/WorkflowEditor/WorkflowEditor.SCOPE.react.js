import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';
import FullName from './customComponents/FullName.react';

const messages = {
  en: {
    fsmWorkflowEditor: {
      actions: {
        testAction: { // like in workflow.actions
          label: 'Test Action',
          params: {
            nickname: {
              label: 'Nickname'
            },
            fullName: {
              label: 'Full Name'
            }
          }
        },
        sendMail: {
          label: 'Send Email',
          params: {
            fromAddress: {
              label: "Sender' address"
            }
          }
        }
      },
      conditions: { // like in workflow.conditions
        userHasRoles: {
          label: 'User Has Roles',
          params: {
            restrictedRoles: {
              label: 'Only these roles are allowed'
            }
          }
        }
      },
      states: {
        approved: {
          label: 'Approved'
        },
        inspectionRequired: {
          label: "Inspection Required"
        }
      }
    }
  }
}

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScopeDecorator
class WorkflowEditorScope extends Component {
  static childContextTypes = {
    i18n: PropTypes.object.isRequired
  }

  constructor(...args) {
    super(...args);

    this.i18n = new I18nManager();
    this.i18n.register(`fsmWorkflowEditor`, messages);
  }

  getChildContext() {
    return { i18n: this.i18n }
  }

  componentsRegistry = {
    fullName: FullName
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
