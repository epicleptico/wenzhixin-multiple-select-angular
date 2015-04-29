module.exports = function(grunt) {
  'use strict';

  /* INITIALIZATION
   *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration.
  grunt.util.linefeed = '\n';


  /* LICENSE
   *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  var LICENSE_TEXT = [
      '/*',
      ' * \tLICENSE',
      ' * --------------------------------------------------------------------------------------',
      ' * \t\t\t\tDO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE',
      ' * \t\t\t\t\tVersion 2, December 2004',
      ' * Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>',
      ' * Everyone is permitted to copy and distribute verbatim or modified',
      ' * copies of this license document, and changing it is allowed as long',
      ' * as the name is changed.',
      ' * ',
      ' * \t\t\t\tDO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE',
      ' * \t\tTERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION',
      ' * ',
      ' * 0. You just DO WHAT THE FUCK YOU WANT TO.',
      ' */'
    ].join('\n') + '\n';

  /* CONSTANTS
   *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  var MAIN_FILE = ['src/directive.multi-select.js'];
  var DEST_FILE = 'dist/directive.multi-select.min.js';

  /* CONFIG
   *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  /**
   * Main grunt configuration
   */
  grunt.initConfig({
    meta: {
      banner: ['/*',
        ' * <%= bower.name %>',
        ' * Version: <%= bower.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' */\n'].join('\n'),
      license: LICENSE_TEXT
    },
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),
    jshint:{
      options: {jshintrc: '.jshintrc'},
      main: MAIN_FILE
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n<%= meta.license %>\n',
      },
      main: {
        src: MAIN_FILE,
        dest : DEST_FILE
      }
    }
  });


  /* TASKS
   *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  grunt.registerTask('release-patch', ['jshint', 'version:patch', 'uglify']);
  grunt.registerTask('release-minor', ['jshint', 'version:minor', 'uglify']);

  grunt.registerTask('version', 'Set version. If no arguments, it just takes off suffix', function() {
    setVersion(this.args[0], this.args[1]);
  });

  grunt.registerMultiTask('shell', 'run shell commands', function() {
    var self = this;
    var sh = require('shelljs');
    self.data.forEach(function(cmd) {
      cmd = cmd.replace('%version%', grunt.file.readJSON('package.json').version);
      grunt.log.ok(cmd);
      var result = sh.exec(cmd,{silent:true});
      if (result.code !== 0) {
        grunt.fatal(result.output);
      }
    });
  });


  /* HELPER Functions
   *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  /**
   * Helper Fn that sets the version
   * @param type
   * @param suffix
   * @returns {*}
   */
  function setVersion(type, suffix) {
    var VERSION_REGEX = /([\'|\"]version[\'|\"][ ]*:[ ]*[\'|\"])([\d|.]*)(-\w+)*([\'|\"])/;

    var packageFileChanged = false;
    var bowerFileChanged = false;

    var packageFile = 'package.json';
    var bowerFile = 'bower.json';

    var bowerConfig = grunt.config('bower');
    var pkgConfig = grunt.config('pkg');
    var currentVersion = bowerConfig.version;


    //IF readed type, we must increment version
    if(type) {
      currentVersion = require('semver').inc(currentVersion, type);
    }

    //If we readed a suffix, se must add the suffix
    if (suffix) {
      currentVersion += '-' + suffix;
    }

    var packageContents = grunt.file.read(packageFile);
    var bowerContents = grunt.file.read(bowerFile);

    packageContents = packageContents.replace(VERSION_REGEX, function(match, left, center) {
      if(center != currentVersion) {
        grunt.log.ok('package.json version set to ' + currentVersion.cyan);
        packageFileChanged = true;
      }

      return left + currentVersion + '"';
    });

    bowerContents= bowerContents.replace(VERSION_REGEX, function(match, left, center){
      if(center != currentVersion) {
        grunt.log.ok('bower.json version set to ' + currentVersion.cyan);
        bowerFileChanged = true;
      }

      return left + currentVersion + '"';
    });

    if(packageFileChanged) {
      grunt.file.write(packageFile, packageContents);
    }

    if(bowerFileChanged) {
      grunt.file.write(bowerFile, bowerContents);
    }


    bowerConfig.version = currentVersion;
    pkgConfig.version = currentVersion;

    grunt.config('bower', bowerConfig);
    grunt.config('pkg', pkgConfig);

    return currentVersion;
  }

  return grunt;

};