require('babel-register')({
  presets: ['es2015', 'stage-0'],
  // Ignore can also be specified as a function.
  ignore: function(filename) {
    if (filename.indexOf('core/index.js') >= 0) {
      return false;
    } else if (filename.indexOf('core/src') >= 0) {
      return false;
    } else if (filename.indexOf('task-manager/src') >= 0) {
      return false;
    } else {
      return true;
    }
  }
});
