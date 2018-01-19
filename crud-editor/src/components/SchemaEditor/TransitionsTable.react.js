import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  ButtonGroup,
  Glyphicon
} from 'react-bootstrap';

export default class TransitionsTable extends PureComponent {
  render() {
    const { transitions } = this.props;

    // const states =

    const rows = transitions.map(({ from, to, event }, index) => (
      <tr key={index}>
        <td>{index}</td>
        <td>{event}</td>
        <td>{from}</td>
        <td>{to}</td>
        <td className='text-right'>
        {/* <ButtonGroup bsSize='sm'>
          <Button>
            <Glyphicon glyph='edit' />
            {`\u2000Edit`}
          </Button>
          <Button>
            <Glyphicon glyph='trash' />
            {`\u2000Delete`}
          </Button>
        </ButtonGroup> */}
        </td>
      </tr>
    ))

    return (
      <div>
        <h2>
          Transitions
          <Button
            bsSize='sm'
            bsStyle="primary"
            style={{ float: 'right', marginTop: '8px' }}
            onClick={this.props.onCreate}
          >
            Create
          </Button>
        </h2>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Event</th>
              <th>From</th>
              <th>To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    )
  }
}