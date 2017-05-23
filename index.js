/* jshint node: true */
'use strict';

const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-data-fastboot',

  init: function() {
    this._super && this._super.init.apply(this, arguments);

    let checker = new VersionChecker(this);
    let fastBootVersion = checker.for('ember-cli-fastboot');
    if (!(fastBootVersion.gte('1.0.0') || fastBootVersion.gte('1.0.0-rc.1'))) {
      let error  = new Error(`This version of ember-data-fastboot requires at ember-cli-fastboot above 1.0.0-rc.1, but you have ${fastBootVersion.version}. Revert to the latest 0.0.x version for support for beta versions of ember-cli-fastboot.`);
      error.suppressStacktrace = true;
      throw error;
    }
  }
};
