module.exports = function(grunt) {

  grunt.config.set('autoprefixer', {
    options: {
      browsers: ['last 10 versions', 'ie 9']
    },
    no_dest: {
      src: '<%= dirs.css %>/*.css'
    },
    // multiple_files: {
    //   src: '<%= dirs.css %>/**/*.css'
    // },
    diff: {
      options: {
          diff: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');

};
