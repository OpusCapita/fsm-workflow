var chalk = require("chalk");
var clear = require("clear");
var CLI = require("clui");
var figlet = require("figlet");
var inquirer = require("inquirer");
var Preferences = require("preferences");
var Spinner = CLI.Spinner;
var lodash = require("lodash");
var fs = require("fs");
var files = require('./lib/files');

var createForm = require('./index-form').default;

var MachineDefinition = require('../../src/MachineDefinition').default;
var Machine = require('../../src/Machine').default;

// var fsmSchema = require('./fsm-schema.json');
var machineSchemaAsText = fs.readFileSync('./machine-schema.json', 'utf8')

var machineDefinition = new MachineDefinition({
  schema: JSON.parse(machineSchemaAsText)
});

var invoiceMachine = new Machine({machineDefinition});

var invoice = {
  status: 'none'
};

clear();
// console.log(
//   chalk.yellow(
//     figlet.textSync('Invoice machine', { horizontalLayout: 'full' })
//   )
// );

var blessed = require('blessed');
var program = blessed.program()

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

// title box
var titleBox = blessed.box({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: ' Invoice machine',
  border: {
    type: 'line'
  }
});

// let availableEvents = [];

const appendToOutput = (text) => {
  let content = output.getContent();
  content = text + '\n' + content.trim();
  output.setContent(content);
  screen.render();
}

const handleFormSubmit = ({event}) => {
  // console.log('opa');
  appendToOutput(`Sending event '${event} ...'\n`);
  invoiceMachine.sendEvent({
    object: invoice,
    event,
  }).then(({object}) => {
    appendToOutput("invoice machine has been started...");
    invoice = object;
    objectBox.setContent(JSON.stringify(invoice, null, '\t'))
    screen.render();
    appendToOutput("finding events that are available...");
    return invoiceMachine.availableTransitions({
      object: invoice
    })
  }).then(({transitions}  ) => {
    const availableEvents = transitions.map((transition) => {
      return transition.event
    });
    appendToOutput(`available events '${availableEvents}'`);
    recreateForm({availableEvents});
    screen.render();
  }).catch(({message}) => {
    appendToOutput(`error '${message}'`);
    formBox.focus();
    screen.render();
  });
}

const recreateForm = ({availableEvents}) => {
  return createForm({
    screen,
    availableEvents,
    formProperties: {
      parent: screen,
      left: 0,
      top: 3,
      width: '50%-1',
      height: '50%-3',
      border: 'line'
    },
    onSubmit: handleFormSubmit
  });
};

var formBox = recreateForm({availableEvents: []})

var output = blessed.scrollabletext({
  parent: screen,
  mouse: true,
  keys: true,
  left: 0,
  top: '50%',
  width: '50%-1',
  height: '50%',
  border: 'line',
  content: ""
});

var objectBox = blessed.box({
  parent: screen,
  left: '50%+1',
  top: 3,
  width: '50%-1',
  height: '30%-3',
  border: 'line',
  content: JSON.stringify(invoice, null, '\t')
});

var fsmSchemaBox = blessed.box({
  parent: screen,
  left: '50%+1',
  top: '30%',
  width: '50%-1',
  height: '70%',
  border: 'line',
  keys: true,
  vi: true,
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    bg: 'blue'
  },
  scrollbar: {
    ch: ' ',
    inverse: true
  },
  content: machineSchemaAsText
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
formBox.focus();

// Render the screen.
screen.render();

appendToOutput("starting invoice machine...")
invoiceMachine.start({
  object: invoice
}).then(({object}) => {
  appendToOutput("invoice machine has been started...");
  invoice = object;
  objectBox.setContent(JSON.stringify(invoice, null, '\t'))
  screen.render();
  appendToOutput("finding events that are available...");
  return invoiceMachine.availableTransitions({
    object: invoice
  })
}).then(({transitions}  ) => {
  const availableEvents = transitions.map((transition) => {
    return transition.event
  });
  appendToOutput(`available events '${availableEvents}'`);
  recreateForm({availableEvents});
  screen.render();
}).catch(({message}) => {
  appendToOutput(`error '${message}'`);
  formBox.focus();
  screen.render();
});
