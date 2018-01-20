import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Glyphicon,
  FormControl
} from 'react-bootstrap';
import Select from '@opuscapita/react-select';
import { getExistingStates, state2rs, rs2state } from './utils';

export default class TransitionsTable extends PureComponent {
  static propTypes = {
    transitions: PropTypes.arrayOf(PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string
    })),
    onCreate: PropTypes.func.isRequired,
    onEditTransition: PropTypes.func.isRequired,
    onDeleteTransition: PropTypes.func.isRequired
  }

  handleChangeSelect = ({ field, index }) => value => this.props.onEditTransition({
    field,
    value: value && rs2state(value),
    index
  })

  handleChangeEvent = index => ({ target: { value } }) => this.props.onEditTransition({
    field: 'event',
    value,
    index
  })

  handleDelete = index => _ => this.props.onDeleteTransition(index)

  render() {
    const { transitions } = this.props;

    const states = getExistingStates(transitions);

    const rows = transitions.map(({ from, to, event }, index) => (
      <tr key={index}>
        <td>{index}</td>
        <td>
          <FormControl
            type="text"
            placeholder="Name of event"
            value={event || ''}
            onChange={this.handleChangeEvent(index)}
            style={{ position: 'relative', top: '2px' }}
          />
        </td>
        <td>
          <Select.Creatable
            options={states.map(state2rs)}
            multi={false}
            onChange={this.handleChangeSelect({ field: 'from', index })}
            value={from && state2rs(from)}
            placeholder="Specify 'from' state"
          />
        </td>
        <td>
          <Select.Creatable
            options={states.filter(state => state !== from).map(state2rs)}
            multi={false}
            onChange={this.handleChangeSelect({ field: 'to', index })}
            value={to && to !== from && state2rs(to)}
            placeholder="Specify 'to' state"
          />
        </td>
        <td className='text-right'>
          <Glyphicon
            glyph='remove'
            style={{ cursor: 'pointer' }}
            onClick={this.handleDelete(index)}
          />
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
        <Table style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th>Event</th>
              <th>From</th>
              <th>To</th>
              <th style={{ width: '5%' }}></th>
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
