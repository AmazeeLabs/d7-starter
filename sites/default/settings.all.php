<?php
/**
 * @file
 * AmazeeIO Drupal 7 all environment configuration file.
 *
 * This file should contain all settings.php configurations that are needed by all environments.
 */

// Uncomment to use Varnish.
# $conf['cache_backends'][] = 'sites/all/modules/varnish/varnish.cache.inc';
# $conf['cache_class_cache_page'] = 'VarnishCache';

// Uncomment to use Redis.
# $conf['redis_client_interface'] = 'PhpRedis';
# $conf['cache_backends'][] = 'sites/all/modules/redis/redis.autoload.inc';
# $conf['cache_default_class'] = 'Redis_Cache';
# $conf['cache_prefix'] = getenv('AMAZEEIO_SITENAME') . '_';

// Uncomment to use Domains Module
// include DRUPAL_ROOT . '/sites/all/modules/domain/settings.inc';

// Uncomment to use Solr
# if(getenv('AMAZEEIO_SOLR_HOST') && getenv('AMAZEEIO_SOLR_PORT')){
#   // Override search API server settings fetched from default configuration.
#   $conf['search_api_override_mode'] = 'load';
#   $conf['search_api_override_servers'] = array(
#     'solr' => array(
#       'name' => 'Amazee.io Solr - Environment:' . getenv('AMAZEEIO_SITE_ENVIRONMENT'),
#       'options' => array(
#         'host' => getenv('AMAZEEIO_SOLR_HOST'),
#         'port' => getenv('AMAZEEIO_SOLR_PORT'),
#         'path' => '/solr/'.getenv('AMAZEEIO_SITENAME').'/',
#         'http_user' => '',
#         'http_pass' => '',
#         'excerpt' => 0,
#         'retrieve_data' => 0,
#         'highlight_data' => 0,
#         'http_method' => 'POST',
#       ),
#     ),
#   );
# }//
