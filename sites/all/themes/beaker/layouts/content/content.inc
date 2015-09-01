<?php

/**
 * Implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('Content Layout'),
  'category' => t('Beaker Theme'),
  'icon' => 'content.png',
  'theme' => 'content',
  'css' => '',
  'regions' => array(
    'content_top' => t('Content Top'),
    'content' => t('Content'),
    'content_bottom' => t('Content Bottom'),
  ),
);
