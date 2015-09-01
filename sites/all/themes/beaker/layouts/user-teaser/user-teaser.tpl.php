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

<div class="user-teaser" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <?php if($content['image']) : ?>
  <div class="image-wrapper">
      <?php print $content['image']; ?>
  </div>
  <?php endif; ?>
  <?php if($content['details']) : ?>
  <div class="details-wrapper">
      <?php print $content['details']; ?>
  </div>
  <?php endif; ?>
</div>
