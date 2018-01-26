import React, { PureComponent } from 'react';
import {
  Table,
  ButtonGroup,
  Button,
  Label,
  Glyphicon
} from 'react-bootstrap';
import statesPropTypes from './statesPropTypes';
import './StatesTable.less';

export default class StatesEditor extends PureComponent {
  static propTypes = {
    states: statesPropTypes
  }

  state = {
    states: this.props.states
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states.length < this.props.states.length) {
      this.setState({
        states: nextProps.states
      })
    }
  }

  handleDelete = name => _ => this.props.onDelete(name);

  render() {
    const { states } = this.state;

    return (
      <div className="oc-fsm-crud-editor--states-editor">
        <Table className="oc-fsm-crud-editor--table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Notes</th>
              <th className='text-right'>
                <Button
                  bsSize='sm'
                >
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              states.map(({ name, description, isInitial, isFinal }) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>
                    {
                      isInitial ?
                        (<Label bsStyle="success">Initial</Label>) :
                        isFinal ?
                          (<Label bsStyle="danger">Final</Label>) :
                          null
                    }
                  </td>
                  <td className='text-right'>
                    <ButtonGroup bsStyle='sm'>
                      <Button>
                        <Glyphicon glyph='edit'/>
                        {'\u2000'}
                        Edit
                      </Button>
                      <Button
                        onClick={this.handleDelete(name)}
                      >
                        <Glyphicon glyph='trash'/>
                        {'\u2000'}
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    )
  }
}