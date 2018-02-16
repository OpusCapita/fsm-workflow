import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nManager } from '@opuscapita/i18n';
import WorkflowEditor from '@opuscapita/fsm-workflow-editor';
import { mapFuncsToParamsSchema } from './utils';
import schema from './demo-data/workflow-schema.json';
import actions from './demo-data/actions';
import conditions from './demo-data/conditions';
import componentsRegistry from './demo-data/components';
import { Grid, Row, Col } from 'react-bootstrap';

export default class App extends PureComponent {
  static childContextTypes = {
    i18n: PropTypes.object.isRequired
  }

  i18n = new I18nManager();
  getChildContext() {
    return {
      i18n: this.i18n
    }
  }

  render() {
    const workflow = {
      schema,
      actions: mapFuncsToParamsSchema(actions),
      conditions: mapFuncsToParamsSchema(conditions)
    }

    return (
      <div>
        <h1>Hi there</h1>
        <WorkflowEditor
          workflow={workflow}
          componentsRegistry={componentsRegistry}
        />
        <Grid>
          <Row>
            <Col>jdhasfldsl</Col>
          </Row>
        </Grid>
      </div>
    )
  }
}