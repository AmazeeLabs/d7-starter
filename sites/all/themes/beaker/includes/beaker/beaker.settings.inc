<?php

/**
 * @file
 * Contains the theme settings form elements for the development extension.
 */

/**
 * Implements hook_extension_EXTENSION_theme_settings_form_alter().
 */
function beaker_extension_beaker_settings_form($element, &$form, $form_state) {
  $element['beaker_enable_theme_debug'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable theme debug'),
    '#description' => t("Theme debug mode can be used to see possible template suggestions and the locations of template files right in your HTML markup (as HTML comments)."),
    '#default_value' => omega_theme_get_setting('beaker_enable_theme_debug', FALSE),
  );

  return $element;
}
