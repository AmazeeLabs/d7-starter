<?php

/**
 * Implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('User Teaser Layout'),
  'category' => t('Beaker Theme'),
  'icon' => 'user-teaser.png',
  'theme' => 'user-teaser',
  'css' => '',
  'regions' => array(
    'image' => t('Image'),
    'details' => t('Details')
  ),
);
