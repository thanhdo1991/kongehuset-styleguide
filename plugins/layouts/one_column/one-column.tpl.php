<?php
/**
 * @file
 * Template for the 1 columnumn panel layout.
 *
 * This template provides a three columnumn 25%-50%-25% panel display layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   - $content['left']: Content in the left columnumn.
 *   - $content['middle']: Content in the middle columnumn.
 *   - $content['right']: Content in the right columnumn.
 */
?>

<div class="one-column-wrapper">
  <?php if ($content['content_top']):?>
    <div class="panel-panel one-column-top one-column-item">
      <?php print $content['content_top']; ?>
    </div>
  <?php endif ?>

  <?php if ($content['content_middle']):?>
    <div class="container">
      <div class="panel-panel one-column-middle one-column-item">
        <?php print $content['content_middle']; ?>
      </div>
    </div>
  <?php endif ?>

  <?php if ($content['content_bottom']):?>
    <div class="container">
      <div class="panel-panel one-column-bottom one-column-item">
        <?php print $content['content_bottom']; ?>
      </div>
    </div>
  <?php endif ?>
</div>

