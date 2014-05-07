'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    shell: {
      patternlab: {
        command: 'php core/builder.php -gp'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/style.css': 'source/css/style.scss',
          'public/styleguide/css/styleguide.css': 'public/styleguide/css/styleguide.scss',
          'public/styleguide/css/styleguide-specific.css': 'public/styleguide/css/styleguide-specific.scss'
        }
      }
    },


    watch: {
      options: {
        spawn: false,
        livereload: '<%= connect.options.livereload %>'
      },
      html: {
        files: [
          'source/_patterns/**/*.mustache',
          'source/_patterns/**/*.json',
          'source/_data/*.json',
        ],
        tasks: [ 'shell:patternlab' ],
      },
      css: {
        files: [
          'source/css/*.scss',
          'source/css/**/*.scss',
          'public/styleguide/css/**/*.scss'
        ],
        tasks: ['sass'],
      }
    },

    connect: {
      options: {
          port: 9000,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      livereload: {
          options: {
              open: 'http://localhost:9000',
              base: [
                  'public/'
              ]
          }
      },
      dist: {
          options: {
              open: true,
              base: 'public/',
              livereload: false
          }
      }
    },

  }); // End Project Config

  // build task
  grunt.registerTask('build', ['shell:patternlab', 'sass']);

  // grunt serve to build and serve PL locally
  grunt.registerTask('serve', ['build', 'connect:livereload', 'watch']);

  grunt.registerTask('default', ['build']);


};
