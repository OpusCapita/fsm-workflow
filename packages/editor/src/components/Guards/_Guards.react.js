import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import CodeEditor from '../CodeEditor';
import './Guards.less';
import withConfirmDialog from '../ConfirmDialog';
import ErrorLabel from '../ErrorLabel.react';
import guardPropTypes from './guardPropTypes';
import ExampleObjectInspector from './ExampleObjectInspector.react';
import { formatLabel } from '../utils';

const evaluateCode = ({ code, arg }) => {
  try {
    const result = (
      eval( // eslint-disable-line no-eval
        `
          (function(arg) {
            ${Object.keys(arg).map(key => `var ${key} = arg[${JSON.stringify(key)}];`).join('\n')}
            return (${code})
          })
        `
      )(arg)
    );

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

@withConfirmDialog
export default class Guards extends PureComponent {
  static propTypes = {
    guards: PropTypes.arrayOf(guardPropTypes),
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    objectConfig: PropTypes.object.isRequired
  }

  static defaultProps = {
    exampleObject: {
      id: 'exampleId',
      enabled: true,
      total: 1000
    }
  }

  state = {
    guards: this.props.guards || [],
    exampleObject: JSON.stringify(this.props.objectConfig.example, null, 2),
    autoplay: true,
    guardEditorSelectorPos: {
      line: 0,
      ch: 0
    },
    lastActiveGuardIndex: 0
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
          expression: value
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
        expression: ''
      }
    ]
  }))

  handleToggleAutoplay = _ => this.setState(prevState => ({
    autoplay: !prevState.autoplay
  }), this.autoPlayAll)

  handleEvalCode = index => _ => {
    const { objectAlias } = this.props.objectConfig;
    const { expression: code } = this.state.guards[index];

    const object = JSON.parse(this.state.exampleObject);

    const result = code ?
      evaluateCode({
        code,
        arg: {
          object,
          ...(objectAlias && { [objectAlias]: object })
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

  autoPlayAll = _ => this.state.autoplay && this.state.guards.forEach((_, i) => this.handleEvalCode(i)())

  handleChangeObject = value => {
    try {
      JSON.parse(value);

      this.setState(prevState => ({
        exampleObject: value,
        exampleObjectError: null
      }), this.autoPlayAll)
    } catch (err) {
      this.setState({
        exampleObject: value,
        exampleObjectError: err.message
      })
    }
  }

  handleSave = _ => this.props.onSave(
    this.state.guards.
      map(({ expression }) => expression.trim()).
      filter(Boolean).
      map(expression => ({ expression }))
  )


  handleCleanGuardBody = guardIndex => _ => this.setState(prevState => ({
    guards: prevState.guards.map(
      ({ expression, ...rest }, i) => ({ ...rest, expression: i === guardIndex ? '' : expression })
    )
  }), _ => {
    if (this.state.autoplay) {
      this.handleEvalCode(guardIndex)()
    }

    this._editors[guardIndex].getCodeMirror().focus();
  })

  hasUnsavedChanges = _ => {
    const initialGuards = this.props.guards;

    const currentGuards = this.state.guards.map(({ expression }) => ({ expression }));

    return initialGuards && initialGuards.length > 0 ?
      !isEqual(initialGuards, currentGuards) :
      currentGuards[0]
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  handleCursorActivity = guardIndex => cm => this.setState({
    lastActiveGuardIndex: guardIndex,
    guardEditorSelectorPos: cm.doc.sel.ranges[0].anchor
  })

  handleObjectPropClick = ({ path }) => {
    const { objectAlias } = this.props.objectConfig;
    const {
      guardEditorSelectorPos: {
        line,
        ch
      },
      lastActiveGuardIndex,
      guards
    } = this.state;

    const workablePath = path.split('.').slice(1).map(s => `[${JSON.stringify(s)}]`).join('');
    const injectedValue = `${objectAlias || 'object'}${workablePath}`

    const { expression } = guards[lastActiveGuardIndex];
    const newGuardBody = (expression || '').split('\n').map(
      (bodyLine, index) => index === line ?
        bodyLine.slice(0, ch) + injectedValue + bodyLine.slice(ch) :
        bodyLine
    ).join('\n');

    this.handleChange(lastActiveGuardIndex)(newGuardBody)

    // handle codemirror focus and cursor position
    const ref = this._editors[lastActiveGuardIndex];
    const cm = ref.getCodeMirror();
    // focus resets cursor to 0; fix it
    cm.focus();
    setTimeout( // eslint-disable-line no-undef
      _ => cm.setCursor(line, ch + injectedValue.length
      ), 10
    );
  }

  _editors = [];
  saveRef = guardIndex => el => this._editors[guardIndex] = el; // eslint-disable-line no-return-assign

  render() {
    const {
      title,
      objectConfig: {
        objectAlias
      }
    } = this.props;

    const {
      guards,
      exampleObject,
      exampleObjectError,
      autoplay
    } = this.state;

    // exampleObjectError is legacy; will be needed if we implement object editing again
    const object = exampleObjectError ? {} : JSON.parse(exampleObject);

    return (
      <Modal
        show={true}
        onHide={this.handleClose}
        dialogClassName="oc-fsm-crud-editor--modal"
        backdrop='static'
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            {title}
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
                        <div>
                          <CodeEditor
                            className="guard-code"
                            value={guard.expression}
                            options={{
                              mode: "javascript",
                              lineNumbers: true,
                              theme: "eclipse",
                              placeholder: `Enter JavaScript code here`
                            }}
                            onChange={this.handleChange(guardIndex)}
                            onCursorActivity={this.handleCursorActivity(guardIndex)}
                            ref={this.saveRef(guardIndex)}
                          />
                        </div>
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
                        <ErrorLabel {...(guard.isError && { error: guard.result })}/>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ margin: '0 10px 0' }}>
                        <div className="oc-fsm-crud-editor--modal-heading">
                          <div className="output-heading">
                            <b>Results</b>
                            <div className='right-block'>
                              <div>
                                <Glyphicon
                                  glyph='play'
                                  style={{
                                    ...(autoplay ? { color: '#ddd' } : { cursor: 'pointer' })
                                  }}
                                  {...(!autoplay && { onClick: this.handleEvalCode(guardIndex) })}
                                />
                              </div>
                              <Checkbox
                                onChange={this.handleToggleAutoplay}
                                checked={!!autoplay}
                              >
                                Autoplay
                              </Checkbox>
                            </div>
                          </div>
                        </div>
                        <CodeEditor
                          className="output-code"
                          value={(!guard.isError && guard.result) || ''}
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
                    <div>
                      <ExampleObjectInspector
                        name={formatLabel(objectAlias || 'object')}
                        object={object}
                        onClickPropName={this.handleObjectPropClick}
                      />
                    </div>
                    <span style={{ color: 'red' }}>{exampleObjectError}{`\u00A0`}</span>
                    <HelpBlock>
                      Click on a property to insert its reference into JavaScript Expression editor.
                    </HelpBlock>
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
              guards.some(({ isError, expression }) => isError && expression)
            }
            onClick={this.handleSave}
          >
            Ok
          </Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
