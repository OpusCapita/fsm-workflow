export default class WorkflowDefinition {
  constructor({schema, guards, actions} = {}) {
    // todo validate input data
    this.schema = {objectStateFieldName: WorkflowDefinition.getDefaultObjectStateFieldName(), ...schema};
    this.guards = guards;
    this.actions = actions;
  }

  static getDefaultObjectStateFieldName() { return 'status' };
}
