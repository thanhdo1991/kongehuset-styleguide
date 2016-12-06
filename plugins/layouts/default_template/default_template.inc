<?php
/**
 * @file
 * implementation of hook_panels_layouts
 */

// Plugin definition.
$plugin = array(
  'title' => t('Default template'),
  'category' => t('Kong layouts'),
  'icon' => 'default_template.png',
  'theme' => 'default_template',
  'theme arguments' => array('id', 'content'),
  'admin css' => 'default_template.css',
  'regions' => array(
    'header_top' => t('Header Top'),
    'header_left' => t('Header Left'),
    'header_middle' => t('Header Middle'),
    'header_right' => t('Header Right'),
    'header_bottom' => t('Header Bottom'),
    'header_behind_top' => t('Header Behind Top'),
    'header_behind_middle' => t('Header Behind Middle'),
    'header_behind_bottom' => t('Header Behind Bottom'),
    'content' => t('Main Content'),
    'content_full' => t('Main Content Full'),
    'footer_bottom' => t('Footer Bottom')
  ),
);

