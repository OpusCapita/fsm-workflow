let fs = require("fs");

let createForm = require('./index-form').default;

let MachineDefinition = require('../../src/MachineDefinition').default;
let Machine = require('../../src/Machine').default;

let machineSchemaAsText = fs.readFileSync('./machine-schema.json', 'utf8')

let machineDefinition = new MachineDefinition({
  schema: JSON.parse(machineSchemaAsText)
});

let invoiceMachine = new Machine({machineDefinition});

let invoice = {
  status: 'none'
};

let blessed = require('blessed');
let program = blessed.program()

// Create a screen object.
let screen = blessed.screen({
  smartCSR: true,
  cursor: {
    shape: 'line',
    blink: true,
  }
});

// title box
let titleBox = blessed.box({
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

const logMessage = (text) => {
  let content = outputBox.getContent();
  content = text + '\n' + content.trim();
  outputBox.setContent(content);
  screen.render();
}
const updateObjectContent = (object) => {
  objectBox.setContent(JSON.stringify(invoice, null, '\t'));
  screen.render();
}

const handleFormSubmit = ({event}) => {
  // console.log('opa');
  logMessage(`Sending event '${event} ...'\n`);
  invoiceMachine.sendEvent({
    object: invoice,
    event,
  }).then(({object}) => {
    invoice = object;
    logMessage("invoice machine has been started...");
    updateObjectContent({object});
    logMessage("finding events that are available...");
    return invoiceMachine.availableTransitions({object})
  }).then(({transitions}  ) => {
    const availableEvents = transitions.map((transition) => {
      return transition.event
    });
    logMessage(`available events '${availableEvents}'`);
    recreateForm({availableEvents});
  }).catch(({message}) => {
    logMessage(`error '${message}'`);
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

let formBox = recreateForm({availableEvents: []})

let outputBox = blessed.scrollabletext({
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

let objectBox = blessed.box({
  parent: screen,
  left: '50%+1',
  top: 3,
  width: '50%-1',
  height: '30%-3',
  border: 'line',
  content: JSON.stringify(invoice, null, '\t')
});

let fsmSchemaBox = blessed.box({
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

// Render the screen.
screen.render();

logMessage("starting invoice machine...")
invoiceMachine.start({
  object: invoice
}).then(({object}) => {
  invoice = object;
  logMessage("invoice machine has been started...");
  updateObjectContent({object});
  logMessage("finding events that are available...");
  return invoiceMachine.availableTransitions({object});
}).then(({transitions}  ) => {
  const availableEvents = transitions.map((transition) => {
    return transition.event
  });
  logMessage(`available events '${availableEvents}'`);
  recreateForm({availableEvents});
}).catch(({message}) => {
  logMessage(`error '${message}'`);
});
