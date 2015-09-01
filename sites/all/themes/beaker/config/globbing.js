module.exports = function(grunt) {

  grunt.config.set('sass_globbing', {
    your_target: {
      files: {
        '<%= dirs.scss %>/_imports/variables.scss':     '<%= dirs.scss %>/_variables/**/*.scss',
        '<%= dirs.scss %>/_imports/core.scss':          '<%= dirs.scss %>/_core/**/*.scss',
        '<%= dirs.scss %>/_imports/abstractions.scss':  '<%= dirs.scss %>/abstractions/**/*.scss',
        '<%= dirs.scss %>/_imports/layout.scss':        '<%= dirs.scss %>/layout/**/*.scss',
        '<%= dirs.scss %>/_imports/base.scss':          '<%= dirs.scss %>/base/**/*.scss',
        '<%= dirs.scss %>/_imports/components.scss':    '<%= dirs.scss %>/components/**/*.scss',
        '<%= dirs.scss %>/_imports/pages.scss':         '<%= dirs.scss %>/pages/**/*.scss'
      },
      options: {
        useSingleQuotes: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass-globbing');

};
