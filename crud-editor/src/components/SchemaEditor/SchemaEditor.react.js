import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Select from '@opuscapita/react-select';
import initialSchema from './initialSchema';
import TopForm from './TopForm.react';
import TransitionsTable from './TransitionsTable.react';

export default class SchemaEditor extends PureComponent {
  state = {
    schema: initialSchema
  }

  setSchemaValue = schemaSetterFunc => this.setState(schemaSetterFunc)

  handleNameChange = ({ target: { value: name } }) => this.setSchemaValue(prevState => ({
    schema: {
      ...prevState.schema,
      name
    }
  }))

  handleInitialStateChange = initialState => this.setSchemaValue(prevState => ({
    schema: {
      ...prevState.schema,
      initialState
    }
  }))

  handleFinalStatesChange = finalStates => this.setSchemaValue(prevState => ({
    schema: {
      ...prevState.schema,
      finalStates
    }
  }))

  handleCreate = _ => this.setSchemaValue(prevState => ({
    schema: {
      ...prevState.schema,
      transitions: [
        ...prevState.schema.transitions,
        {
          event: null,
          from: null,
          to: null
        }
      ]
    }
  }))

  render() {
    const { schema } = this.state;

    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2} sm={12}>
            <TopForm
              schema={schema}
              onNameChange={this.handleNameChange}
              onInitialStateChange={this.handleInitialStateChange}
              onFinalStatesChange={this.handleFinalStatesChange}
            />

            <TransitionsTable
              transitions={schema.transitions}
              onCreate={this.handleCreate}
            />

            <h2>Updated schema</h2>
            <pre>{JSON.stringify(schema, null, 1)}</pre>
          </Col>
        </Row>
      </Grid>
    )
  }
}