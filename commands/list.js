'use strict';

var hvm = require('../hvm');

module.exports = {
  topic: 'switch',
  command: 'list',
  description: 'List available Heroku accounts.',
  help: `
Example:

$ heroku switch:list
business
personal
`,
  wantsApp: false,
  wantsOrg: false,
  run: function(context) {
    var selected = hvm.getCurrent();
    var found = false;
    hvm.list().forEach(function(which) {
      if(which === selected) {
        console.log(`* ${which}`);
        found = true;
      }
      else {
        console.log(`  ${which}`);
      }
    });
    if(!found && selected) {
      console.log(`* ${selected}`);
    }
  }
};
