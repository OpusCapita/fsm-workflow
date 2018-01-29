import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Checkbox,
  Row,
  Col,
  Glyphicon
} from 'react-bootstrap';
import CodeEditor from '../CodeEditor';
import { uidFor } from '../utils';
import './Guards.less';

const evaluateCode = ({ code, arg }) => {
  try {
    const result = (({ object }) => eval(code))(arg); // eslint-disable-line no-eval
    return typeof result === 'boolean' ?
      String(result) :
      new Error(
        `Function returned:
        ${String(result)} of type '${typeof result}',
        but expected a boolean value.`
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
        body: PropTypes.string // to be eval'd
      }))
    }).isRequired,
    getStateLabel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    exampleObject: PropTypes.object,
    onSave: PropTypes.func.isRequired
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

  componentDidMount() {
    if (this.state.guards.length === 0) {
      this.handleAddNewGuard()
    }

    if (this.state.autoplay) {
      this.state.guards.forEach((_, i) => this.handleEvalCode(i)())
    }
  }

  handleChange = index => value => this.setState(prevState => ({
    guards: prevState.guards.map(
      (guard, i) => i === index ?
        {
          ...guard,
          body: value
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
        name: uidFor('guard'),
        body: ''
      }
    ]
  }))

  handleToggleAutoplay = _ => this.setState(prevState => ({
    autoplay: !prevState.autoplay
  }))

  handleEvalCode = index => _ => {
    const { body: code } = this.state.guards[index];

    const object = JSON.parse(this.state.exampleObject);

    const result = code ?
      evaluateCode({
        code,
        arg: {
          object
        }
      }) :
      null;

    const isError = result instanceof Error;

    return this.setState(prevState => ({
      guards: prevState.guards.map(
        (guard, i) => i === index ?
          {
            ...guard,
            isError,
            result: isError ? result.message : result
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
        exampleObject: value,
        exampleObjectError: err.message
      })
    }
  }

  handleSave = _ => this.props.onSave(
    this.state.guards.
      map(({ name, body }) => ({ name, body: body.trim() })).
      filter(({ body }) => body)
  )

  handleCleanGuardBody = guardIndex => _ => this.setState(prevState => ({
    guards: prevState.guards.map(
      ({ body, ...rest }, i) => ({ ...rest, body: i === guardIndex ? '' : body })
    )
  }), (this.state.autoplay && this.handleEvalCode(guardIndex)))

  render() {
    const {
      transition: {
        from,
        to,
        event
      },
      onClose,
      getStateLabel
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
        dialogClassName="oc-fsm-crud-editor--modal"
        backdrop='static'
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            {`Guards for transition on "${event}" from "${getStateLabel(from)}" to "${getStateLabel(to)}"`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            (guards.length > 0 ? guards : [{}]).map((guard, guardIndex, arr) => (
              <div key={guardIndex}>
                <Row>
                  <Col sm={8}>
                    <Row>
                      <Col style={{ margin: '0 10px 0' }}>
                        <div className="oc-fsm-crud-editor--modal-heading with-padding">
                          <b>JavaScript Expression</b>
                        </div>
                        <CodeEditor
                          className="guard-code"
                          value={guard.body}
                          options={{
                            mode: "javascript",
                            lineNumbers: true,
                            theme: "eclipse",
                            placeholder: `Enter JavaScript code here`
                          }}
                          onChange={this.handleChange(guardIndex)}
                        />
                        <Glyphicon
                          glyph='remove'
                          style={{
                            position: 'absolute',
                            right: '22px',
                            top: '50px',
                            cursor: 'pointer',
                            zIndex: '2'
                          }}
                          onClick={this.handleCleanGuardBody(guardIndex)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ margin: '0 10px 0' }}>
                        <div className="oc-fsm-crud-editor--modal-heading">
                          <div className="output-heading">
                            <b>Output</b>
                            <Checkbox
                              onChange={this.handleToggleAutoplay}
                              checked={!!autoplay}
                            >
                              Autoplay
                            </Checkbox>
                          </div>
                        </div>
                        <CodeEditor
                          className="output-code"
                          value={guard.result || ''}
                          options={{
                            theme: "eclipse",
                            lineWrapping: true,
                            readOnly: 'nocursor'
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4} >
                    <div className="oc-fsm-crud-editor--modal-heading with-padding">
                      <b>Example object</b>
                    </div>
                    <CodeEditor
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
                  </Col>
                </Row>
              </div>
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle='primary'
            disabled={
              guards.some(({ isError, body }) => isError && body)
            }
            onClick={this.handleSave}
          >
            Ok
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
