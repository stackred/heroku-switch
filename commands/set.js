'use strict';

var hvm = require('../hvm');

module.exports = {
  topic: 'switch',
  description: 'Switch between Heroku accounts.',
  help: `
Example:

$ heroku switch personal
$ heroku login
$ heroku apps
mypersonal-app-1

$ heroku switch business
$ heroku login
$ heroku apps
my-work-app

$ heroku switch personal
$ heroku apps
mypersonal-app-1
`,
  default: true,
  wantsApp: false,
  wantsOrg: false,
  args: [ {name: 'which'} ],
  run: function(context) {
    hvm.set(context.args.which);
    console.log(`Switched to Heroku account ${context.args.which}`);
  }
};

