export default {
  sayHello: ({firstName, lastName, object, from, to, event}) => {
    console.log(`Hello ${firstName} ${lastName}!`);
  },

  sayGoodbye: ({firstName, lastName, object, from, to, event}) => {
    console.log(`Bye ${firstName} ${lastName}`);
  }
}
