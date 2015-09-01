module.exports = function(grunt) {

  grunt.config.set('shell', {
    clearCache: {
      command: 'drush cache-clear theme-registry'
    },
    chmod: {
        // command: 'sudo chmod -R 775 images',
      }
  });

  grunt.loadNpmTasks('grunt-shell');

};
