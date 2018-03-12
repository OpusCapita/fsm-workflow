import { Machine, MachineDefinition } from '@opuscapita/fsm-workflow-core';
import history from '@opuscapita/fsm-workflow-history';
import actions from '../data/actions';
import conditions from '../data/conditions';
import { objectIdProp } from '../../common';
import schema from '../schema';
import objectConfig from '../objectConfig';

class FSM {
  init = async function(sequelize) {
    this.history = await history(sequelize)
  }

  get machine() {
    return new Machine({
      machineDefinition: new MachineDefinition({
        schema: schema.getSchema(),
        actions,
        conditions,
        objectConfiguration: objectConfig.getConfig()
      }),
      convertObjectToReference: object => ({
        businessObjType: 'invoice',
        businessObjId: object[objectIdProp]
      }),
      history: this.history
    })
  }
}

export default new FSM();
