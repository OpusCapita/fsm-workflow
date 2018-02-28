// set node evn
process.env.NODE_ENV = 'test';

require('babel-register')({
  presets: ['env'],
  plugins: ['istanbul']
});
