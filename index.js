'use strict';

exports.topic = {
  name: 'switch',
  // this is the help text that shows up under `heroku help`
  description: 'switch between Heroku accounts'
}

exports.commands = [
  require('./commands/set.js'),
  require('./commands/list.js'),
  require('./commands/remove.js')
]

