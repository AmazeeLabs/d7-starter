module.exports = function(grunt) {

  grunt.config.set('px_to_rem', {
    dist: {
      options: {
        base: 16,
        fallback: true,
        fallback_existing_rem: true,
        ignore: [ 'border',
                  'border-radius',
                  'border-width',
                  'border-top',
                  'border-left',
                  'border-right',
                  'border-bottom',
                  'margin',
                  'margin-top',
                  'margin-right',
                  'margin-left',
                  'margin-bottom',
                  'padding',
                  'padding-top',
                  'padding-right',
                  'padding-bottom',
                  'padding-left',
                  'width',
                  'height',
                  'background',
                  'background-size',
                  'background-position',
                  'top',
                  'left',
                  'bottom',
                  'right',
                  'min-height',
                  'max-height',
                  'min-width',
                  'max-width',
                  'transform'
                ],
        map: true
      },
      files: {
        '<%= dirs.css %>/styles.css': ['<%= dirs.css %>/styles.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-px-to-rem');

};
