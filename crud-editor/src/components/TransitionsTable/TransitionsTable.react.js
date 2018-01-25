import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Glyphicon,
  FormControl,
  ButtonGroup
} from 'react-bootstrap';
import Select from '@opuscapita/react-select';
import { getExistingStates, state2rs, rs2state } from '../utils';
import Guards from '../Guards';

export default class TransitionsTable extends PureComponent {
  static propTypes = {
    transitions: PropTypes.arrayOf(PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string,
      guards: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        body: PropTypes.string
      }))
    })),
    onCreate: PropTypes.func.isRequired,
    onEditTransition: PropTypes.func.isRequired,
    onDeleteTransition: PropTypes.func.isRequired,
    onSaveGuards: PropTypes.func.isRequired,
    exampleObject: PropTypes.object
  }

  state = {
    showModal: false,
    currentTransition: null
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

  handleModal = index => _ => this.setState({
    showModal: true,
    currentTransition: index
  })

  handleCloseModal = _ => this.setState({
    showModal: false,
    currentTransition: null
  })

  handleSaveGuards = index => guards => {
    this.handleCloseModal();
    this.props.onSaveGuards(index)(guards);
  }

  render() {
    const { transitions } = this.props;

    const states = getExistingStates(transitions);

    const rows = transitions.map(({ from, to, event }, index) => (
      <tr key={index}>
        <td>
          <FormControl
            type="text"
            placeholder="Name of event"
            value={event || ''}
            onChange={this.handleChangeEvent(index)}
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
          <ButtonGroup bsSize="sm">
            <Button
              onClick={this.handleModal(index)}
              disabled={!(from && to && event)}
            >
              Guards
            </Button>
            <Button
              onClick={this.handleDelete(index)}
            >
              <Glyphicon glyph='trash'/>
              {'\u2000'}
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ))

    const { showModal, currentTransition } = this.state;

    let modal;

    if (showModal) {
      const transition = transitions[currentTransition];

      modal = (
        <Guards
          transition={transition}
          onClose={this.handleCloseModal}
          onSaveGuards={this.handleSaveGuards(currentTransition)}
          exampleObject={this.props.exampleObject}
        />
      )
    }

    return (
      <div>
        <h2>Transitions</h2>

        <Table className="oc-fsm-workflow-crud-editor-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>From</th>
              <th>To</th>
              <th className="text-right">
                <Button
                  bsSize='sm'
                  onClick={this.props.onCreate}
                >
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>

        {modal}
      </div>
    )
  }
}
