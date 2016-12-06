/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
    tabletLandscape = "(min-width:71.86em)"; // 992px.

    // Enquire usage:
    // enquire.register(tablet, {
    //   match: function () {
    //     $(window).on('resize', hander).resize();
    //   },
    //   unmatch : function () {
    //     $(window).on('resize', hander);
    //   },
    // });

    // Add js box hero
    var heightWindow = $(window).height();
    var widthWindow = $(window).width();
    var linkImg = $('.box-hero__image img').attr('src');
    $('.box-hero__image').css({'background-image': 'url("'+ linkImg + '")', 'height': heightWindow});

    // Add  functionality here.
    $('.js-slide-gallery').slick({
      infinite: false,
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
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    });

    // Js slide image
     $('.js-slide-image').slick({
       infinite: false,
       adaptiveHeight: false,
       draggable: false,
     });
     var hieghtSlide = $('.js-slide-image > .slick-list').height();
     if(widthWindow > 1200){
      $('.js-slide-image > .slick-list .slide-image__item ').css('height',hieghtSlide);
     }

    // Js slide image
     $('.js-box-slide-month').slick({
       infinite: false,
       speed: 270,
       responsive: [
          {
            breakpoint: 768,
            settings: {
              dots: true,
              arrows: false
            }
          }
        ]
     });

     // Js slide calender
    $( ".js-datepicker" ).datepicker({
      inline: true,
      numberOfMonths: 12
    });

    var widthItemCalender = $('.js-slide-calender .hasDatepicker').width();
    $('.ui-datepicker-inline .ui-datepicker-group').css('width', widthItemCalender);
    $('<div class="next control"></div><div class="prev control"></div>').prependTo('div.hasDatepicker ');
    $('div.hasDatepicker .ui-datepicker-group-first').addClass('active');
    $('.ui-datepicker-row-break').remove();

    var widthItem = -widthItemCalender,
        transform = 0,
        soitemCalender = $(".js-datepicker .ui-datepicker-group").length;

    $('.hasDatepicker .control').on('click', function() {
      var curentCalendar = $(this).closest(".box-slide-calender"),
       curentActive = curentCalendar.find('.active'),
      indexActive = curentActive.index();
      curentActive.removeClass('active');
      if($(this).hasClass('next')) {
        if (indexActive == soitemCalender -1) {
          curentCalendar.find('.ui-datepicker-group-first').addClass('active');
        }
        else {
          curentActive.next().addClass('active');
        }
      }
      else if($(this).hasClass('prev')) {
        if( indexActive == 0) {
          curentCalendar.find('.ui-datepicker-group-last').addClass('active');
        }
        else {
          curentActive.prev().addClass('active');
        }
      }
      var newIndexActive = curentCalendar.find('.active').index();
      transform = newIndexActive * widthItem;
      $('.hasDatepicker .ui-datepicker-inline ').css({"transform": "translateX(" + transform + "px)"});
    });

    // Hide and Show social block.
    $('.js-social-news i').click(function(){
      $(this).parent().toggleClass('active');
    });

    // Add js height window fix
    var heightWindow = $(window).height();
    $('.js-fullHeight').css({'height': heightWindow});

    var gallery_item = $('#box-slide-gallery .component--demo .box-slide-gallery__item');
    var maxHeight = Math.max.apply(null, $("#box-slide-gallery .component--demo .box-slide-gallery__image").map(function (){
      return $(this).height();
    }).get());

    var halp_maxHeight = maxHeight/2;

    gallery_item.each(function(){
      var height_this = $(this).find('.box-slide-gallery__image').outerHeight();
      if (height_this < maxHeight) {
        halp_height_this = height_this/2;
        var top = halp_maxHeight- halp_height_this;
        $(this).find('.box-slide-gallery__image').css({'margin-top': top});
      }
      else if ((height_this >= maxHeight)) {
        $(this).find('.box-slide-gallery__image').css({'margin-top': 0});
      }
    });

    // Add effect.
    window.sr = ScrollReveal().reveal('.js-grid-item');


    // Js user timeline
    var timeLineHeaderItem = $('.box-user--timeline__header .box-user--timeline__item'),
      timeLineContentItem = $('.box-user--timeline__content .box-user--timeline__item');
      timeLineContentItem.click(function() {
        timeLineHeaderItem.removeClass('active');
        var index = timeLineContentItem.index( this );
        timeLineHeaderItem.eq(index).addClass('active');
      });

      $('.box-user--timeline__header .box-user--timeline__item.active').click(function (){
        $(this).removeClass('active');
      });

    // Load more items.
    var loadItems = function(e) {
      e.preventDefault();
      var $this = $(this),
        $container = $this.parents('.js-more-items'),
        itemsShowDesktop = e.data.itemsShowDesktop;
        $container.find('.block-month__content__item.js-appear').toggleClass('hidden');
    };
    $('.js-more-items__block-month').on(
      'click',
      {
        itemsShowDesktop: 3
      },
      loadItems
    );

  $('.js-box-overlay-hover').on({
    mouseenter: function () {
      $('.box-overlay__content').addClass('active');
    },
    mouseleave: function () {
      $('.box-overlay__content').removeClass('active');
    }
  });

  // Height selected.
  var heightSelected = $('.box-filter__selected').outerHeight(true);
  $('.box-filter__select').css('top', heightSelected + 20 );

  // Filter.
  var $heightDefaultFilter = 250,
    $blockFilter = $('.box-filter'),
    $blockFilterSelect = $('.box-filter__select', $blockFilter),
    $blockFilterSelected = $('.box-filter__selected', $blockFilter),
    $blockFiltersItem = $('.box-filter__select__item', $blockFilter),
    $blockFilterContentItem = $('.box-filter__content__item', $blockFilter),
    $contentBlockFilter = $('.box-filter__contents__content',$blockFilter),
    $readMoreFilter = $('.box-filter__contents__link', $blockFilter);
  var jsBlockFilterSelected = function() {
    $blockFilterSelect.toggleClass('active');
  };
  $('.js-box-filter__selected').on('click', jsBlockFilterSelected);
  var jsBlockFilter = function(e) {
    e.preventDefault();
    var $this = $(this),
      tabIndex = $(this).data("index");
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
    index = $blockFiltersItem.index( this ),
    $heightContentFilter = $contentBlockFilter.eq(index).outerHeight();
    if($heightContentFilter > 400) {
      $blockFilterContentItem.eq(index).addClass('has-height');
    }
    $contentBlockFilter.eq(index).find('.js-read-more').click(function() {
      $(this).parents($blockFilterContentItem).removeClass('has-height');
    });
  });

  // js foooter
  var heightWindow = $(window).height();
  var heightbody = $('body').height();
  if(heightbody < heightWindow){
    $('footer.footer').addClass('footer-fix');
  }
  else {
    $('footer.footer').removeClass('footer-fix');
  }

    // JS head main menu
    $('<span><i class="icon-angle-down"></i></span>').insertBefore('.kongehuset-mega-menu .pane-content > ul.menu > li.first > a');
    $('<span><i class="icon-angle-down"></i></span>').insertBefore('.kongehuset-mega-menu .pane-content > ul.menu > li.last > a');
    $(".kongehuset-mega-menu .pane-content > ul.menu > li > a").each(function(){
        $(this).hover(function(){
          $('.kongehuset-mega-menu .pane-content > ul.menu .mega-menu').removeClass('active');
            $(this).next().addClass('active');
        });
    });

    $(".kongehuset-mega-menu .pane-content > ul.menu > li > span").each(function(){
        $(this).click(function(){
            $(this).next().next().toggleClass('active');
        });
    });
}(this, this.document, this.jQuery));
