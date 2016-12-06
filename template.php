<?php

/**
 * Add body classes if certain regions have content.
 */
function kong_preprocess_html(&$variables) {
  if (!empty($variables['page']['featured'])) {
    $variables['classes_array'][] = 'featured';
  }

  if (!empty($variables['page']['triptych_first'])
    || !empty($variables['page']['triptych_middle'])
    || !empty($variables['page']['triptych_last'])) {
    $variables['classes_array'][] = 'triptych';
  }

  if (!empty($variables['page']['footer_firstcolumn'])
    || !empty($variables['page']['footer_secondcolumn'])
    || !empty($variables['page']['footer_thirdcolumn'])
    || !empty($variables['page']['footer_fourthcolumn'])) {
    $variables['classes_array'][] = 'footer-columns';
  }
  $delta = 'subholder';
  $subholder = module_invoke('panels_mini', 'block_view', 'subholder');
  if (!empty($subholder['content'])) {
      $variables['classes_array'][] = 'page-has-subholder';
  }

  $meta_refresh = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
       'name' => 'viewport',
       'content' => 'width=device-width, initial-scale=1.0',
    ),
  );
  // Add meta on header.

  drupal_add_html_head($meta_refresh, 'meta_refresh');
  // Add conditional stylesheets for IE
  drupal_add_css(path_to_theme() . '/css/ie.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'lte IE 7', '!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css(path_to_theme() . '/css/ie6.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 6', '!IE' => FALSE), 'preprocess' => FALSE));
}

/**
 * Override or insert variables into the page template for HTML output.
 */
function kong_process_html(&$variables) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

/**
 * Override or insert variables into the page template.
 */
function kong_process_page(&$variables) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_page_alter($variables);
  }
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name']   = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
  // Since the title and the shortcut link are both block level elements,
  // positioning them next to each other is much simpler with a wrapper div.
  if (!empty($variables['title_suffix']['add_or_remove_shortcut']) && $variables['title']) {
    // Add a wrapper div using the title_prefix and title_suffix render elements.
    $variables['title_prefix']['shortcut_wrapper'] = array(
      '#markup' => '<div class="shortcut-wrapper clearfix">',
      '#weight' => 100,
    );
    $variables['title_suffix']['shortcut_wrapper'] = array(
      '#markup' => '</div>',
      '#weight' => -99,
    );
    // Make sure the shortcut link is the first item in title_suffix.
    $variables['title_suffix']['add_or_remove_shortcut']['#weight'] = -100;
  }
}

/**
 * Implements hook_preprocess_maintenance_page().
 */
function kong_preprocess_maintenance_page(&$variables) {
  // By default, site_name is set to Drupal if no db connection is available
  // or during site installation. Setting site_name to an empty string makes
  // the site and update pages look cleaner.
  // @see template_preprocess_maintenance_page
  if (!$variables['db_is_active']) {
    $variables['site_name'] = '';
  }
  drupal_add_css(drupal_get_path('theme', 'kong') . '/css/maintenance-page.css');
}

/**
 * Override or insert variables into the maintenance page template.
 */
function kong_process_maintenance_page(&$variables) {
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name']   = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
}

/**
 * Override or insert variables into the node template.
 */
function kong_preprocess_node(&$variables) {
  $node = $variables['node'];
  $humman_node_name = node_type_get_name($node);
  $variables['node_name_human'] = $humman_node_name;
  $node_type = i18n_string_translate('node:type:'.$node->type.':name', $humman_node_name);
  if (!empty($node_type)) {
    $variables['node_name_human'] = $node_type;
  }
  if ($variables['view_mode'] == 'full' && node_is_page($variables['node'])) {
    $variables['classes_array'][] = 'node-full';
  }

  $variables['published_at'] = format_date($node->published_at, 'custom', 'd. F Y');
  if ($node->language != 'da') {
    $variables['published_at'] = format_date($node->published_at, 'custom', 'd F Y');
  }

}

