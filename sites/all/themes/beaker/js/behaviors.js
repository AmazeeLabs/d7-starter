(function ($) {
  /**
  * Get CSS Breakpoints
  * Usage: window.breakpoint gives you the actual breakpoint
  * E.g.: if(window.breakpoint == 'mobile') { Your Code }
  */
  Drupal.behaviors.getBreakpointsFromCSS = {
    attach: function(context, settings) {
      var breakpoint;
      var breakpoint_refreshValue;
      breakpoint_refreshValue = function () {
        window.breakpoint = window.getComputedStyle(document.querySelector('html'), ':before').getPropertyValue('content').replace(/\"/g, '');
      };

      $(window).resize(function () {
        breakpoint_refreshValue();
      }).resize();
    }
  };

  /**
  * Add versions/device types to body for responsiveness
  * */
  Drupal.behaviors.browserDetection = {
    attach: function (context, settings) {
      var $b = $('body');
      //Check if desktop device
      if( $.browser.desktop ) {
        $b.addClass('desktop');
      }

      // Check if mobile device
      if( $.browser.mobile ) {
        $b.addClass('mobile');
      }

      // Check if IE
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE ");
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
       $b.addClass('ie');
      }

      //Check if IE9
      if ($.browser.msie  && parseInt($.browser.version) == 9) {
        $b.addClass('ie9');
      }

      //Check if iOS device
      if( $.browser.ipad || $.browser.iphone || $.browser.ipod ) {
        $b.addClass('ios');
        if ( $.browser.ipad ) {
          $b.addClass('ipad');
        } else if ( $.browser.iphone ) {
          $b.addClass('iphone');
        } else if ( $.browser.ipod ) {
          $b.addClass('ipod');
        }
      }

      //Check if Android device
      if( $.browser.android || $.browser.kindle ) {
        $b.addClass('android');
      }

      //Check if Windows phone
      if( $.browser["windows phone"] ) {
        $b.addClass('windows-mobile');
      }
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
