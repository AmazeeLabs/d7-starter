(function($){

  /**
   * Modern browsers are smart: if you go back to the front page after you
   * selected something from a search dropdown, the value of a dropdown will
   * persist. Sometime we don't want this behavior, for example, on the front
   * page facets.
   *
   * To use: add the "avoid-preselect-on-go-back" class to the select element,
   * or to any of its parent elements.
   */
  Drupal.behaviors.customAvoidPreselectOnGoBack = {
    attach: function(context, settings) {
      if (context !== document) {
        // Only apply on the document load. Do not process on AJAX loaded
        // content.
        // The $(document).ready() does not fit because in this case the select
        // resets its value, but the chosen element does not (not sure why).
        return;
      }
      $('.avoid-preselect-on-go-back').once('avoid-preselect-on-go-back', function () {
        var $this = $(this);
        if (!$this.is('select')) {
          $this = $this.find('select');
        }
        $this.each(function () {
          var $this = $(this);
          $this.val($this.find('option[selected]').attr('value'));
        });
      });
    }
  };

})(jQuery);
