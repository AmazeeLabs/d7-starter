(function ($) {

  /**
  * CSS Breakpoints import
  * Usage: if (breakpoint.value == 'BREAKPOINT-VALUE')
  */

  Drupal.behaviors.importBreakpoints = {
    attach: function(context, settings) {
      // Get breakpoint
      var breakpoint = {};
      breakpoint.refreshValue = function () {
        this.value = window.getComputedStyle(document.querySelector('html'), ':before').getPropertyValue('content').replace(/\"/g, '');
      };

      // Refresh breakpoint var on resize
      $(window).resize(function () {
        breakpoint.refreshValue();
      }).resize();
    }
  };

})(jQuery);
