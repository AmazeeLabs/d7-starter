module.exports = function(grunt) {

  grunt.config.set('sass', {
    app: {
      // Takes every file that ends with .scss from the scss
      // directory and compile them into the css directory.
      // Also changes the extension from .scss into .css.
      // Note: file name that begins with _ are ignored automatically
      files: [{
        expand: true,
        cwd: '<%= dirs.scss %>/',
        src: ['*.scss'],
        dest: '<%= dirs.css %>/',
        ext: '.css'
      }]
    },

    dev: {
      options: {
        sourceMap: true,
        outputStyle: 'nested',
        imagePath: "../images/",
      },
      files: [{
        expand: true,
        cwd: '<%= dirs.scss %>/',
        src: ['*.scss'],
        dest: '<%= dirs.css %>/',
        ext: '.css'
      }]
    },

    dist: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed',
        imagePath: "../images/",
      },
      files: [{
        expand: true,
        cwd: '<%= dirs.scss %>/',
        src: ['*.scss'],
        dest: '<%= dirs.css %>/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-sass');

};
