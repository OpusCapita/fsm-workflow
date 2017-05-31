let fs = require("fs");

let { startForm, eventForm, restartForm } = require("./forms").default;

let MachineDefinition = require("../../fsm-library/src/MachineDefinition").default;
let Machine = require("../../fsm-library/src/Machine").default;

let machineSchemaAsText = fs.readFileSync("./machine-schema.json", "utf8");

let machineDefinition = new MachineDefinition({
  schema: JSON.parse(machineSchemaAsText)
});

let invoiceMachine = new Machine({ machineDefinition });
let taskManager = new TaskManager({machine: invoiceMachine});

let invoice = {
  status: "none"
};

let blessed = require("blessed");
let program = blessed.program();

// Create a screen object.
let screen = blessed.screen({
  smartCSR: true,
  cursor: {
    shape: "line",
    blink: true
  }
});

// title box
let titleBox = blessed.box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  content: " Invoice machine",
  border: {
    type: "line"
  }
});

const logMessage = text => {
  outputBox.log(text);
  screen.render();
};

const updateObjectContent = object => {
  objectBox.setContent(JSON.stringify(invoice, null, "\t"));
  screen.render();
};

const startOrRestartForm = objectWithF => {
  objectWithF["f"]({
    screen,
    formProperties: {
      parent: screen,
      left: 0,
      top: 3,
      width: "50%-1",
      height: "50%-3"
    },
    onSubmit: () => {
      logMessage("starting invoice machine...");
      invoiceMachine.
        start({
          object: invoice
        }).
        then(({ object }) => {
          invoice = object;
          taskManager.monitor({object});
          logMessage("invoice machine has been started");
          updateObjectContent({ object });
          if (invoiceMachine.isFinal({state: invoiceMachine.currentState({ object })})) {
            logMessage("current state is final, machine is stopped!");
            formBox = startOrRestartForm({ f: restartForm });
            return;
          } else {
            logMessage("finding events that are available...");
            return invoiceMachine.availableTransitions({ object }).then(({ transitions }) => {
              const availableEvents = transitions.map(transition => {
                return transition.event;
              });
              logMessage(`available events: '${availableEvents}'`);
              rerenderEventForm({ availableEvents });
            });
          }
        }).
        catch(({ message }) => {
          logMessage(`error message: '${message}'`);
        });
    }
  });
};

const handleFormSubmit = ({ event }) => {
  logMessage(`sending event: '${event}'...`);
  invoiceMachine.
    sendEvent({
      object: invoice,
      event
    }).
    then(({ object }) => {
      invoice = object;
      logMessage("transition just finished");
      updateObjectContent({ object });
      if (invoiceMachine.isFinal({state: invoiceMachine.currentState({ object })})) {
        logMessage("current state is final, machine is stopped!");
        formBox = startOrRestartForm({ f: restartForm });
        return;
      } else {
        logMessage("finding events that are available...");
        return invoiceMachine.availableTransitions({ object }).then(({ transitions }) => {
          const availableEvents = transitions.map(transition => {
            return transition.event;
          });
          logMessage(`available events: '${availableEvents}'`);
          rerenderEventForm({ availableEvents });
        });
      }
    }).
    catch(({ message }) => {
      logMessage(`error message: '${message}'`);
    });
};

const rerenderEventForm = ({ availableEvents }) => {
  return eventForm({
    screen,
    availableEvents,
    formProperties: {
      parent: screen,
      left: 0,
      top: 3,
      width: "50%-1",
      height: "50%-3"
    },
    onSubmit: handleFormSubmit
  });
};

// let formBox = rerenderEventForm({ availableEvents: [] });
let formBox = startOrRestartForm({ f: startForm });

let outputBox = blessed.log({
  label: "Log",
  parent: screen,
  mouse: true,
  keys: true,
  left: 0,
  top: "50%",
  width: "50%-1",
  height: "50%",
  border: "line",
  scrollback: 100,
  scrollbar: {
    ch: " ",
    track: {
      bg: "blue"
    },
    style: {
      inverse: true
    }
  }
});

let objectBox = blessed.box({
  label: "Invoice",
  parent: screen,
  left: "50%+1",
  top: 3,
  width: "50%-1",
  height: "25%-3",
  border: "line",
  content: JSON.stringify(invoice, null, "\t"),
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    bg: "blue"
  }
});

let fsmSchemaBox = blessed.box({
  label: "Machine Schema",
  parent: screen,
  left: "50%+1",
  top: "25%",
  width: "50%-1",
  height: "75%",
  border: "line",
  keys: true,
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    bg: "blue"
  },
  scrollbar: {
    ch: " ",
    inverse: true
  },
  content: machineSchemaAsText
});

// Quit on Escape, q, or Control-C.
screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();
