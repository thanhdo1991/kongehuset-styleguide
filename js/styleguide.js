(function (window, document, $) {
  $.getJSON("fonts/selection.json", function (data) {
    var items = [];

    $.each(data.icons, function (key, value) {
      items.push('<li>' +
        '<span class="icon_apeareance icon-' + value.properties.name + '"></span>' +
        '<span class="icon-class-name">icon-' + value.properties.name + '</span>' +
        '</li>');
    });

    $("<ul/>", {
      "class": "icon-list",
      html: items.join("")
    }).appendTo($('#icons'));
  });

  //Show/hide code
  $(".show-code").click(function() {
    $(this).next(".component--source").toggleClass("element-invisible");
  });
  $(".hide-code").click(function() {
    $(this).parent(".component--source").addClass("element-invisible");
    $('html, body').animate({
      scrollTop: $(this).parents(".component--item").offset().top
    }, 500);
  });

  //List components
  $(".component--list--item a").click(function(){
    $(".component--list--item a").removeClass("active");
    $(this).addClass("active");
  });
  $(".show-list").click(function(){
    $(".component--list").addClass("active");
    $(".show-list").hide();
    $(".hide-list").addClass("active").show();
  });
  $(".hide-list").click(function(){
    $(".component--list").removeClass("active");
    $(".hide-list").removeClass("active").hide();
    $(".show-list").show();
  });
}(this, this.document, this.jQuery));
