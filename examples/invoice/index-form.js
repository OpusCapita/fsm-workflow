const blessed = require("blessed");

const createForm = ({
  screen,
  formProperties = {},
  availableEvents = [],
  onSubmit = () => {}
}) => {
  const form = blessed.form({
    mouse: true,
    keys: true,
    vi: true,
    left: 0,
    top: 0,
    width: "100%",
    scrollable: true,
    scrollbar: {
      ch: " "
    },
    ...formProperties
  });

  form.on("submit", function(data) {
    availableEvents.find(event => {
      if (data[event]) {
        onSubmit({ event });
        return;
      }
    });
  });

  const radioset = blessed.radioset({
    parent: form,
    shrink: true
  })

  let top = 0;
  const options = [];
  for (let i = 0; i < availableEvents.length; i++) {
    options.push(blessed.radiobutton({
      parent: radioset,
      mouse: true,
      keys: true,
      shrink: true,
      top: top++,
      shrink: true,
      name: availableEvents[i],
      content: availableEvents[i]
    }));
  }

  const submit = blessed.button({
    parent: form,
    mouse: true,
    keys: true,
    top: 10,
    shrink: true,
    name: "submit",
    content: "submit",
    padding: {
      left: 1,
      right: 1
    },
    style: {
      bg: "white",
      fg: "black",
      focus: {
        bg: "blue"
      }
    }
  });

  submit.on("press", function() {
    form.submit();
  });

  if (options.length > 0) {
    options[0].focus();
  }
  screen.render();

  return form;
};

export default createForm;
