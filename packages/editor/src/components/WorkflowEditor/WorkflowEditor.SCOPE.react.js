import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';
import FullName from './customComponents/FullName.react';

const messages = {
  en: {
    fsmWorkflowEditor: {
      actions: {
        testAction: { // like in workflow.actions
          label: 'TEST=ACTION',
          params: {
            nickname: {
              label: 'NiCKNamE'
            },
            fullName: {
              label: 'You dont fool me'
            }
          }
        },
        sendMail: {
          label: '[[Send Email]]',
          params: {
            fromAddress: {
              label: "Sender' address"
            }
          }
        }
      },
      conditions: { // like in workflow.conditions
        userHasRoles: {
          label: 'User HAS R0LES',
          params: {
            restrictedRoles: {
              label: 'Only these roles are allowed'
            }
          }
        }
      },
      states: {
        approved: {
          label: 'APPROVED!'
        },
        inspectionRequired: {
          label: "Erforderliche Inspektion [ lets pretend it's English]"
        }
      },
      events: {
        cancelApproval: {
          label: 'Cancel APPROVAL!!'
        },
        sendToClarification: {
          label: 'Clarify it at last!'
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
    this.i18n.register(`fsmWorkflowEditor-${hash(messages)}`, messages);
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
