/*
 * Add Drupal functions
 */
/*jslint browser: true*/
/*global $, jQuery, Drupal, Modernizr, enquire*/

(function (window, document, $, Drupal) {
  //"use strict";
  var mobileOnly = "screen and (max-width:47.9375em)", // 767px.
  mobileTabletOnly = "screen and (max-width:73.6875em)", // // max-width: 1179px
  tabletOnly = "screen and (max-width: 73.6875em) and (min-width: 48em)", // min-width: 768px and max-width: 1180px.
  mobileLandscape = "(min-width:30em)", // 480px.
  tablet = "(min-width:48em)", // 768px.
  desktop = "(min-width:73.75em)"; // 1180px.
  var windowWd = $(window).width();
      heightWd = $(window).outerHeight(true);
  // JS head main menu
  Drupal.behaviors.configMegamenu = {
    attach: function () {
      $('body').once('configMegamenu', function(){
        var body = $('body'),
          kongMenu = $(".pane-kon-pages-kongehuset-mega-menu"),
          linkMenu = kongMenu.find('.link').children('span');

        linkMenu.off('click');
        linkMenu.click(function(){
          var megaMenu = $('.mega-menu'),
            nextMegaMenu = $(this).nextAll('.mega-menu');

          if(nextMegaMenu.hasClass('active')) {
            body.removeClass('overflowHidden');
            nextMegaMenu.removeClass('active');
            $(this).children().addClass('icon-angle-down').removeClass('icon-angle-up');
          }
          else {
            if(megaMenu.hasClass('active')) {
              megaMenu.removeClass('active');
              $('.icon-angle-up').addClass('icon-angle-down').removeClass('icon-angle-up');
            }
            else {
              body.addClass('overflowHidden');
            }
            nextMegaMenu.addClass('active');
            $(this).children().addClass('icon-angle-up').removeClass('icon-angle-down');
            body.addClass('overflowHidden');
          }
        });
      });
    }
  };

  // Background image.
  Drupal.behaviors.imgBackground = {
    attach: function () {
      $('.js-bg-image').once('backgroundImg', function() {
          var imgSrc = $(this).find('img').attr('src');
          $(this).css({'background-image': 'url("'+ imgSrc + '")'});
      });
    }
  };

  // Config slide box image.
  Drupal.behaviors.configSlideBoxImage = {
    attach: function () {
      $('.js-slide-image .view-content').once('BoxImage', function() {
        $(this).slick({
          draggable: false,
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                draggable: true,
              }
            }
          ]
        });
      });
    }
  };

  // Config slide gallery.
  Drupal.behaviors.configSlideGallery = {
    attach: function () {
      $('.js-slide-gallery .view-content').once('SlideGallery',function() {
        $(this).slick({
          infinite: false,
          adaptiveHeight: true,
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 471,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }
          ]
        });

        function heightGallery() {
          var galleryItem = $('.box-slide-gallery__item'),
            maxHeight = 0;

          $('.box-slide-gallery__image').each(function(index){
            var maxHeights = $(this).outerHeight(true);

            if(maxHeights > maxHeight){
              maxHeight = maxHeights;
            }
          });

          var halpMaxHeight = maxHeight/2;
          galleryItem.each(function(){
            var heightThis = $(this).find('.box-slide-gallery__image img').outerHeight(true);
            if (heightThis < maxHeight) {
              var halpHeightThis = heightThis/2,
                top = halpMaxHeight - halpHeightThis;
              $(this).find('.box-slide-gallery__image img').css({'margin-top': top});
            }
            else if ((heightThis >= maxHeight)) {
              $(this).find('.box-slide-gallery__image img').css({'margin-top': 0});
            }
          });
        }

        if (windowWd >= 480) {
          setTimeout(heightGallery, 5000);
        }
      });
    }
  };

  // Js load item by ajax box grid content.
  Drupal.behaviors.listGridContent = {
    attach: function (context, settings) {
      // Load more items
      if($(context).hasClass('box-grid-content')) {
        $('.js-animate').addClass('fadeInUp animated');
      }
    }
  };

  Drupal.behaviors.extratitle = {
    attach: function (context, settings) {
      var subMenHolder = $('.submenholder');
      if(subMenHolder.length) {
        $('body').addClass('extra-title');
      }
    }
  };

  // Image hover.
  Drupal.behaviors.hoverImage = {
    attach: function () {
      $('.box-field-image__item').each(function() {
        var elem = $(this),
           item = $(this).find('.box-field-image__content');

        elem.on('mouseover', function(e) {
          var title = elem.find('.field-name-field-mediadescription');
          var titletext = elem.find('.field-name-field-file-image-title-text');
          if (title.length || titletext.length) {
            item.addClass('is-hover');
          }
        });
      });
    }
  };

  // Config slide box Month.
  Drupal.behaviors.configSlideMonth = {
    attach: function () {
      $('.js-box-slide-month').once('SlideMonth', function(){
        $(this).slick({
         infinite: true,
         adaptiveHeight: true,
         speed: 270,
         responsive: [
            {
              breakpoint: 768,
              settings: {
                dots: false,
                arrows: true
              }
            }
          ]
       });
      });
    }
  };

  // Js fix footer.
  Drupal.behaviors.fixedFooter = {
    attach: function () {
      var heightWindow = $(window).height(),
      heightbody = $('body').height();

      if(heightbody < heightWindow){
        $('.footer').addClass('footer-fix');
        $('body').css('padding-bottom','180px');
      }
      else {
        $('.footer').removeClass('footer-fix');
        $('body').css('padding-bottom','0');
      }
    }
  };

  // Config slide box filter.
  Drupal.behaviors.tabFilter = {
    attach: function () {
      // Trim word with height 250px;
      var $blockFilter = $('.box-filter'),
        $blockFilterSelect = $('.box-filter__select', $blockFilter),
        $blockFilterSelected = $('.box-filter__selected', $blockFilter),
        $blockFiltersItem = $('.box-filter__select__item', $blockFilter),
        $blockFilterContentItem = $('.box-filter__content__item', $blockFilter),
        $contentBlockFilter = $('.box-filter__contents__content',$blockFilter),
        $readMoreFilter = $('.box-filter__contents__link', $blockFilter);
      var jsBlockFilterSelected = function() {
        $(this).parents('.box-filter__filter').find('.box-filter__select').toggleClass('active');
      };

      $('.js-box-filter__selected').on('click', jsBlockFilterSelected);

      var jsBlockFilter = function(e) {
         e.preventDefault();
        var $this = $(this),
          tabIndex = $this.data("index"),
          $blockFilter = $this.closest('.box-filter'),
          $blockFilterSelect = $('.box-filter__select', $blockFilter),
          $blockFilterSelected = $('.box-filter__selected', $blockFilter),
          $blockFiltersItem = $('.box-filter__select__item', $blockFilter),
          $blockFilterContentItem = $('.box-filter__content__item', $blockFilter);

        $blockFilterSelected.text(function() {
          return $this.text();
        });
        $blockFiltersItem.removeClass('active');
        $blockFilterContentItem.removeClass('active');
        $blockFiltersItem.eq(tabIndex).addClass('active');
        $blockFilterContentItem.eq(tabIndex).addClass('active');
        $blockFilterSelect.removeClass('active');
      };

      $('.js-box-filter__select__item').on('click', jsBlockFilter);

      $blockFiltersItem.each(function() {
        var index = $blockFiltersItem.index( this ),
        $heightContentFilter = $contentBlockFilter.eq(index).outerHeight();
        if($heightContentFilter > 400) {
          $blockFilterContentItem.eq(index).addClass('has-height');
          $blockFilterContentItem.eq(index).find('.box-filter__contents__link').removeClass('hidden');
        }
      });

      $contentBlockFilter.find('.js-read-more').click(function() {
        var thisText = Drupal.t('See more'),
          closeText = Drupal.t('Close');

        if(!$(this).hasClass('showing')) {
          $(this).parents($blockFilterContentItem).removeClass('has-height');
          $(this).text(closeText);
          $(this).addClass('showing');
        }
        else {
          $(this).parents($blockFilterContentItem).addClass('has-height');
          $(this).text(thisText);
          $(this).removeClass('showing');
        }
      });

      // Hide when click body.
      $(document).click(function (e) {
        var container = $(".box-filter__selected"),
          containerShow = $('.box-filter__select');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          containerShow.removeClass('active');
        }
      });
    }
  };

  // Hover effect
   Drupal.behaviors.hoverEffect = {
    attach: function () {
      var top_mobile = 0;

      if ($(window).width() < 992) {
        top_mobile = 15;
      } else if($(window).width() >= 992) {
        top_mobile = 30;
      }

      var grid_img_item = $('.component--demo .box-grid-image--1 .box-grid-image__item');
      grid_img_item.each(function(){
        var box_content = $(this).find('.box-grid-image__content');
        var position_content = box_content.position();
        var this_top = position_content.top;

        $(this).find('.box-grid-image__content').hover(
          function() {
            $(this).animate({
              top: top_mobile
            }, 100);
          }, function() {
            $(this).animate({
              top: this_top
            }, 100);
          }
        );
      });
    }
  }

  // js submenu bihaevial
  Drupal.behaviors.configMegamenuSub = {
    attach: function () {
      $('.pane-kon-pages-kongehuset-secondary-menu .submenu-item h3').each(function(){
        if($(this).next().hasClass('menu-block-wrapper')){
          $(this).addClass('angle-down');
        }

        $(this).click(function(){
          if($(this).next().hasClass('active')){
            $(this).next().removeClass('active');
          }
          else {
            $('.pane-kon-pages-kongehuset-secondary-menu .submenu-item .menu-block-wrapper').removeClass('active');
            $(this).next().addClass('active');
          }

        });
      });
    }
  };

  // News list click icon
  Drupal.behaviors.viewmode1 = {
    attach: function () {
      $('.switch-viewmode').once('SwitchViewmode1', function (){
        $(this).find('.grid').addClass("active");
        $(this).find('.grid').on('click', function(e) {
          if (!$(".grid-and-list-style.panel-new-list .view-aktuelt").hasClass('box-grid-content')){
            $(".grid-and-list-style.panel-new-list .view-aktuelt").removeClass('box-list-content').addClass('box-grid-content');
            $('.switch-viewmode .list').removeClass('active');
            $(this).addClass("active");

            $('.box-grid-content .view-content').masonry({
              itemSelector: '.box-grid-content__item'
            });
          }
          e.preventDefault();
        });

        $(this).find('.list').on('click', function(e) {
          if ($(".grid-and-list-style.panel-new-list .view-aktuelt").hasClass('box-grid-content')){
            $(".grid-and-list-style.panel-new-list .view-aktuelt").removeClass('box-grid-content').addClass('box-list-content');
            $('.switch-viewmode .grid').removeClass('active');
            $(this).addClass('active');
            $('.box-grid-content .view-content').masonry('destroy');
          }
          e.preventDefault();
        });
      });
    }
  };

  // News list click icon
  Drupal.behaviors.viewmode = {
    attach: function () {
      $('.switch-viewmode').once('SwitchViewmode', function (){
        $(this).find('.grid').on('click', function(e) {
          var switch_viewmode_click = $(this).parents('.grid-and-list-style').find('.view-aktuelt');
          if (!switch_viewmode_click.hasClass('box-grid-content')){
            switch_viewmode_click.removeClass('box-list-content').addClass('box-grid-content');
            // $('.box-grid-content .view-content').masonry({
            //   itemSelector: '.box-grid-content__item'
            // });
            $('.switch-viewmode .list').removeClass('active');
            $(this).addClass("active");
          }
          e.preventDefault();
        });

        $(this).find('.list').on('click', function(e) {
          var switch_viewmode_click = $(this).parents('.grid-and-list-style').find('.view-aktuelt');
          if (switch_viewmode_click.hasClass('box-grid-content')){
            switch_viewmode_click.removeClass('box-grid-content').addClass('box-list-content');
            $('.box-grid-content .view-content').masonry('destroy');
            $('.switch-viewmode .grid').removeClass('active');
            $(this).addClass('active');
          }
          e.preventDefault();
        });
      });
    }
  };

  // js submenu bihaevial
  Drupal.behaviors.select = {
    attach: function () {
      $("select").selectpicker();
    }
  };

  // js submenu bihaevial
  Drupal.behaviors.scrollSelectMenu = {
    attach: function () {
      var sticky = $('.submenholder');
      if(sticky.length) {
        var headerMain = $('.header__main'),
          headerBehindx = $('.header__behind'),
          stickyOffset = sticky.offset().top,
          headerMainBottomOffset = headerMain.offset().top + headerMain.outerHeight(),
          headerBehindxBottomOffset = headerBehindx.offset().top + headerBehindx.outerHeight();

        function switch_submenholder() {
          var scroll = $(window).scrollTop(),
              distanceHeader = headerMainBottomOffset - headerBehindxBottomOffset - scroll;
          if(distanceHeader >= 3) {
            sticky.css('margin-top', -scroll);
            sticky.removeClass('fixed');
          } else {
            sticky.addClass('fixed');
          }
          if(scroll < 5) {
            sticky.removeClass('fixed');
          }
        }

        switch_submenholder();
        $(window).scroll(function(){
          switch_submenholder();
        });
      }
    }
  };

  // Royalline.
  Drupal.behaviors.Royalline = {
    attach: function () {
      $(window).load(function() {
        showVisibleMonarchs();
        toggleImages();
        royallineYear();
      });

      $(window).resize(function() {
          showVisibleMonarchs();
          toggleImages();
          royallineYear();
      });

      $(window).scroll(function() {
          showVisibleMonarchs();
      });

      $('.royalline__monarch').click(function(event) {
        if(!$(this).hasClass('royalline__monarch--expand')) {
          event.preventDefault();
          $('.royalline__monarch--expand').removeClass('royalline__monarch--expand royalline__monarch--show-content');
          var monarch =  $(this);
          monarch.addClass('royalline__monarch--expand');
          setTimeout(function() {
              monarch.addClass('royalline__monarch--show-content');
          }, 200);
        }
      });

      $('.royalline__monarch__close, .royalline__monarch__toggle').on('click', function(event) {
        if($(this).parents('.royalline__monarch--expand').length) {
          event.preventDefault();
          event.stopPropagation();
          var monarch = $(this).parents('.royalline__monarch');
          monarch.removeClass('royalline__monarch--show-content');
          setTimeout(function() {
               monarch.removeClass('royalline__monarch--expand');
          }, 200);
        }
      });

      function royallineYear() {
        $(".royalline__monarch__end-year").each(function() {
          var royallineYearWidth = $(this).outerWidth();
          console.log(royallineYearWidth);
          $(this).css('margin-left', - royallineYearWidth / 2);
        });
      }

      function showVisibleMonarchs() {
        var scrollBottom = $(window).scrollTop() + $(window).height();
        $('.royalline__monarch').each(function() {
          if($(this).position().top < scrollBottom - 100) {
            $(this).addClass('royalline__monarch--reveal');
          }
        });
      }

      function toggleImages() {
        if($(window).width() < 768) {
          $('.royalline__monarch__image').each(function() {
            $(this).css('background-image', $(this).attr('data-small-image'));
          });
        } else {
          $('.royalline__monarch__image').each(function() {
            $(this).css('background-image', $(this).attr('data-large-image'));
          });
        }
      }
    }
  };

  // js submenu bihaevial
  Drupal.behaviors.homeScroll = {
    attach: function () {
      var homeBanner = $('.pane-node-field-media-front-header'),
        headerMain = $('.header__main'),
        headerBehindx = $('.header__behind'),
        homeBannerOffset = 50;


      if(homeBanner.length) {
        homeBannerOffset = homeBanner.offset().top + homeBanner.outerHeight();
      }
      // Add class header_sticky for headerMain
      //headerMain.addClass('header__sticky');
      function switch_header(animate) {
        var scroll = $(window).scrollTop(),
            distanceHeader = homeBannerOffset - scroll,
            animateIn,
            animateOut;

            if(animate) {
              animateIn = 'animated slideInDown';
              animateOut = 'animated slideOutUp';
            }

        if(distanceHeader >= 0 || $('.mega-menu').hasClass('active')) {
          if(!headerMain.hasClass('header__sticky')) {
            headerMain.removeClass('header__hide');
            headerMain.addClass('header__sticky ' + animateIn);
            headerBehindx.addClass(animateOut);

            setTimeout(function(){
              headerMain.removeClass('animated slideInDown ');
              headerBehindx.removeClass(animateOut);
            }, 500);
          }
        } else {
          if(headerMain.hasClass('header__sticky')) {
            headerMain.addClass(animateOut+' header__hide');
            headerBehindx.addClass(animateIn);

            setTimeout(function(){
              headerMain.removeClass('header__sticky '+ animateOut);
              headerBehindx.removeClass(animateIn);
            }, 500);
          }
        }
        headerBehindx.addClass('header__sticky');
      }

      switch_header(false);
      $(window).scroll(function(){
        switch_header(true);
      });
    }
  };

  // js menu-mobile
  Drupal.behaviors.menumobile = {
    attach: function () {

      var menuMobile = $('.pane-kon-pages-kongehuset-menu-mobile'),
        body = $('html'),
        mainContent = $('.main-wrapper');

      if(!menuMobile.children(".icon-cross").length) {
        menuMobile.prepend('<span class="icon-cross close-menu">Close menu</span>');
        $("body").prepend('<span class="icon-dehaze open-menu show-only--mobile">Open menu</span>');
      }

      var closeMenu = $('.close-menu'),
          openMenu = $('.open-menu'),
          mainContent = $('.main-wrapper, .header__sticky, .open-menu, .submenholder');

      openMenu.off('click');
      openMenu.click(function(){
        var WidthWindow = $(window).width(),
            heightWindow = $(window).height(),
            widthMenuMobile = WidthWindow * .5;

        // Change width of menu in small mobile
        if(WidthWindow <= 414) {
          widthMenuMobile = WidthWindow * .8;
        }

        mainContent.animate({
          "left": widthMenuMobile
        });
        menuMobile.width(widthMenuMobile).animate({
          "left": '0'
        });
        body.addClass('overflowHidden menu-mobile--active');

        menuMobile.css({
          "height": heightWindow,
        });
      });

      closeMenu.off('click');
      closeMenu.click(function(){
        mainContent.animate({
          left: '0'
        });
        menuMobile.animate({
          "left": '-100%'
        }, function() {
          body.removeClass('overflowHidden menu-mobile--active');
        });
      });

      var resizeTimer;
      $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          if(body.hasClass('menu-mobile--active')) {
            closeMenu.trigger('click');
          }
        }, 250);
      });

    }
  };

  // js menu-mobile item
  Drupal.behaviors.menumobileitem = {
    attach: function () {

      var menuMobileItem = $('.menu-mobile-item .toggle-submenu');

      menuMobileItem.off('click');
      menuMobileItem.click(function(event){
        event.preventDefault();
        var subMenuActive = $(this).next(),
          thisParent = $(this).parent();
        subMenuActive.slideToggle();
        thisParent.toggleClass('active-item');
      });
    }
  };

  // News list click icon
  Drupal.behaviors.itemnewpage = {
    attach: function () {
      var itemhasimg = $('.js-grid-item').find('.box-grid-content__image');
      $('.js-grid-item').each(function() {
        if(!$(this).find('.box-grid-content__image').length){
          $(this).find(".box-grid-content__wrap-content").addClass('box-grid-content__has-border-top');
        }
      });
    }
  };

  // search
  Drupal.behaviors.search__filter = {
    attach: function () {
      $('.search-filter .box-filter__selected').on('click', function(e) {
        var search_activeclass = $(this).parents('.box-filter__filter').find('.box-filter__select');
        if(search_activeclass.hasClass("active")){
          $('.search-filter .box-filter__select').removeClass('active');
        }
        else {
          $('.search-filter .box-filter__select').removeClass('active');
          search_activeclass.addClass('active');
        }
      });

      $('<button class="reset-search">close</button>').prependTo('.pane-search-box .search-form');
      $('.reset-search').on('click', function(e) {
        $('.search-form .form-item .form-text').attr('value', '');
      });

      // $('.search-form .form-text').attr('placeholder','Indtast søgeord');
      var hieghtselectview = $('.list-search').height();
      var selectheightbefore = $('box-filter__select').height();
      if(hieghtselectview < selectheightbefore){
        $('.search-filter .box-filter__select').css('max-height',hieghtselectview);
      }

    }
  };

  // News list click icon
  Drupal.behaviors.heightVideoYoutube = {
    attach: function () {
      function heigtIframe(classname) {
        var iframe = $(classname);

        iframe.each(function(){
          var widthIframe = $(this).width();
          $(this).css('height', widthIframe * 588 / 1045);
        });
      }

      heigtIframe('.media-youtube-player');
      heigtIframe('.media-vimeo-player');
      $(window).resize(function() {
        heigtIframe('.media-youtube-player');
        heigtIframe('.media-vimeo-player');
      });
    }
  };

  // Js calendar and month.
  Drupal.behaviors.actionMonthCalendar = {
    attach: function () {
      $('.pane-kon-event-page-kon-calendar').once('actionMonthCalendar', function() {
        if($('.pane-kon-event-page-kon-calendar').length) {
          var kalenderOfsetTop = $('.pane-kon-event-page-kon-calendar').offset().top;
        }

        $('.js-show-list-calendar .switch-to-calendar-list').click(function() {
          $('.pane-event-month').removeClass('element-invisible');
          $('.pane-calendar-event-month, .pane-calendar-event-day').addClass('element-invisible');
          $(this).parent().addClass('element-invisible');
          $('.wrap-switch-calender').addClass('is-show');

          $('body, html').animate({
            scrollTop: kalenderOfsetTop - 110
          }, 800);
        });

        $('.js-show-list-calendar .switch-to-calendar-mini').click(function () {
          $('.pane-group-event').removeClass('element-invisible');
          $('.wrap-switch-list').removeClass('element-invisible');
          $('.wrap-switch-list').addClass('no-margin');
          $('.pane-event-month').addClass('element-invisible');
          $('.pane-calendar-event-month, .pane-calendar-event-day').removeClass('element-invisible');
          $(this).parent().removeClass('is-show');
        });
      });
    }
  };

  // Js ReadMore calendar.
  Drupal.behaviors.readMoreCalendar = {
    attach: function (context, settings) {
      var closeText = "Close";
      if($(".i18n-da").length) {
        closeText = "Luk";
      }

      $('.js-read-more-calender', context).once('readmore-click').click(function(e) {
        e.preventDefault();

        var thisText = 'Se dagens øvrige kalenderpunkter';
        if(!$(this).hasClass('showing')) {
          thisText = $(this).text();
          $('.views-row.hidden').addClass('show');
          $(this).text(closeText);
          $(this).addClass('showing');
        }
        else {
          $('.views-row.hidden').removeClass('show');
          $(this).text(thisText);
          $(this).removeClass('showing');
        }
      });
    }
  };

  //Js Custom scroll bar New list page.
  Drupal.behaviors.scrollbarnewpage = {
    attach: function (context, settings) {
      $('.dropdown-menu.inner, .search-filter .box-filter__select').mCustomScrollbar({
        autoHideScrollbar: true
      });
    }
  };

  // Js Custom scroll bar Organisation
  Drupal.behaviors.scrollbarorganisation = {
    attach: function (context, settings) {
      var heightscrollContent = $('.box-filter__content').height();
      var heightscrollContentselect = $('.box-filter__select').height();
      if(heightscrollContent < heightscrollContentselect){
        $('.box-filter__select').css('height', heightscrollContent);
        $('.box-filter__select').mCustomScrollbar();
      }
    }
  };

  // Js fix footer.
  Drupal.behaviors.fixMosaicScroll = {
    attach: function () {
      // Scroll bar content
      $('.box-grid-image__content-inner').mCustomScrollbar({
        autoHideScrollbar: true
      });

      function setHeightMosaic() {

        // Height title
        $('.box-grid-image__title').each(function(){
          var contentThis = $(this).closest('.box-grid-image__content'),
            heightTitle = $(this).height();

          //alert(heightTitle);
          if (heightTitle > 45) {
            contentThis.addClass('three-line');
          }
          else if (heightTitle > 25  ) {
            contentThis.addClass('two-line');
          }
        });

        var mosaicInner = $('.box-grid-image__content-inner');
        mosaicInner.each(function(){
          var thisHeight = $(this).height(),
            thisSpace = $(this).closest('.box-grid-image__content').outerHeight(true) - $(this).closest('.box-grid-image__content').height(),
            prentHeight = $(this).closest('.box-grid-image__item').height() - thisSpace;
          if(thisHeight > prentHeight) {
            $(this).height(prentHeight);
          }
        });

        $('.box-grid-image__content-inner').mCustomScrollbar('update');
      }

      setTimeout(setHeightMosaic, 5000);

      var resizeTimer;
      $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          $('.box-grid-image__content-inner').removeAttr('style');
          $('.box-grid-image__content').removeClass('three-line two-line');
          setHeightMosaic();
        }, 250);
      });

    }
  };

  // Height image.
  Drupal.behaviors.heightImage = {
    attach: function () {

      var heightImg = function() {
        if (windowWd > 1024) {
          var heightWindow = $(window).height(),
          heightHeader = $('.header__main').outerHeight(true);
          $('.js-full-height').css({'height': heightWindow - heightHeader});
        }
        else {
          $('.js-full-height').css({'height': 'inherit'});
        }
      }

      var heightImgresize = function() {
        $(window).resize(function() {
          var windowWt = $(window).width();
          if (windowWt > 1024) {
            var heightWindow = $(window).height(),
            heightHeader = $('.header__main').outerHeight(true);
            $('.js-full-height').css({'height': heightWindow - heightHeader});
          }
          else {
            $('.js-full-height').css({'height': 'inherit'});
          }
        });
      }

      heightImg();
      heightImgresize();
    }
  };

  // Scroll animate.
  Drupal.behaviors.scrollAnimate = {
    attach: function () {
      $('body').once('scrollAnimate', function() {
        var heightMenu = $('.header__main').outerHeight(true);
        $('.js-scroll-animate').on('click', function(e) {
          e.preventDefault();

          var id = $(this).attr('href');
          $('body, html').animate({
            scrollTop: $(id).offset().top - heightMenu
          }, 800);
        });

        // Add effect.
        function AnimateFadeIn() {
          if($('.js-animate').length){
            $('.js-animate').each( function(i) {
              var animateOfsetTop = $(this).offset().top;

              if(animateOfsetTop < heightWd) {
                $(this).addClass('fadeInUp animated');
              }
            });
          }

          $(window).scroll( function(){
            var anChorLink = $('.js-scroll-animate'),
             windowScrollBottom = $(window).scrollTop() + $(window).height(),
             windowScrollTop = $(window).scrollTop();

            if(anChorLink.length) {
              $('.js-scroll-animate').removeClass('active');
              anChorLink.each(function(){
                var id = $(this).attr('href'),
                 anChorLinkTop = $(id).offset().top - 200;
                if(anChorLinkTop < windowScrollTop) {
                  $('.js-scroll-animate').removeClass('active');
                  $(this).addClass('active');
                }
              });
            }

            $('.js-animate').each( function(i) {
                var bottom_of_object = $(this).offset().top + 20;

                if( windowScrollBottom > bottom_of_object ){
                  $(this).addClass('fadeInUp animated');
                  $(this).animate({'opacity':'1'});
                }
            });
          });
        }

        if (windowWd > 1024) {
          AnimateFadeIn();
        }
        else {
          $('.js-animate').removeClass('fadeInUp animated');
          $('.js-animate').css({'opacity':'1'});
        }
      });
    }
  };

  Drupal.behaviors.instagramFacebook = {
      attach: function () {
      // Hide and Show social block.
      var heightInstagramFacebook = $(window).outerHeight(true) - $('.box-social-news__title').outerHeight(true);
     //alert(heightInstagramFacebook);
     var FacebookIframe = $('.box-social-news__content').find('iframe'),
        FacebookSrc = FacebookIframe.attr('src');
      FacebookIframe.attr('src',FacebookSrc+'&height='+heightInstagramFacebook);
      $('.fb-page').attr('data-height',heightInstagramFacebook);

      $('.js-social-news i').off('click');
      $('.js-social-news i').click(function(){
        var thisParent = $(this).parent();
        thisParent.toggleClass('active');
        if(thisParent.hasClass('active')) {
          thisParent.removeClass('hide');
        }
        else {
          thisParent.addClass('hide');
        }
      });
    }
  };

}(this, this.document, this.jQuery, this.Drupal));
