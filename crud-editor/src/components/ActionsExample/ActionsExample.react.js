import React, { PureComponent } from 'react';
import find from 'lodash/find';
import { Row, Col } from 'react-bootstrap';
import CodeEditor from '../CodeEditor';
import './ActionsExample.less';
import { invokeAction } from './utils';

export default class ActionsExample extends PureComponent {
  state = {
    actions: {
      'sendMail': {
        body: `
return (\`
Received args:\n
fromAddress: \${fromAddress}\n
greeting: \${greeting}\n
object: \${JSON.stringify(object)}\n
from: \${from}\n
to: \${to}\n
Subject will be: "Hello from \${greeting}"\n
available params: \${Object.keys(args).join(', ')}
\`)
        `
      }
    },
    actionCalls: [
      {
        name: 'sendMail',
        arguments: [
          {
            name: 'fromAddress',
            value: 'support@client.com'
          },
          {
            name: 'greeting',
            value: {
              variable: 'object',
              path: 'supplierName'
            },
            type: 'pathExpression'
          }
        ]
      }
    ],
    commonArgs: {
      object: {
        supplierName: 'Bosch'
      },
      from: 'validated',
      to: 'approved'
    },
    result: null,
    currentAction: 'sendMail'
  }

  componentDidMount() {
    this.update()
  }

  update = _ => {
    const { actions, currentAction, actionCalls, commonArgs } = this.state;

    try {
      const result = invokeAction(actions, currentAction, actionCalls, commonArgs);
      this.setState({ result: String(result) })
    } catch (err) {
      console.log(err)
    }
  }

  setNewState = func => this.setState(func, this.update)

  handleChangeActionBody = value => this.setNewState(prevState => ({
    actions: {
      ...prevState.actions,
      [prevState.currentAction]: {
        ...prevState.actions[prevState.currentAction],
        body: value
      }
    }
  }))

  handleChangeActionCall = value => {
    try {
      const newCall = JSON.parse(value);
      this.setNewState(prevState => ({
        actionCalls: prevState.actionCalls.map(
          call => call.name === prevState.currentAction ?
            newCall :
            call
        )
      }))
    } catch (err) {
      console.log(err.message)
    }
  }

  handleChangeCommonArgs = value => {
    try {
      const newArgs = JSON.parse(value);
      this.setNewState(prevState => ({
        commonArgs: newArgs
      }))
    } catch (err) {
      console.log(err.message)
    }
  }

  render() {
    const { actions, actionCalls, commonArgs, result, currentAction } = this.state;

    return (
      <div>
        <Row>
          <Col sm={6}>
            <h5>Action function body</h5>
            <CodeEditor
              value={actions[currentAction].body}
              className="action-code"
              options={{
                mode: "javascript",
                lineNumbers: true,
                theme: "eclipse",
                placeholder: `Action body`
              }}
              onChange={this.handleChangeActionBody}
            />
          </Col>
          <Col sm={6}>
            <h5>Action invocation definition</h5>
            <CodeEditor
              value={
                JSON.stringify(find(actionCalls, ({ name }) => name === currentAction), null, 2)
              }
              className="action-code"
              options={{
                mode: "javascript",
                lineNumbers: true,
                theme: "eclipse",
                placeholder: `Action body`
              }}
              onChange={this.handleChangeActionCall}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <h5>Result</h5>
            <CodeEditor
              value={result || ''}
              className="action-results"
              options={{
                mode: "javascript",
                theme: "eclipse",
                readOnly: 'nocursor'
              }}
            />
          </Col>
          <Col sm={6}>
            <h5>Implicit action arguments (passed via sendEvent)</h5>
            <CodeEditor
              value={
                JSON.stringify(commonArgs, null, 2)
              }
              className="action-code"
              options={{
                mode: "javascript",
                lineNumbers: true,
                theme: "eclipse",
                placeholder: `Action body`
              }}
              onChange={this.handleChangeCommonArgs}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
