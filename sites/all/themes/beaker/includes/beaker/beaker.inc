<?php

/**
 * @file
 * Main extension file for the 'development' extension.
 */

/**
 * Implements hook_extension_EXTENSION_registry_alter().
 */
function beaker_extension_beaker_theme_registry_alter(&$registry) {
  if (omega_theme_get_setting('beaker_enable_theme_debug', FALSE)) {
    variable_set('theme_debug', TRUE);
  } else {
    variable_set('theme_debug', FALSE);
  }
}
