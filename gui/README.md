# FSM GUI

## Visual representation

As an example of not bad implemented workflow editor we suggest JIRA's workflow designer.

[jira-workflow](./img/jira-workflow-editor.png)

See **wokflow designer** chapter at official JIRA [documentation](https://confluence.atlassian.com/jira064/configuring-workflow-720412524.html)

### Existing react libraries

#### [STORM React Diagrams](https://github.com/projectstorm/react-diagrams)

* 272 stars on github; May 2016 - Jul 2017; MIT License; 
* Written in TypeScript. Author's comment below:

> Because it can transpile into any level of ECMA Script, and the library got really complicated, so I ported it to Typescript to accommodate the heavy architectural changes I was starting to make. <3 Type Script

* Has a [fork](https://github.com/woodenconsulting/react-js-diagrams) in JavaScript
* Well readable source code
* Pure documentation
* Has no tests
* Support custom node types

### Non-React based

  * http://modeling-languages.com/javascript-drawing-libraries-diagrams/
  * [d3](https://d3js.org/) - [isn't a good choice for our task](https://stackoverflow.com/questions/22226849/can-i-create-a-flow-chart-no-tree-chart-using-d3-js)
