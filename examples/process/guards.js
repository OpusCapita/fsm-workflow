export default {
  isJaneDoe: ({firstName, lastName}) => {
    return firstName === 'Jane' && lastName === 'Doe'
  },

  isEvenAged: ({age}) => {
    return parseInt(age) % 2 === 0;
  }
}
