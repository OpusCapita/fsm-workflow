import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import Pagination from 'react-bootstrap/lib/Pagination';
import superagent from 'superagent';
import { notificationError } from '../constants';

export default class History extends PureComponent {
  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    uiMessageNotifications: PropTypes.object.isRequired
  }

  state = {
    activePage: 1,
    history: [],
    states: []
  }

  componentDidMount() {
    const { uiMessageNotifications } = this.context;
    superagent.
      get('/api/states').
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

  handleSelect = page => this.setState({ activePage: page })

  render() {
    console.log(this.props)
    const { i18n } = this.context;
    const { activePage, history } = this.state;
    const max = 10;

    return (
      <Grid>
        <Row>
          <Col>
            <h1>Invoices / </h1>
            <Table style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>From</th>
                  <th>Event</th>
                  <th>To</th>
                  <th>Finished</th>
                </tr>
              </thead>
              <tbody>
                {
                  history.length ?
                    history.
                      slice((activePage - 1) * max, activePage * max).
                      map(({ businessObjId, from, to, event, finishedOn }, i) => (
                        <tr key={i}>
                          <td>{businessObjId}</td>
                          <td>{this.stateLabel(from)}</td>
                          <td>{startCase(event)}</td>
                          <td>{this.stateLabel(to)}</td>
                          <td>{i18n.formatDateTime(new Date(finishedOn))}</td>
                        </tr>
                      )) :
                    (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center' }}>
                          There's no history yet. Come on, do something!
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </Table>
            <div style={{ width: '100%', textAlign: 'right' }}>
              <Pagination
                activePage={activePage}
                onSelect={this.handleSelect}
                items={Math.ceil(history.length / max)}
                maxButtons={5}
                boundaryLinks={true}
                prev={true}
                next={true}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}
