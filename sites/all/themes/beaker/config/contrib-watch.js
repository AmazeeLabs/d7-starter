module.exports = function(grunt) {

  grunt.config.set('watch', {
    css: {
      files: ['<%= dirs.scss %>/{,**/}*.{scss,sass}', '<%= dirs.js %>{,**/}*.js', '!<%= dirs.scss %>/_imports/*'],
      tasks: ['sass_globbing', 'sass:dev', 'px_to_rem:dist', 'postcss'],
      options: {
        livereload: true,
        spawn: false
      }
    },
    configFiles: {
      files: [ 'Gruntfile.js', 'config/*.js' ],
      options: {
        reload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};
