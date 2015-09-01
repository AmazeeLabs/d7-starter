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

<div class="content-wrapper" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <?php if($content['content_top']) : ?>
  <div class="content-top">
    <div class="inner">
      <?php print $content['content_top']; ?>
    </div>
  </div>
  <?php endif; ?>
  <?php if($content['content']) : ?>
  <div class="content">
    <div class="inner">
      <?php print $content['content']; ?>
    </div>
  </div>
  <?php endif; ?>
  <?php if($content['content_bottom']) : ?>
  <div class="content-bottom">
    <div class="inner">
      <?php print $content['content_bottom']; ?>
    </div>
  </div>
  <?php endif; ?>
</div>
