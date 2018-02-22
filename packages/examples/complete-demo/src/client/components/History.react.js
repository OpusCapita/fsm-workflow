import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import Table from 'react-bootstrap/lib/Table';
import Pagination from 'react-bootstrap/lib/Pagination';

export default class History extends PureComponent {
  static propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
    stateLabel: PropTypes.func.isRequired
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  state = {
    activePage: 1
  }

  handleSelect = page => this.setState({ activePage: page })

  render() {
    const { i18n } = this.context;
    const { history = [], stateLabel } = this.props;
    const { activePage } = this.state;
    const max = 10;

    return (
      <div>
        <h2>Workflow History</h2>
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
                      <td>{stateLabel(from)}</td>
                      <td>{startCase(event)}</td>
                      <td>{stateLabel(to)}</td>
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
      </div>
    )
  }
}
