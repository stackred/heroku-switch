'use strict';

var hvm = require('../hvm');

module.exports = {
  topic: 'switch',
  command: 'remove',
  description: 'Remove one of your Heroku accounts.',
  help: `
Example:

$ heroku switch:remove business
`,
  wantsApp: false,
  wantsOrg: false,
  args: [ {name: 'which'} ],
  run: function(context) {
    var which = context.args.which;
    hvm.remove(which);

    if(hvm.getCurrent() == which) {
      hvm.set(hvm.list()[0]);
    }
  }
};

