<?php
/**
 * @file
 * implementation of hook_panels_layouts
 */

// Plugin definition.
$plugin = array(
  'title' => t('Layout one column'),
  'category' => t('Kong layouts'),
  'icon' => 'one_column.png',
  'theme' => 'one_column',
  'css' => 'one_column.css',
  'regions' => array(
    'content_top' => t('Content Top'),
    'content_middle' => t('Content Middle'),
    'content_bottom' => t('Content Bottom')
  ),
);

