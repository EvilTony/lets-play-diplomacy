var files = require( './front-end-workflow/gulpfile' );

files.node = [ 'gulpfile.js' ];
files.json = [ 'package.json' ];
files.serve = [
  'node_modules/normalize.css',
  'node_modules/less/dist',
  'client'
];
