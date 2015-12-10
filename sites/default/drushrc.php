<?php

if (getenv('AMAZEEIO_SITE_URL')) {
  $options['uri'] = 'http://' . getenv('AMAZEEIO_SITE_URL');
}

$options['package-handler'] = 'git_drupalorg';
$options['gitsubmodule'] = TRUE;
#$command_specific['sql-sync'] = array('no-cache' => TRUE, 'no-ordered-dump' => TRUE, 'create-db' => FALSE);
$command_specific['rsync'] = array('verbose' => TRUE);
