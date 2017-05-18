export default class WorkflowDefinitionProvider {
  constructor() {
    this.definitions = {};
  }
  register({definition, guards, actions}) {
    this.definitions[schema.name] = new WorkflowDefinition({ schema, guards, actions });
  }
}
