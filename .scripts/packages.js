var path = require('path');
var packages = [
  {
    path: path.resolve(__dirname, '../core'),
    checks: ['npm run lint', 'npm run test'],
    release: 'npm run publish-release'
  },
  {
    path: path.resolve(__dirname, '../task-manager'),
    checks: ['npm run lint', 'npm run test'],
    release: 'npm run publish-release'
  }
];

module.exports = packages;
