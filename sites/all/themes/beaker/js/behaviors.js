(function ($) {
  // Drupal.theme.prototype.standardExampleButton = function (path, title) {
  //   // Create an anchor element with jQuery.
  //   return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  // };

  // Get CSS Breakpoints
  Drupal.behaviors.getBreakpointsFromCSS = {
    attach: function(context, settings) {
      var breakpoint = {};
      breakpoint.refreshValue = function () {
        this.value = window.getComputedStyle(document.querySelector('html'), ':before').getPropertyValue('content').replace(/\"/g, '');
      };

      $(window).resize(function () {
        breakpoint.refreshValue();
      }).resize();
    }
  };

  // Toggle Hamburger Menu on mobile
  // Drupal.behaviors.searchToggleOnMobile = {
  //   attach: function(context, settings) {
  //     // Mouse devices
  //     $('.sf-accordion-toggle').click(function(e){
  //       e.preventDefault();
  //       if ( $('> a', this).hasClass('sf-expanded') ) {
  //         $('#navigation-search').addClass('sf-expanded');
  //       } else {
  //         $('#navigation-search').removeClass('sf-expanded');
  //       }
  //     });
  //     // Touch devices
  //     $('.sf-accordion-toggle').bind('touchstart', function(e) {
  //       if ( $('> a', this).hasClass('sf-expanded') ) {
  //         $('#navigation-search').addClass('sf-expanded');
  //       } else {
  //         $('#navigation-search').removeClass('sf-expanded');
  //       }
  //     });
  //
  //     $(window).resize(function(){
  //       if($(window).width() > 934) {
  //         $('#navigation-search').removeClass('sf-expanded');
  //       } else {
  //         $('.sf-accordion-toggle a').click(function(){
  //           if ( $(this).hasClass('sf-expanded') ) {
  //             $('#navigation-search').addClass('sf-expanded');
  //           } else {
  //             $('#navigation-search').removeClass('sf-expanded');
  //           }
  //         });
  //       }
  //     });
  //   }
  // };

  //Set footer to bottom
  // Drupal.behaviors.setMainHeight = {
  //   attach: function (context, settings) {
  //     var setHeight = $('header').height() + $('footer').height() + 86;
  //     setHeight = 'calc(100% - ' + setHeight + 'px)';
  //     $('main').css('min-height', setHeight);
  //   }
  // };

  //Checkbox & Radio button hack
//   Drupal.behaviors.form = {
//   attach: function (context, settings) {
//     // $('label.option', context).prepend('<span></span>');
//     $('.form-type-radio label', context).prepend('<span class="radio"></span>');
//     $('.form-type-radio input:checked', context).parent().find('span.radio').addClass('checked');
//
//     $('.form-type-radio input', context).change(function() {
//       $('body').find('span.radio').removeClass('checked');
//       $('.form-type-radio input:checked', context).parent().find('span.radio').addClass('checked');
//     });
//
//     $('.form-type-checkbox label', context).prepend('<span class="checkbox"></span>');
//     $('.form-type-checkbox input:checked', context).parent().find('span.checkbox').addClass('checked');
//
//     $('.form-type-checkbox input', context).change(function() {
//       $('body').find('span.checkbox').removeClass('checked');
//       $('.form-type-checkbox input:checked', context).parent().find('span.checkbox').addClass('checked');
//     });
//   }
// };

/**
* Re-Initializes Chosen after Ajax request
*/
// Drupal.behaviors.chosenAjaxRequest = {
//   attach: function(context, settings) {
//     if( settings.chosen ) {
//       settings.chosen = settings.chosen || Drupal.settings.chosen;
//       $(settings.chosen.selector).not('.chosen-enable').addClass('chosen-enable');
//       if ( Drupal.behaviors.chosen ) {
//         Drupal.behaviors.chosen.attach(context, settings);
//       }
//     }
//   }
// };

/**
* YouTube video size
*/
  // Drupal.behaviors.YouTubeVideoHeight = {
  //   attach: function (context, settings) {
  //     function resizeIframe() {
  //       var video = $('.embedded-video iframe');
  //       var height = (video.width() / 1.8);
  //       video.width('100%');
  //       video.height(height);
  //     }
  //     resizeIframe();
  //
  //     $(window).resize(function() {
  //       resizeIframe();
  //     });
  //   }
  // };

/**
* Default form validation.
  Requires jquery.validation.js which is
  not include per default.
*/
// Drupal.behaviors.formValidation = {
//   attach: function(context, settings) {
//     var validobj = $(".enter-form-class-here").validate({
//       onfocusout: false,
//       onkeyup: false,
//       errorClass: "form-item--error",
//       highlight: function(element, errorClass) {
//         // Try adding error class to parent to allow for maximum flexibility
//         $(element).parents(".form-item.webform-component").addClass(errorClass);
//       },
//       unhighlight: function(element, errorClass) {
//         $(element).parents(".form-item.webform-component").removeClass(errorClass);
//       },
//       // This is only to hide the error message box. Uncomment if you want to show it.
//       errorPlacement: function(error, element) {}
//   }
// };

  //Sticky header on scroll
//   Drupal.behaviors.stickyHeader = {
//   attach: function (context, settings) {
//     $(window).scroll(function() {
//       if( $(window).scrollTop() > $('header').height()) {
//         $('.header').addClass('sticky');
//       } else {
//         $('.header').removeClass('sticky');
//       }
//     });
//   }
// };

  //Superfish Accordion ActiveTrail Fix
// Drupal.behaviors.accordionActiveTrail = {
//    attach : function(context, settings) {
//      $('#superfish-1-toggle', context).on('click', function(){
//        $('.sf-menu.sf-accordion .active-trail', context)
//          .last()
//          .parents('ul.sf-hidden')
//          .css('display', 'block')
//          .parent('li.active-trail')
//          .addClass('sf-expanded');
//      });
//    }
//  };



})(jQuery);
