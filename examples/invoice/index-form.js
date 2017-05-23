var blessed = require("blessed");

const createForm = ({screen, formProperties = {}, availableEvents = ['a', 'b'], onSubmit = () => {}}) => {
  var form = blessed.form({
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
    availableEvents.find((event) => {
      if (data[event]) {
        onSubmit({event});
        return;
        // let content = output.getContent();
        // let content = '';
        // content = `sending event: '${event}'\n` + content;
        // console.log(content)
        // output.setContent(content);
        // screen.render();
      }
    })
  });

  // var layout = blessed.layout({
  //   parent: form,
  //   top: 'center',
  //   left: 'center',
  //   width: '100%',
  //   height: '100%',
  //   border: 'line'
  // });

  var set = blessed.radioset({
    parent: form,
    shrink: true,
  });

  let top = 0;

  for (var i = 0; i < availableEvents.length; i++) {
    blessed.radiobutton({
      parent: set,
      mouse: true,
      keys: true,
      shrink: true,
      top: top++,
      // left: 0,
      shrink: true,
      name: availableEvents[i],
      content: availableEvents[i]
    });
  }

  var submit = blessed.button({
    parent: form,
    mouse: true,
    keys: true,
    top: 10,
    // left: 0,
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
    // ,
    // border: 'line'
  });

  submit.on("press", function() {
    form.submit();
  });

  // form.submit();
  return form;
};

export default createForm;
