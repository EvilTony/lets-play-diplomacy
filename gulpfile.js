var few = require( './front-end-workflow/gulpfile' );

few.files = {
  'package': [ __dirname + '/package.json' ],
  node: [ 'gulpfile.js' ],
  browser: [ 'client/**/*.js' ],
  json: [ 'package.json', 'client/**/*.json' ],
  html: [ 'client/**/*.html' ],
  serve: './client',
  unit: [
    'node_modules/d3/d3.js',
    'node_modules/mithril/mithril.js',
    'node_modules/ramda/ramda.js'
  ],
  libraries: {
    '/normalize.css': 'node_modules/normalize.css/normalize.css',
    '/less.js': 'node_modules/less/dist/less.js',

    '/d3.js': 'node_modules/d3/d3.js',
    '/ramda.js': 'node_modules/ramda/ramda.js',
    '/mithril.js': 'node_modules/mithril/mithril.js',
  }
};
