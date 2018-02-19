import React, { PureComponent } from 'react';
import superagent from 'superagent';
import startCase from 'lodash/startCase';
import { objectIdProp, eventsProp } from '../../common';
import {
  Grid,
  Row,
  Col,
  Table,
  SplitButton,
  MenuItem,
  Button
} from 'react-bootstrap'; // TODO lib imports

export default class HomePage extends PureComponent {
  state = {
    businessObjects: null
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
  }

  sendEvent = ({ objectId, event }) => _ => {
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
                )
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
    const { businessObjects } = this.state;

    return (
      <Grid>
        <Row>
          <Col>
            <h1>Business Objects</h1>
            <Table style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice No</th>
                  <th>Current Status</th>
                  <th>Available Events</th>
                </tr>
              </thead>
              <tbody>
                {
                  businessObjects ?
                    businessObjects.map((object, index) => (
                      <tr key={object[objectIdProp]}>
                        <td>{index}</td>
                        <td>{object[objectIdProp]}</td>
                        <td>{object.status}</td>
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
