<section class="royalline">
  <ul class="royalline__monarch-list">
    <?php foreach($items as $key => $item): ?>
      <?php
        $url_image = image_style_url('timeline', $item['avatar']['data']['uri']);
      ?>
      <li class="royalline__monarch <?php print !empty($item['point_name']) ? 'has-to-point' : '' ?>">
        <?php if(!empty($item['point_name'])): ?>
          <span class="royalline__monarch__end-year"><?php print $item['point_name']; ?></span>
        <?php endif ?>
        <div class="royalline__monarch__content">
          <div class="royalline__monarch__close"><span class="icon-cross">&nbsp;</span></div>
          <div class="royalline__monarch__toggle">
            <span class="icon-cross royalline__monarch__toggle__expand">&nbsp;</span>
            <span class="icon-cross royalline__monarch__toggle__close">&nbsp;</span>
          </div>
          <div class="royalline__monarch__image" data-large-image="<?php print $url_image ?>" data-small-image="<?php print $url_image; ?>" style="background-image: url(<?php print $url_image; ?>);">
            <?php if (!empty($item['avatar']['photographer'])): ?>
              <span class="royalline__monarch__image__credit"><?php print t('Foto: @photographer', array('@photographer' => $item['avatar']['photographer'])) ?></span>
            <?php endif ?>
          </div>
          <h3 class="royalline__monarch__name">
            <?php
              print $item['title'];
            ?>
          </h3>
          <span class="royalline__monarch__period"><?php print $item['subtitle']; ?></span>
          <div class="royalline__monarch__description">
            <?php print $item['description']; ?>
            <?php
              if (!empty($item['link'])) {
                $title = t('Read more');
                if (!empty($item['link']['title'])) {
                  $title = $item['link']['title'];
                }
                print l($title, $item['link']['url']);
              }
            ?>
          </div>
        </div>
      </li>
    <?php endforeach; ?>
  </ul>
</section>
