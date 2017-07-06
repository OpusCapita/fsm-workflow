#!/usr/bin/env node

var execSync = require('child_process').execSync;
var packages = require('./packages');

function releasePackage(package) {
  execSync('npm install', { cwd: package.path, stdio: 'inherit' });
  console.log(`For "${package.path}" run release: "${package.release}"`);
  execSync(package.release, { cwd: package.path, stdio: 'inherit' });
}

function releasePackages(packages) {
  packages.forEach(package => releasePackage(package));
  console.log(`All packages released succesfully!`);
}

releasePackages(packages);
