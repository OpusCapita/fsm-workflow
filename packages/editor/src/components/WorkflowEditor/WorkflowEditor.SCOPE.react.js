import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';
import FullName from './customComponents/FullName.react';
import messages from '../../i18n';

// const messages = {
//   en: {
//     fsmWorkflowEditor: {
//       actions: {
//         testAction: { // like in workflow.actions
//           label: 'Test Action',
//           params: {
//             nickname: {
//               label: 'Nickname'
//             },
//             fullName: {
//               label: 'Full Name'
//             }
//           }
//         },
//         sendMail: {
//           label: 'Send Email',
//           params: {
//             fromAddress: {
//               label: "Sender' address"
//             }
//           }
//         }
//       },
//       conditions: { // like in workflow.conditions
//         userHasRoles: {
//           label: 'User Has Roles',
//           params: {
//             restrictedRoles: {
//               label: 'Only these roles are allowed'
//             }
//           }
//         }
//       },
//       states: {
//         approved: {
//           label: 'Approved'
//         },
//         inspectionRequired: {
//           label: "Inspection Required"
//         }
//       }
//     }
//   },
//   de: {
//     fsmWorkflowEditor: {
//       actions: {
//         testAction: { // like in workflow.actions
//           label: 'Testaktion',
//           params: {
//             nickname: {
//               label: 'Spitzname'
//             },
//             fullName: {
//               label: 'vollständiger Name'
//             }
//           }
//         },
//         sendMail: {
//           label: 'E-Mail senden',
//           params: {
//             fromAddress: {
//               label: "von der Adresse"
//             }
//           }
//         }
//       },
//       conditions: { // like in workflow.conditions
//         userHasRoles: {
//           label: 'Benutzer hat Rollen',
//           params: {
//             restrictedRoles: {
//               label: 'eingeschränkte Rollen'
//             }
//           }
//         }
//       },
//       states: {
//         approved: {
//           label: 'Genehmigt'
//         },
//         inspectionRequired: {
//           label: "Inspektion erforderlich"
//         }
//       }
//     }
//   }
// }

const wrapper = ({ i18n }) => class extends React.PureComponent {
  static childContextTypes = {
    i18n: PropTypes.object.isRequired
  }

  getChildContext() {
    return { i18n }
  }

  render() {
    return this.props.children()
  }
}

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
@showroomScopeDecorator// eslint-disable-line react/no-multi-comp
export default class WorkflowEditorScope extends PureComponent {
  static childContextTypes = {
    i18n: PropTypes.object.isRequired
  }

  constructor(...args) {
    super(...args);

    this.i18n = new I18nManager();
    this.i18n.register(`fsmWorkflowEditor`, messages);
  }

  state = {
    locale: 'en'
  }

  handleChangeLanguage = ({ target: { value } }) => this.setState({ locale: value }, _ => {
    this.i18n = new I18nManager({ locale: value });
    this.i18n.register(`${value}-${Math.random()}`, messages);
    this.forceUpdate()
  });

  componentsRegistry = {
    fullName: FullName
  }

  render() {
    const { locale } = this.state;

    const Wrapper = wrapper({ i18n: this.i18n });

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <div className='form-group'>
            <label htmlFor='inputEmail3' className='col-sm-2 control-label'>
              Locale (this is not a part of editor)
            </label>
            <div className='col-sm-10'>
              <select onChange={this.handleChangeLanguage} value={locale} className='form-control'>
                <option value='en'>en</option>
                <option value='de'>de</option>
                <option value='fi'>fi</option>
                <option value='no'>no</option>
                <option value='ru'>ru</option>
                <option value='sv'>sv</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <Wrapper>
            {_ => this._renderChildren()}
          </Wrapper>
        </div>

      </div>
    );
  }
}
