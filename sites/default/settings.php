<?php

/**
 * @file
 * AmazeeIO Drupal 7 configuration file.
 *
 * You should not edit this file, please use environment specific files!
 * They are loaded in this order:
 * - settings.all.php
 *   For settings that should be applied to all environments (dev, prod, staging, vagrant, etc).
 * - settings.production.php
 *   For settings only for the production environment.
 * - settings.development.php
 *   For settings only for the development environment (dev servers, vagrant).
 * - settings.local.php
 *   For settings only for the local environment, this file will not be commited in GIT!
 *
 */

### AMAZEE.IO Varnish & Reverse proxy settings
if (getenv('AMAZEEIO_VARNISH_HOSTS') && getenv('AMAZEEIO_VARNISH_SECRET')) {
  $varnish_hosts = explode(',', getenv('AMAZEEIO_VARNISH_HOSTS'));
  array_walk($varnish_hosts, function(&$value, $key) { $value .= ':6082'; });

  $conf['reverse_proxy'] = TRUE;
  $conf['reverse_proxy_addresses'] = array_merge(explode(',', getenv('AMAZEEIO_VARNISH_HOSTS')), array('127.0.0.1'));
  $conf['varnish_control_terminal'] = implode($varnish_hosts, " ");
  $conf['varnish_control_key'] = getenv('AMAZEEIO_VARNISH_SECRET');
  $conf['varnish_version'] = 3;
}

### AMAZEE.IO Redis settings
if (getenv('AMAZEEIO_REDIS_HOST') && getenv('AMAZEEIO_REDIS_PORT')) {
  $conf['redis_client_interface'] = 'PhpRedis';
  $conf['redis_client_host'] = getenv('AMAZEEIO_REDIS_HOST');
  $conf['redis_client_port'] = getenv('AMAZEEIO_REDIS_PORT');
}

### AMAZEE.IO Database connection
if(getenv('AMAZEEIO_SITENAME')){
  $databases['default']['default'] = array(
    'driver' => 'mysql',
    'database' => getenv('AMAZEEIO_SITENAME'),
    'username' => getenv('AMAZEEIO_DB_USERNAME'),
    'password' => getenv('AMAZEEIO_DB_PASSWORD'),
    'host' => getenv('AMAZEEIO_DB_HOST'),
    'port' => getenv('AMAZEEIO_DB_PORT'),
    'prefix' => '',
  );
}

### AMAZEE.IO SOLR connection
if(getenv('AMAZEEIO_SOLR_HOST') && getenv('AMAZEEIO_SOLR_PORT')){
  // Override search API server settings fetched from default configuration.
  $conf['search_api_override_mode'] = 'load';
  $conf['search_api_override_servers'] = array(
    'solr' => array(
      'name' => 'Amazee.io Solr - Environment:' . getenv('AMAZEEIO_SITE_ENVIRONMENT'),
      'options' => array(
        'host' => getenv('AMAZEEIO_SOLR_HOST'),
        'port' => getenv('AMAZEEIO_SOLR_PORT'),
        'path' => '/solr/'.getenv('AMAZEEIO_SITENAME').'/',
        'http_user' => '',
        'http_pass' => '',
        'excerpt' => 0,
        'retrieve_data' => 0,
        'highlight_data' => 0,
        'http_method' => 'POST',
      ),
    ),
  );
}

### Base URL
if (getenv('AMAZEEIO_SITE_URL')) {
  $base_url = 'http://' . getenv('AMAZEEIO_SITE_URL');
}

// Let the ultimate_cron work as usual on the core-cron command ("drush cron").
$conf['ultimate_cron_check_schedule_on_core_cron'] = TRUE;

// Last: this servers specific settings files.
if (file_exists(__DIR__ . '/settings.all.php')) {
  include __DIR__ . '/settings.all.php';
}

// Environment specific settings files.
if(getenv('AMAZEEIO_SITE_ENVIRONMENT')){
  if (file_exists(__DIR__ . '/settings.' . getenv('AMAZEEIO_SITE_ENVIRONMENT') . '.php')) {
    include __DIR__ . '/settings.' . getenv('AMAZEEIO_SITE_ENVIRONMENT') . '.php';
  }
}

// Last: this servers specific settings files.
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}

// Uncomment to use Domains Module
// include DRUPAL_ROOT . '/sites/all/modules/domain/settings.inc';