<?php
/**
 * @file
 * This template provides a very simple "one column" panel display layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   $content['middle']: The only panel in the layout.
 */
?>

<div class="site-wrapper" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <header role="banner" class="header">
    <div class="inner">
      <?php print $content['header']; ?>
    </div>
  </header>
  <main role="main" class="main">
    <?php if($content['content_top']) : ?>
    <div class="main-top-wrapper">
      <div class="inner">
        <?php print $content['content_top']; ?>
      </div>
    </div>
    <?php endif; ?>
    <?php if($content['content']) : ?>
    <div class="main-wrapper">
      <div class="inner">
        <?php print $content['content']; ?>
      </div>
    </div>
    <?php endif; ?>
    <?php if($content['content_bottom']) : ?>
    <div class="main-bottom-wrapper">
      <div class="inner">
        <?php print $content['content_bottom']; ?>
      </div>
    </div>
    <?php endif; ?>
  </main>
  <footer role="contentinfo" class="footer">
    <div class="inner">
      <?php print $content['footer']; ?>
    </div>
  </footer>
</div>
