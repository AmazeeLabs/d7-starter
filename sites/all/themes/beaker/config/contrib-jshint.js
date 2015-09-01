module.exports = function(grunt) {

  grunt.config.set('jshint', {
    options: {
      jshintrc: '.jshintrc'
    },
    all: ['<%= dirs.js %>/{,**/}*.js', '!<%= dirs.js %>/{,**/}*.min.js']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
