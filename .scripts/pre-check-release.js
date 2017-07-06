#!/usr/bin/env node

var path = require('path');
var execSync = require('child_process').execSync;
var packages = require('./packages');

function checkPakcage(package) {
  execSync('npm install', { cwd: package.path, stdio: 'inherit' });

  package.checks.forEach(check => {
    console.log(`For "${package.path}" run check: "${check}"`);
    execSync(check, { cwd: package.path, stdio: 'inherit' });
  });
}

function checkPackages(packages) {
  packages.forEach(package => checkPakcage(package));
  console.log(`All checks passed succesfully!`);
}

checkPackages(packages);
