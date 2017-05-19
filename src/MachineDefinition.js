export default class MachineDefinition {
  constructor({schema, guards, actions} = {}) {
    // todo validate input data
    // console.log(`schema '${JSON.stringify(schema)}'`);
    this.schema = {
      objectStateFieldName: MachineDefinition.getDefaultObjectStateFieldName(),
      ...schema
    };
    this.guards = guards || [];
    this.actions = actions || [];
  }

  static getDefaultObjectStateFieldName() { return 'status' };
}
