import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import startCase from 'lodash/startCase';
import find from 'lodash/find';
import { objectIdProp, eventsProp } from '../../common';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Table from 'react-bootstrap/lib/Table';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { notificationError } from '../constants';
import { url } from '../utils';

export default class HomePage extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  static contextTypes = {
    uiMessageNotifications: PropTypes.object.isRequired
  }

  state = {
    businessObjects: null,
    loading: {}
  }

  componentDidMount() {
    const { uiMessageNotifications } = this.context;

    superagent.
      get(url('/api/objects')).
      accept('application/json').
      then(res => {
        this.setState(prevState => ({ businessObjects: res.body }))
      }).
      catch(err => {
        console.log(err)
        uiMessageNotifications.error({
          id: notificationError,
          message: 'Failed to load invoices: ' + err.message
        });
      })

    superagent.
      get(url('/api/states')).
      accept('application/json').
      then(res => {
        this.setState(prevState => ({ states: res.body.states }))
      }).
      catch(err => {
        console.log(err)
        uiMessageNotifications.error({
          id: notificationError,
          message: 'Failed to load states: ' + err.message
        });
      })
  }

  stateLabel = stateName => (find(this.state.states, ({ name }) => name === stateName) || {}).description ||
    startCase(stateName);

  sendEvent = ({ objectId, event }) => _ => {
    const { uiMessageNotifications } = this.context;
    this.setState(prevState => ({ loading: { ...prevState.loading, [objectId]: true } }));
    return event &&
      superagent.
        post(url('/api/event')).
        send({ objectId, event }).
        then(response => {
          const { object } = response.body;
          return this.getAvailableTransitions(object).
            then(data => {
              this.setState(prevState => ({
                businessObjects: prevState.businessObjects.map(
                  stateObj => stateObj[objectIdProp] === object[objectIdProp] ?
                    ({
                      ...object,
                      [eventsProp]: data.transitions.map(({ event }) => event)
                    }) :
                    stateObj
                ),
                loading: {
                  ...prevState.loading,
                  [objectId]: false
                }
              }))
            })
        }).
        catch(err => {
          console.log(err);
          uiMessageNotifications.error({
            id: notificationError,
            message: 'Failed to send event: ' + err.message
          });
        })
  }

  getAvailableTransitions = object => {
    const { uiMessageNotifications } = this.context;
    return superagent.
      post(url('/api/transitions')).
      send({ objectId: object[objectIdProp] }).
      then(({ body }) => body).
      catch(err => {
        console.log(err)
        uiMessageNotifications.error({
          id: notificationError,
          message: 'Failed to get available transitions: ' + err.message
        });
      })
  }

  handleHistory = objectId => _ => this.props.history.push(`/invoice/${objectId}`);

  render() {
    const { businessObjects, loading } = this.state;
    return (
      <Grid>
        <Row>
          <Col>
            <h1>Invoices</h1>
            <Table style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Current Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  businessObjects ?
                    businessObjects.map((object, index) => (
                      <tr key={object[objectIdProp]}>
                        <td>{object[objectIdProp]}</td>
                        <td>{this.stateLabel(object.status)}</td>
                        <td className="text-right">
                          {
                            loading[object[objectIdProp]] &&
                            (
                              <span style={{ marginRight: '10px' }}>
                                <i className="fa fa-spinner fa-spin"></i>
                              </span>
                            )
                          }
                          <ButtonGroup>
                            {
                              object[eventsProp] &&
                              (
                                object[eventsProp].length === 1 ?
                                  (
                                    <Button
                                      onClick={this.sendEvent({
                                        objectId: object[objectIdProp],
                                        event: object[eventsProp][0]
                                      })}
                                      bsSize='sm'
                                    >
                                      {startCase(object[eventsProp][0])}
                                    </Button>
                                  ) :
                                  (
                                    <SplitButton
                                      bsSize='sm'
                                      title={startCase(object[eventsProp][0])}
                                      id={`split-button-basic-${index}`}
                                      onClick={this.sendEvent({
                                        objectId: object[objectIdProp],
                                        event: object[eventsProp][0]
                                      })}
                                      pullRight={true}
                                    >
                                      {
                                        object[eventsProp].slice(1).map((event, i) => (
                                          <MenuItem
                                            bsSize='sm'
                                            key={event}
                                            eventKey={event}
                                            onClick={this.sendEvent({ objectId: object[objectIdProp], event })}
                                          >
                                            {startCase(event)}
                                          </MenuItem>
                                        ))
                                      }
                                    </SplitButton>
                                  )
                              )
                            }
                            <Button
                              bsSize='sm'
                              onClick={this.handleHistory(object[objectIdProp])}
                            >
                              History
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    )) :
                    (
                      <tr><td colSpan={4}>No business objects found</td></tr>
                    )
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    )
  }
}
