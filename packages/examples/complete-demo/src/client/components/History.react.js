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
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        objectId: PropTypes.string.isRequired
      })
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    uiMessageNotifications: PropTypes.object.isRequired,
    url: PropTypes.func.isRequired
  }

  state = {
    activePage: 1,
    history: [],
    states: []
  }

  componentDidMount() {
    this.getHistory();
    this.getStates();
  }

  getStates = _ => {
    const { uiMessageNotifications, url } = this.context;
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

  getHistory = _ => {
    const { uiMessageNotifications, url } = this.context;
    const { match: { params: { objectId } } } = this.props;
    return superagent.
      get(url(`/api/history/${objectId}`)).
      then(({ body: { history } }) => {
        this.setState(prevState => ({ history }))
      }).
      catch(err => {
        console.log(err)
        uiMessageNotifications.error({
          id: notificationError,
          message: 'Failed to get history: ' + err.message
        });
      })
  }

  stateLabel = stateName => (find(this.state.states, ({ name }) => name === stateName) || {}).description ||
    startCase(stateName);

  handleSelect = page => this.setState({ activePage: page })

  render() {
    const { i18n } = this.context;
    const { match: { params: { objectId } } } = this.props;
    const { activePage, history } = this.state;
    const max = 10;
    const pages = Math.ceil(history.length / max);

    return (
      <Grid>
        <Row>
          <Col>
            <h1>
              <a
                style={{ cursor: 'pointer' }}
                onClick={_ => this.props.history.push('/')}
              >
                Invoices
              </a>
              <small> / {objectId} history</small>
            </h1>
            <Table style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th>On</th>
                  <th>From</th>
                  <th>To</th>
                  <th>User</th>
                  <th>Finished On</th>
                </tr>
              </thead>
              <tbody>
                {
                  history.length ?
                    history.
                      slice((activePage - 1) * max, activePage * max).
                      map(({ from, to, event, finishedOn, user }, i) => (
                        <tr key={i}>
                          <td>{startCase(event)}</td>
                          <td>{this.stateLabel(from)}</td>
                          <td>{this.stateLabel(to)}</td>
                          <td>{user}</td>
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
            {
              pages > 1 && (
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
              )
            }

          </Col>
        </Row>
      </Grid>
    )
  }
}
