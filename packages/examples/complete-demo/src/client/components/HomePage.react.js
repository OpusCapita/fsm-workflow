import React, { PureComponent } from 'react';
import superagent from 'superagent';
import startCase from 'lodash/startCase';
import find from 'lodash/find';
import { objectIdProp, eventsProp } from '../../common';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export default class HomePage extends PureComponent {
  state = {
    businessObjects: null,
    loading: {}
  }

  componentDidMount() {
    const self = this;

    superagent.
      get('/objects').
      accept('application/json').
      then(res => {
        self.setState(prevState => ({ businessObjects: res.body }))
      }).
      catch(err => {
        console.log('Failed to load objects')
        throw err
      })

    superagent.
      get('/states').
      accept('application/json').
      then(res => {
        self.setState(prevState => ({ states: res.body.states }))
      }).
      catch(err => {
        console.log('Failed to load states')
        throw err
      })
  }

  stateLabel = stateName => (find(this.state.states, ({ name }) => name === stateName) || {}).description ||
    startCase(stateName);

  sendEvent = ({ objectId, event }) => _ => {
    this.setState(prevState => ({ loading: { ...prevState.loading, [objectId]: true } }));
    const self = this;
    return event &&
      superagent.
        post('/event').
        send({ objectId, event }).
        then(response => {
          const { object } = response.body;
          return this.getAvailableTransitions(object).
            then(data => {
              self.setState(prevState => ({
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
          console.log('err sending event', err);
          throw err
        })
  }

  getAvailableTransitions = object => {
    return superagent.
      post('/transitions').
      send({ objectId: object[objectIdProp] }).
      then(({ body }) => body).
      catch(err => {
        console.log('failed to get transitions')
        console.log(err)
        throw err
      })
  }

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
                  <th style={{ width: '50px' }}>#</th>
                  <th>Invoice No</th>
                  <th>Current Status</th>
                  <th>Available Events</th>
                  <th style={{ width: '30px' }}></th>
                </tr>
              </thead>
              <tbody>
                {
                  businessObjects ?
                    businessObjects.map((object, index) => (
                      <tr key={object[objectIdProp]}>
                        <td>{index}</td>
                        <td>{object[objectIdProp]}</td>
                        <td>{this.stateLabel(object.status)}</td>
                        <td>
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
                                  >
                                    {startCase(object[eventsProp][0])}
                                  </Button>
                                ) :
                                (
                                  <SplitButton
                                    title={startCase(object[eventsProp][0])}
                                    id={`split-button-basic-${index}`}
                                    onClick={this.sendEvent({
                                      objectId: object[objectIdProp],
                                      event: object[eventsProp][0]
                                    })}
                                  >
                                    {
                                      object[eventsProp].slice(1).map((event, i) => (
                                        <MenuItem
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
                        </td>
                        <td>
                          {
                            loading[object[objectIdProp]] &&
                            (<i className="fa fa-spinner"></i>)
                          }
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
