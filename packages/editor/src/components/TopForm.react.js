import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export default function TopForm({ name, onNameChange }, { i18n }) {
  return (
    <Form horizontal={true}>
      <FormGroup controlId="fsmName">
        <Col componentClass={ControlLabel} sm={1}>
          {i18n.getMessage('fsmWorkflowEditor.ui.common.workflowName.label')}
        </Col>
        <Col sm={11}>
          <FormControl
            type="text"
            placeholder={i18n.getMessage('fsmWorkflowEditor.ui.common.workflowName.placeholder')}
            value={name}
            onChange={onNameChange}
          />
        </Col>
      </FormGroup>
    </Form>
  )
}

TopForm.propTypes = {
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired
}

TopForm.contextTypes = {
  i18n: PropTypes.object.isRequired
}