/**
 * Override or insert variables into the block template.
 */
function kong_preprocess_block(&$variables) {
  // In the header region visually hide block titles.
  if ($variables['block']->region == 'header') {
    $variables['title_attributes_array']['class'][] = 'element-invisible';
  }
}

/**
 * Implements theme_menu_tree().
 */
function kong_menu_tree($variables) {
  return '<ul class="menu clearfix">' . $variables['tree'] . '</ul>';
}

/**
 * Implements theme_field__field_type().
 */
function kong_field__taxonomy_term_reference($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h3 class="field-label">' . $variables['label'] . ': </h3>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '"' . $variables['attributes'] .'>' . $output . '</div>';

  return $output;
}

/**
 * Implements template_preprocess_views_view_unformatted().
 */
function kong_preprocess_views_view_unformatted(&$vars) {
  $view = $vars['view'];
  $rows = $vars['rows'];
  if ($view->name == 'node_revision' && $view->current_display == 'panel_pane_1') {
    foreach ($vars['classes_array'] as $key => $value) {
      $vars['classes_array'][$key] = $value. ' '. 'box-list-media__item';
    }
  }

  if ($view->name == 'node_revision' && $view->current_display == 'panel_pane_2') {
    foreach ($vars['classes_array'] as $key => $value) {
      $vars['classes_array'][$key] = $value. ' '. 'box-field-image__item';
    }
  }

  if ($view->name == 'node_revision' && $view->current_display == 'panel_pane_7') {
    foreach ($vars['classes_array'] as $key => $value) {
      $vars['classes_array'][$key] = $value. ' '. 'box-slide-gallery__item';
    }
  }

  if ($view->name == 'node_revision' && $view->current_display == 'panel_pane_3') {
    foreach ($vars['classes_array'] as $key => $value) {
      $vars['classes_array'][$key] = $value. ' '. 'slide-image__item';
    }
  }

  if ($view->name == 'node_revision' && $view->current_display == 'panel_pane_6') {
    foreach ($vars['classes_array'] as $key => $value) {
      $vars['classes_array'][$key] = $value. ' '. 'box-video__item';
    }
  }
}

/**
 * Implements theme_menu_link().
 */
function kong_menu_link(&$vars) {
  $kongehuset_menu = variable_get('kongehuset_menu', array());
  $element = $vars['element'];
  $original_link = $element['#original_link'];
  $sub_menu = '';
  $output = '';
  if (isset($original_link['kongehuset_mega_menu']) && !empty($original_link['kongehuset_mega_menu'])) {
    $node = node_load($original_link['kongehuset_mega_menu']);
    if (!empty($node)) {
      $node_render = node_view($node);
      $sub_menu = '<div class="mega-menu">' . drupal_render($node_render) . '</div>';
      $output .= '<span><i class="icon-angle-down"></i></span>';
    }
  }elseif ($element['#below'] ) {
    $sub_menu = '<span class="toggle-submenu"></span>';
    $sub_menu .= drupal_render($element['#below']);
  }

  if ($element['#title'] == 'Logo') {
    $element['#localized_options']['html'] = TRUE;
    $logo_path = theme_get_setting('logo');
    $output .= l('<img src=" ' . $logo_path . ' " />', $element['#href'], $element['#localized_options']);
  }else {
    $output .= l($element['#title'], $element['#href'], $element['#localized_options']);
  }
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}


/**
 * Implements theme_preprocess_field().
 */
function kong_preprocess_field(&$vars) {
  $element = $vars['element'];
  if ($element['#field_name'] == 'field_left_collumn') {
    //Render field collection field_tabbed_content inside field_left_collumn
    $object = $element['#object'];

    $vars['field_tabbed_content'] = array();
    if (isset($object->field_tabbed_content)) {
      $vars['field_tabbed_content'] =  field_view_field($element['#entity_type'], $object, 'field_tabbed_content', array('type' => 'field_collection_fields', 'settings' => array('viewmode' => 'full'), 'label' => 'hidden'));
    }
  }
}

