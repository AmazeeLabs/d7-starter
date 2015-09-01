module.exports = function(grunt) {

  grunt.config.set('postcss', {
    options: {
      map: true,
      processors: [
        require('autoprefixer-core')({browsers: ['last 10 versions', 'ie 9']}),
        require('csswring')
      ]
    },
    dist: {
      src: '<%= dirs.css %>/*.css'
    }
  });

  grunt.loadNpmTasks('grunt-postcss');

};
