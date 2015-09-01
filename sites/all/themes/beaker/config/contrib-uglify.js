module.exports = function(grunt) {

  grunt.config.set('uglify', {
    dev: {
      options: {
        mangle: false,
        compress: false,
        beautify: true
      },
      files: [{
        expand: true,
        flatten: true,
        cwd: '<%= dirs.js %>',
        dest: '<%= dirs.js %>',
        src: ['**/*.js', '!**/*.min.js'],
        rename: function(dest, src) {
          var folder = src.substring(0, src.lastIndexOf('/'));
          var filename = src.substring(src.lastIndexOf('/'), src.length);
          filename = filename.substring(0, filename.lastIndexOf('.'));
          return dest + '/' + folder + filename + '.min.js';
        }
      }]
    },
    dist: {
      options: {
        mangle: true,
        compress: true
      },
      files: [{
        expand: true,
        flatten: true,
        cwd: '<%= dirs.js %>',
        dest: '<%= dirs.js %>',
        src: ['**/*.js', '!**/*.min.js'],
        rename: function(dest, src) {
          var folder = src.substring(0, src.lastIndexOf('/'));
          var filename = src.substring(src.lastIndexOf('/'), src.length);
          filename = filename.substring(0, filename.lastIndexOf('.'));
          return dest + '/' + folder + filename + '.min.js';
        }
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

};
