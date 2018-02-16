import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import WorkflowEditor from '@opuscapita/fsm-workflow-editor';
import schema from '../../server/data/workflow-schema.json';
import actions from '../../server/data/actions';
import conditions from '../../server/data/conditions';
import componentsRegistry from '../customComponentsRegistry';
import { mapFuncsToParamsSchema } from './utils';

export default class Editor extends PureComponent {
  render() {
    const workflow = {
      schema,
      actions: mapFuncsToParamsSchema(actions),
      conditions: mapFuncsToParamsSchema(conditions)
    }

    return (
      <WorkflowEditor
        workflow={workflow}
        componentsRegistry={componentsRegistry}
      />
    )
  }
}