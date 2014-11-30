var files = require( './front-end-workflow/gulpfile' );

files.node = [ 'gulpfile.js' ];
files.browser = [ 'client/**/*.js' ];
files.json = [ 'package.json', 'client/**/*.json' ];
files.html = [ 'client/**/*.html' ];
files.serve = [
  'client',
  'node_modules/d3',
  'node_modules/less/dist',
  'node_modules/normalize.css',
  'node_modules/ramda'
];