/**
 * Implements template_preprocess_panels_pane
 */
function kong_preprocess_panels_pane(&$vars) {
  $pane = $vars['pane'];
  if ($pane->subtype == 'box_banner' && $pane->type == 'panels_mini') {
    $context = $vars['display']->context;
    foreach ($context as $key => $context_item) {
      if (in_array('node', $context_item->type)) {
        $node = $context_item->data;
        break;
      }
    }
    if (isset($node)) {
      $image_style = field_get_items('node', $node, 'field_image_style');
      if (!empty($image_style)) {
        $vars['classes_array'][] = $image_style[0]['value'];
      }
    }
  }

  if ($pane->subtype == 'subholder' && $pane->type == 'panels_mini') {
    $mini_panel = panels_mini_load('subholder');
    $panes_rendered = $mini_panel->display->renderer_handler->rendered['panes'];
    foreach ($mini_panel->display->content as $key => $item) {
      if ($item->subtype == 'kon_pages-kongehuset_secondary_menu'
        || $item->subtype == 'kon_paragraphs-node_paragraph_anchor_links') {
        $panes[$item->subtype] = $item->pid;
      }
    }
    if (isset($panes['kon_pages-kongehuset_secondary_menu'])
       && isset($panes_rendered[$panes['kon_pages-kongehuset_secondary_menu']])
       && isset($panes['kon_paragraphs-node_paragraph_anchor_links'])
       && isset($panes_rendered[$panes['kon_paragraphs-node_paragraph_anchor_links']])) {
      $vars['classes_array'][] = 'submenu-anchorlink';
    }elseif (isset($panes['kon_paragraphs-node_paragraph_anchor_links'])
       && isset($panes_rendered[$panes['kon_paragraphs-node_paragraph_anchor_links']])) {
      $vars['classes_array'][] = 'submenholder';
    }
  }

  if ($pane->subtype == 'node:field_arrangementsdato' && $pane->type == 'entity_field') {
    if (isset($vars['content'][0])) {
      $humman_node_name = node_type_get_name($vars['content']['#object']);
      $node_type = i18n_string_translate('node:type:'.$vars['content']['#object']->type.':name', $humman_node_name);
      if (!empty($node_type)) {
        $vars['content'][0]['#markup'] = '<p>' . $vars['content'][0]['#markup'] . '<span>|</span>' . $node_type. '</p>';
      }else {
        $vars['content'][0]['#markup'] = '<p>' . $vars['content'][0]['#markup'] . '<span>|</span>' . $humman_node_name. '</p>';
      }

    }
  }
}

/**
 * Override render search api sort list.
 */
function kong_search_api_sorts_list($vars) {
  $items = $vars['items'];
  $options = $vars['options'];

  if (!empty($items)) {
    $sort_items = array();
    $item_active = t('Sort');
    foreach ($items as $item) {
      $variables = array(
        'text' => $item['#name'],
        'path' => $item['#path'],
        'options' => $item['#options'],
      );

      $sort_items[] = array(
        'class' => array('box-filter__select__item'),
        'data' => theme('link', $variables),
      );

      if ($item['#active']) {
        $item_active = $item['#name'];
      }
    }

    $options['attributes']['class'][] = 'box-filter__select';

    $list_items = theme('item_list', array('items' => $sort_items) + $options);

    return theme('kon_links_select', array(
      'items' => $list_items,
      'item_active' => $item_active
    ));
  }

  return '';
}

/**
 * Add js custom specify for Gmap.
 */
function kong_preprocess_gmap_view_gmap(&$vars) {
  drupal_add_js(drupal_get_path('theme', 'kong') . '/js/gmap.js', array(
    'type' => 'file',
    'scope' => 'footer',
    'group' => JS_THEME,
    'weight' => -1,
  ));
}

