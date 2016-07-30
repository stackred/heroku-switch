'use strict';

var fs = require('fs');

var hvm = {
  getCurrent: function() {
    try {
      var netrc = `${process.env.HOME}/.netrc`;
      var target = fs.readlinkSync(netrc);
      var match = target.match(/^.netrc-(.*)/);
      if(match) {
        return match[1];
      }
    }
    catch(e) {
    }
  },

  list: function() {
    return fs.readdirSync(process.env.HOME).map(function(entry) {
      var match = entry.match(/^\.netrc-(.*)/);
      if(match) {
        return match[1];
      }
    }).filter(function(entry) {
      return typeof(entry) != 'undefined';
    });
  },

  set: function(which) {
    try {
      var netrc = `${process.env.HOME}/.netrc`;
      var stat = fs.lstatSync(netrc);
      if(stat.isFile()) {
        fs.renameSync(netrc, `${netrc}-default`)
      }
      else if(stat.isSymbolicLink()) {
        fs.unlinkSync(netrc);
      }
      else {
        throw new Error("Expected ~/.netrc to be a file or symlink!");
      }
    }
    catch(e) {
      if(e.code == 'ENOENT') {
        // Ignore
      }
      else {
        throw e;
      }
    }

    if(which) {
      fs.symlinkSync(`.netrc-${which}`, netrc);
    }
  },

  remove: function(which) {
    try {
      fs.unlinkSync(`${process.env.HOME}/.netrc-${which}`);
    }
    catch(e) {
      if(e.code !== 'ENOENT')
        throw e;
    }
  }
};

module.exports = hvm;
