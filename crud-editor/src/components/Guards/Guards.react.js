import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Glyphicon,
  Modal,
  Checkbox
} from 'react-bootstrap';
import CodeMirror from 'kvolkovich-sc-react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/javascript/javascript'
import './Guards.less';


const evaluateCode = ({ code, arg }) => {
  try {
    const result = (({ object }) => eval(code))(arg); // eslint-disable-line no-eval
    return typeof result === 'boolean' ?
      result :
      new Error(
        `Error: type mismatch. Function returned:
        ${String(result)} of type '${typeof result}',
        expecting a boolean value.`
      )
  } catch (err) {
    return err
  }
}

export default class Guards extends PureComponent {
  static propTypes = {
    transition: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string,
      guards: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        func: PropTypes.string // to be eval'd
      }))
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    exampleObject: PropTypes.object,
    onSaveGuards: PropTypes.func.isRequired
  }

  static defaultProps = {
    exampleObject: {
      id: 'exampleId',
      enabled: true,
      total: 1000
    }
  }

  state = {
    guards: this.props.transition.guards || [],
    exampleObject: JSON.stringify(this.props.exampleObject, null, 2),
    autoplay: true
  }

  handleChange = index => value => this.setState(prevState => ({
    guards: prevState.guards.map(
      (guard, i) => i === index ?
        {
          ...guard,
          func: value
        } :
        guard
    )
  }), (this.state.autoplay && this.handleEvalCode(index)))

  handleDeleteGuard = index => _ => this.setState(prevState => ({
    guards: [
      ...prevState.guards.slice(0, index),
      ...prevState.guards.slice(index + 1)
    ]
  }))

  handleAddNewGuard = _ => this.setState(prevState => ({
    guards: [
      ...prevState.guards,
      {
        name: `condition_${String(Math.random() * Math.random()).slice(2)}`,
        func: ''
      }
    ]
  }))

  handleToggleAutoplay = _ => this.setState(prevState => ({
    autoplay: !prevState.autoplay
  }))

  handleEvalCode = index => _ => {
    const guard = this.state.guards[index];

    const object = JSON.parse(this.state.exampleObject);

    const result = evaluateCode({
      code: guard.func,
      arg: { object }
    })

    const isError = result instanceof Error;

    return this.setState(prevState => ({
      guards: prevState.guards.map(
        (guard, i) => i === index ?
          {
            ...guard,
            isError,
            result: isError ? result.message : String(result)
          } :
          guard
      )
    }))
  }

  handleChangeObject = value => {
    try {
      JSON.parse(value);

      this.setState(prevState => ({
        exampleObject: value,
        exampleObjectError: null
      }), _ => this.state.autoplay && this.state.guards.forEach((_, i) => this.handleEvalCode(i)()))
    } catch (err) {
      this.setState({
        exampleObjectError: err.message
      })
    }
  }

  handleSave = _ => this.props.onSaveGuards(this.state.guards.map(
    ({ name, func }) => ({ name, func: func.trim() })
  ))

  render() {
    const {
      transition: {
        from,
        to,
        event
      },
      onClose
    } = this.props;

    const {
      guards,
      exampleObject,
      exampleObjectError,
      autoplay
    } = this.state;

    return (
      <Modal
        show={true}
        onHide={onClose}
        dialogClassName="oc-fsm-workflow-crud-editor-modal"
        backdrop='static'
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            Guards for Transition <code>{`
                { event: ${event}, from: ${from}, to: ${to} }
              `}</code>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table style={{ verticalAlign: 'top', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th>Expression</th>
                <th style={{ width: '0px' }}></th>
                <th
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: '1px'
                  }}
                >
                  Results
                  <Checkbox
                    onChange={this.handleToggleAutoplay}
                    checked={!!autoplay}
                  >
                    Autoplay
                  </Checkbox>
                </th>
                <th className="text-right" style={{ width: '120px' }}>
                  <Button
                    bsSize='sm'
                    onClick={this.handleAddNewGuard}
                  >
                    Add
                  </Button>
                </th>
                <th>Example object</th>
              </tr>
            </thead>
            <tbody>
              {
                (guards.length > 0 ? guards : [{}]).map((guard, guardIndex, arr) => (
                  <tr
                    key={`${guardIndex}-${guard.name}`}
                    {...(guardIndex < (arr.length - 1) && { style: { height: '110px' } })}
                  >
                    <td>
                      {
                        guard.func !== undefined && (
                          <CodeMirror
                            className="guard-code"
                            value={guard.func}
                            options={{
                              mode: "javascript",
                              lineNumbers: true,
                              theme: "eclipse"
                            }}
                            onChange={this.handleChange(guardIndex)}
                          />
                        )
                      }
                    </td>
                    <td>
                      {
                        guard.func !== undefined && (
                          <Glyphicon
                            glyph="play"
                            style={{
                              cursor: 'pointer',
                              position: 'relative',
                              left: '-40px',
                              zIndex: 2
                            }}
                            onClick={this.handleEvalCode(guardIndex)}
                          />
                        )
                      }
                    </td>
                    <td>
                      {
                        guard.func !== undefined && (
                          <CodeMirror
                            className="guard-code"
                            value={guard.result || ''}
                            options={{
                              theme: "eclipse",
                              lineWrapping: true,
                              readOnly: 'nocursor'
                            }}
                          />
                        )
                      }

                    </td>
                    <td className="text-right">
                      {
                        guard.func !== undefined && (
                          <Button
                            bsSize='sm'
                            onClick={this.handleDeleteGuard(guardIndex)}
                          >
                            <Glyphicon glyph="trash"/>
                            {'\u2003'}
                            Delete
                          </Button>
                        )
                      }
                    </td>
                    {
                      guardIndex === 0 && (
                        <td rowSpan={guards.length}>
                          <CodeMirror
                            className="example-object"
                            value={exampleObject}
                            options={{
                              mode: {
                                name: 'javascript',
                                json: true
                              },
                              theme: "eclipse",
                              lineNumbers: true,
                              lineWrapping: true
                            }}
                            onChange={this.handleChangeObject}
                          />
                          <span style={{ color: 'red' }}>{exampleObjectError}{`\u00A0`}</span>
                        </td>
                      )
                    }
                  </tr>
                ))
              }
            </tbody>
          </Table>
          {/* <Row>
            <Col sm={8}>
              {
                guards.map((guard, guardIndex) => (
                  <Table
                    style={{ verticalAlign: 'top' }}
                    key={`${guardIndex}-${guard.name}`}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: '65%' }}>JavaScript Expression</th>
                        <th
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottomWidth: '1px'
                          }}
                        >
                          <Glyphicon
                            glyph="play"
                            style={{ cursor: 'pointer', color: 'darkgreen' }}
                            onClick={this.handleEvalCode(guardIndex)}
                          />
                          <Checkbox
                            onChange={this.toggleAutoplay(guardIndex)}
                            checked={!!guard.autoplay}
                          >
                            Autoplay
                          </Checkbox>
                        </th>
                        <th style={{ width: '30px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <CodeMirror
                            className="guard-code"
                            value={guard.func}
                            options={{
                              mode: "javascript",
                              lineNumbers: true,
                              theme: "eclipse"
                            }}
                            onChange={this.handleChange(guardIndex)}
                          />
                        </td>
                        <td>
                          <span {...(guard.isError && { style: { color: 'red' } })}>{guard.result}</span>
                        </td>
                        <td className="text-right">
                          <Glyphicon
                            glyph="remove"
                            style={{ cursor: 'pointer' }}
                            onClick={this.handleDeleteGuard(guardIndex)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ))
              }

            </Col>
            <Col sm={4}>
              <Table style={{ verticalAlign: 'top' }}>
                <thead>
                  <tr>
                    <th>Example object</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <CodeMirror
                        className="example-object"
                        value={exampleObject}
                        options={{
                          mode: {
                            name: 'javascript',
                            json: true
                          },
                          theme: "eclipse",
                          lineNumbers: true,
                          lineWrapping: true
                        }}
                        onChange={this.handleChangeObject}
                      />
                      <span style={{ color: 'red' }}>{exampleObjectError}{`\u00A0`}</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row> */}

        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle='primary'
            disabled={
              guards.some(({ isError, func }) => isError || !func)
            }
            onClick={this.handleSave}
          >
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}