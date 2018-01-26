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
import { isDef } from '../utils';
import Guards from '../Guards';
import EditTransition from './EditTransition.react';

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
    states: PropTypes.arrayOf(PropTypes.string),
    onCreate: PropTypes.func.isRequired,
    onEditTransition: PropTypes.func.isRequired,
    onDeleteTransition: PropTypes.func.isRequired,
    onSaveGuards: PropTypes.func.isRequired,
    exampleObject: PropTypes.object
  }

  state = {
    showModal: false,
    modalType: null,
    currentTransition: null
  }

  handleDelete = index => _ => this.props.onDeleteTransition(index)

  handleModal = index => type => _ => this.setState({
    showModal: true,
    modalType: type,
    currentTransition: index
  })

  handleCloseModal = _ => this.setState({
    showModal: false,
    modalType: null,
    currentTransition: null
  })

  handleSaveGuards = index => guards => {
    this.handleCloseModal();
    this.props.onSaveGuards(index)(guards);
  }

  handleSaveTransition = (...args) => {
    this.handleCloseModal();
    this.props.onEditTransition(...args)
  }

  render() {
    const { transitions, states } = this.props;

    const rows = transitions.map(({ from, to, event }, index) => (
      <tr key={index}>
        <td>
          {event}
        </td>
        <td>
          {from}
        </td>
        <td>
          {to}
        </td>
        <td className='text-right'>
          <ButtonGroup bsSize="sm">
            <Button
              onClick={this.handleModal(index)('edit')}
            >
              Edit
            </Button>
            <Button
              onClick={this.handleModal(index)('guard')}
              disabled={!(from && to && event)}
            >
              Guard
            </Button>
            <Button
              disabled={true}
            >
              Actions
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

    const { showModal, currentTransition, modalType } = this.state;

    let modal;

    if (showModal) {
      let transition;

      if (isDef(currentTransition)) {
        transition = transitions[currentTransition];
      }

      modal = modalType === 'guard' ?
        (
          <Guards
            transition={transition}
            onClose={this.handleCloseModal}
            onSave={this.handleSaveGuards(currentTransition)}
            exampleObject={this.props.exampleObject}
          />
        ) :
        (
          <EditTransition
            transition={transition}
            states={states}
            onSave={this.handleSaveTransition}
            onClose={this.handleCloseModal}
            index={currentTransition}
          />
        )

    }

    return (
      <div>
        <Table className="oc-fsm-crud-editor--table">
          <thead>
            <tr>
              <th>Event</th>
              <th>From</th>
              <th>To</th>
              <th className="text-right">
                <Button
                  bsSize='sm'
                  onClick={this.handleModal()('edit')}
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
