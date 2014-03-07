#!/usr/bin/php
<?php

/**
 * @file
 * Script that updates local database and other stuff from DEV or LIVE.
 *
 * Also the script could be used to update DEV from LIVE.
 *
 * Be careful with variables: the current scope is global.
 */

if (php_sapi_name() != 'cli') {
  @ob_end_clean();
  exit;
}

if (in_array('--help', $_SERVER['argv']) || in_array('-h', $_SERVER['argv']) || in_array('help', $_SERVER['argv'])) {
  echo <<<EOF

Updates current database and other stuff from DEV or LIVE.

By default (with no options passed) it does:
- exports/imports session table, so the sessions persist
- updates/initializes git submodules
- synchronizes database from DEV
- grants 'access devel information' permission to all roles
- sets readonly mode for all search_api indexes
- corrects domain variants to local basing on \$base_url in settings.php
- enables devel module
- disables all possible caches
- clears all caches

Usage:        ./up.php [OPTIONS]
Example:      ./up.php -b -f # Update including files and make DB backups.

  -h, --help
      This page.

  -l, --from-live
      Update from LIVE. If omitted: DEV is used.

  -S, --ignore-submodules
      Do not sync/update/init git submodules.

  -b, --backup
      Make database backups (current and new) in parent folder.

  -f, --sync-files
      Sync files folder. Processed with drush rsync in background.

  -R, --no-email-reroute
      Use if your local machine handles outgoing emails sent by PHP.

  -D, --no-db-sync
      Do not download the database.

\n
EOF;
  exit;
}

$from_live = in_array('-l', $_SERVER['argv']) || in_array('--from-live', $_SERVER['argv']);
$drush_alias = $from_live ? '@web1' : '@dev';
$ignore_submodules = in_array('-S', $_SERVER['argv']) || in_array('--ignore-submodules', $_SERVER['argv']);
$backup = in_array('-b', $_SERVER['argv']) || in_array('--backup', $_SERVER['argv']);
$sync_files = in_array('-f', $_SERVER['argv']) || in_array('--sync-files', $_SERVER['argv']);
$disable_email_reroute = in_array('-R', $_SERVER['argv']) || in_array('--no-email-reroute', $_SERVER['argv']);
$no_db_sync = in_array('-D', $_SERVER['argv']) || in_array('--no-db-sync', $_SERVER['argv']);

define('DRUPAL_ROOT', dirname(__FILE__));
chdir(DRUPAL_ROOT);
include_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_DATABASE);

if ($backup) {
  color_echo('Backuping old DB...');
  exec('drush sql-dump --gzip > ../db-dump-'
      . $databases['default']['default']['database'] . '-'
      . date('Y-m-d-H-i-s', REQUEST_TIME) . '-old.gz');
}

color_echo('Exporting sessions table...');
exec('mysqldump -u ' . $databases['default']['default']['username'] . ' -p'
    . $databases['default']['default']['password'] . ' '
    . $databases['default']['default']['database'] . ' sessions > ../sessions.sql');

if ($sync_files) {
  color_echo('Start sync files in background...');
  exec('drush -y rsync ' .$drush_alias .  ':%files %files  > /dev/null &');
}

if (!$ignore_submodules) {
  color_echo('Updating git submodules...');
  chdir(exec('git rev-parse --show-toplevel'));
  exec('git submodule sync');
  exec('git submodule update --init');
  chdir(DRUPAL_ROOT);
}

if (!$no_db_sync) {
  color_echo('Downloading DB...');
  exec('drush sql-sync ' . $drush_alias . ' default --create-db --no-cache -y');
}

color_echo('Allowing all users to view devel info...');
foreach (array(DRUPAL_ANONYMOUS_RID, DRUPAL_AUTHENTICATED_RID) as $rid) {
  db_merge('role_permission')
      ->key(array('rid' => $rid, 'permission' => 'access devel information'))
      ->fields(array('rid' => $rid, 'permission' => 'access devel information', 'module' => 'devel'))
      ->execute();
}

color_echo('Making search index read-only...');
try {
  db_update('search_api_index')
      ->fields(array('read_only' => 1))
      ->execute();
}
catch (Exception $s) {}

color_echo('Correcting domains and domain variants...');
try {
  // This is not really precise code... It tries to guess values based on our
  // usual practices.
  if ($new_domain = preg_replace('#^https?://#', '', $base_url)) {
    $old_domain = db_select('domain', 'd')
        ->fields('d', array('subdomain'))
        ->orderBy('d.domain_id')
        ->execute()
        ->fetchField();
    db_query("UPDATE domain SET subdomain = '$new_domain' WHERE subdomain = '$old_domain'");
    db_query("UPDATE domain_variants SET path = REPLACE(path, '$old_domain', '$new_domain') WHERE INSTR(path, '$old_domain') > 0");
  }
}
catch (Exception $s) {}

color_echo('Ensuring devel is enabled...');
exec('drush en devel -y');

color_echo('Disabling caches...');
variable_set('cache', 0);
variable_set('block_cache', 0);
variable_set('preprocess_css', 0);
variable_set('preprocess_js', 0);

if ($disable_email_reroute) {
  color_echo('Disabling emails reroute...');
  variable_set('reroute_email_enable', 0);
  exec('drush dis email_redirect -y');
}

color_echo('Clearing caches...');
exec('drush cc all');

color_echo('Restoring sessions table...');
exec('mysql -u ' . $databases['default']['default']['username'] . ' -p'
    . $databases['default']['default']['password'] . ' '
    . $databases['default']['default']['database'] . ' < ../sessions.sql');
unlink('../sessions.sql');

if ($backup) {
  color_echo('Backuping new DB...');
  exec('drush sql-dump --gzip > ../db-dump-'
      . $databases['default']['default']['database'] . '-'
      . date('Y-m-d-H-i-s', REQUEST_TIME) . '-new.gz');
}

color_echo('DONE!');

function color_echo($text) {
  echo "\033[1;36m$text\033[0m
";
}
