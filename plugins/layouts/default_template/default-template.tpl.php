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

<div class="main-wrapper">
  <header class="header">
    <div class="header__main show-only--desktop">
      <div class="div-shadow">
        <div class="container">
          <?php if ($content['header_top']): ?>
            <div class="header__top"><?php print $content['header_top']; ?></div>
          <?php endif; ?>
          <?php if ($content['header_left']): ?>
            <div class="header__left"><?php print $content['header_left']; ?></div>
          <?php endif; ?>
          <?php if ($content['header_middle']): ?>
            <div class="header__right"><?php print $content['header_middle']; ?></div>
          <?php endif; ?>
          <?php if ($content['header_right']): ?>
            <div class="header__center clearfix">
              <div class="header_logo">
                <?php print $content['header_right']; ?></div>
              </div>
          <?php endif; ?>
        </div>

        <?php if ($content['header_bottom']) : ?>
          <div class="header__bottom clearfix">
            <div class="container"><?php print $content['header_bottom']; ?></div>
          </div>
        <?php endif; ?>
      </div>

    </div>
    <div class="header__behind">
      <div class="div-shadow">
        <?php if ($content['header_behind_top']): ?>
          <div class="header__behind__top"><div class="container"><?php print $content['header_behind_top']; ?></div></div>
        <?php endif; ?>
        <?php if ($content['header_behind_middle']): ?>
          <div class="header__behind__middle show-only--desktop"><div class="container"><?php print $content['header_behind_middle']; ?></div></div>
        <?php endif; ?>
        <?php if ($content['header_behind_bottom']): ?>
          <div class="header__behind__bottom show-only--desktop"><div class="container"><?php print $content['header_behind_bottom']; ?></div></div>
        <?php endif; ?>
      </div>
    </div>
  </header>
  <main class="main-content">
    <?php if ($content['content']): ?>
      <div class="container"><?php print $content['content']; ?></div>
    <?php endif ?>
  </main>
  <main class="main-content-full">
    <?php if ($content['content_full']): ?>
      <?php print $content['content_full']; ?>
    <?php endif ?>
  </main>
  <footer class="footer" >
    <div class="footer__top">
      <div class="footer__inner">
        <div class="footer__logo"><img src="/sites/all/themes/kong/images/footer-logo.svg" width="114" height="43" alt="Kong"></div>
        <div class="copyright">COPYRIGHT 2016<br><?php print t('THE DANISH MONARCHY') ?><br>&copy;</div>
      </div>
    </div>
    <div class="footer__bottom"><div class="container"><?php print $content['footer_bottom']; ?></div></div>
  </footer>
</div>
