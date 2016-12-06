<?php
/**
 * @file
 * implementation of hook_panels_layouts
 */

// Plugin definition.
$plugin = array(
  'title' => t('Two columns with right sidebar'),
  'category' => t('Kong layouts'),
  'icon' => 'right_sidebar.png',
  'theme' => 'right_sidebar',
  'theme arguments' => array('id', 'content'),
  'admin css' => 'right_sidebar.css',
  'regions' => array(
    'content_top_full' => t('Content Top'),
    'content_top' => t('Content Top Inner'),
    'content_left_top' => t('Content'),
    'sidebar_right_top' => t('Sidebar'),
    'content_bottom' => t('Content Bottom'),
  )
);

