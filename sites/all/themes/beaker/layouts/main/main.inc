<?php

/**
 * Implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('Main Page Layout'),
  'category' => t('Beaker Theme'),
  'icon' => 'main.png',
  'theme' => 'main',
  'css' => '',
  'regions' => array(
    // 'meta_nav' => t('Meta Navigation'),
    'header' => t('Header'),
    'content_top' => t('Main Top'),
    'content' => t('Main'),
    'content_bottom' => t('Main Bottom'),
    'footer' => t('Footer')
  ),
);
