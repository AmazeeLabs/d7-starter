<?php
$options['application'] = 'drupal';
$options['deploy-repository'] = 'git@github.com:AmazeeLabs/CHANGME.git';
$options['branch'] = "live";
$options['keep-releases'] = 3;
$options['deploy-via'] = 'RemoteCache';
$options['git_enable_submodules'] = TRUE;

$options['before']['deploy-symlink'][] = 'deploy_settings_php_task';
$options['before']['deploy-symlink'][] = 'deploy_symlinks_task';
$options['after']['deploy-symlink'][] = 'deploy_update_task';
$options['after']['deploy-symlink'][] = 'deploy_cache_task';

/**
 * The task needs to be defined with a @task "decorator" in the comment block preceding it
 * @task
 * @mandatory
 */
function deploy_settings_php_task($d) {
  $d->run("cp /home/nfs_share/www-data/`whoami`/settings.php ~/deploy/drupal/shared/settings.php", $d->latest_release());
}

/**
 * The task needs to be defined with a @task "decorator" in the comment block preceding it
 * @task
 */
function deploy_symlinks_task($d) {
  $d->run("ln -s ~/deploy/drupal/shared/settings.php %s/sites/default/settings.php", $d->latest_release());
  $d->run("ln -s /home/nfs_share/www-data/`whoami`/files %s/sites/default/files", $d->latest_release());
}

/**
 * The task needs to be defined with a @task "decorator" in the comment block preceding it
 * @task
 */
function deploy_update_task($d) {
  $d->run_once("cd ~/public_html && %s updb -y", $d->sites[0]['path-aliases']['%drush-script']);
}


/**
 * The task needs to be defined with a @task "decorator" in the comment block preceding it
 * @task
 */
function deploy_cache_task($d) {
  $d->run_once("cd ~/public_html && %s cc all -y", $d->sites[0]['path-aliases']['%drush-script']);
}
