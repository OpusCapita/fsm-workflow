import { Machine, MachineDefinition } from '@opuscapita/fsm-workflow-core';
import actions from './data/actions';
import conditions from './data/conditions';
import { objectIdProp } from '../common';

export default ({ schema }) => {
  return new Machine({
    machineDefinition: new MachineDefinition({
      schema,
      actions,
      conditions
    }),
    convertObjectToReference: object => ({
      businessObjectType: 'invoice',
      businessObjectId: object[objectIdProp]
    })
  })
}
