<?php
/**
 * @file
 * Template for the 1 column panel layout.
 *
 * This template provides a three column 25%-50%-25% panel display layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   - $content['left']: Content in the left column.
 *   - $content['middle']: Content in the middle column.
 *   - $content['right']: Content in the right column.
 */
?>

<div class="right-sidebar-wrapper container">
  <?php if ($content['content_top_full']):?>
    <div class="panel-panel content-top-full">
      <?php print $content['content_top_full']; ?>
    </div>
  <?php endif ?>
  <div class="right-sidebar-content">
    <?php if ($content['content_top']):?>
      <div class="panel-panel content-top">
        <?php print $content['content_top']; ?>
      </div>
    <?php endif ?>

    <?php if ($content['content_left_top'] || $content['sidebar_right_top']):?>
      <div class="two-column two-column-first clearfix">
        <?php if ($content['content_left_top']):?>
          <div class="panel-panel content__left">
            <?php print $content['content_left_top']; ?>
          </div>
        <?php endif ?>
        <?php if ($content['sidebar_right_top']):?>
          <div class="panel-panel sidebar sidebar-right">
            <?php print $content['sidebar_right_top']; ?>
          </div>
        <?php endif ?>
      </div>
    <?php endif ?>
  </div>
  <?php if ($content['content_bottom']):?>
    <div class="panel-panel content-bottom">
      <?php print $content['content_bottom']; ?>
    </div>
  <?php endif ?>
</div>

