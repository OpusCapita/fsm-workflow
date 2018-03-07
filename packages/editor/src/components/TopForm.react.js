import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export default class TopForm extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired
  }

  render() {
    const { name } = this.props;

    return (
      <Form horizontal={true}>
        <FormGroup controlId="fsmName">
          <Col componentClass={ControlLabel} sm={1}>
            Name
          </Col>
          <Col sm={11}>
            <FormControl
              type="text"
              placeholder="Name of your schema"
              value={name}
              onChange={this.props.onNameChange}
            />
          </Col>
        </FormGroup>
      </Form>
    )
  }
}
