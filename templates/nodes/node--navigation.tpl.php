<?php
/**
 * @file
 * Returns the HTML for a node.
 */
?>
<div class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php
    if ($title_prefix || $title_suffix) {
       print render($title_prefix);
       print render($title_suffix);
    }
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    print render($content['field_col_navigation']);
  ?>
  <div class="social-menu">
    <?php
      // Will Render menu social header on phase3
      // $block = block_load('menu', 'menu-menu-socialize-header');
      // $render_array = _block_get_renderable_array(_block_render_blocks(array($block)));
      // $output = drupal_render($render_array);
      // print $output;
    ?>
  </div>
  <?php
    if (!empty($content['field_link'])) {
      print '<div class="pager-load-more">';
      print render($content['field_link']);
      print '</div>';
    }
  ?>
</div>
