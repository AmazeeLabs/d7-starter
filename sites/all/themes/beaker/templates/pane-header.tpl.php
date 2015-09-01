<?php
/**
 * @file
 *
 * Theme implementation to display the header block on a Drupal page.
 *
 * This utilizes the following variables that are normally found in
 * page.tpl.php:
 * - $front_page
 * - $logo
 * - $site_name
 * - $site_slogan
 *
 * Additional items can be added via theme_preprocess_pane_header(). See
 * template_preprocess_pane_header() for examples.
 */
?>

<div id="logo">
  <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home">
  <?php if (!empty($logo)): ?>
    <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
  <?php endif; ?>
  </a>
</div>

<div id="name-and-slogan">
  <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home">
  <?php if ($site_name): ?>
    <?php if ($title): ?>
      <div id="site-name"><?php print $site_name; ?></div>
    <?php else: ?>
      <h1 id="site-name">
        <?php print $site_name; ?>
      </h1>
    <?php endif; ?>
  <?php endif; ?>

  <?php if (!empty($site_slogan)): ?>
    <div id="site-slogan"><?php print $site_slogan; ?></div>
  <?php endif; ?>
  </a>
</div>
