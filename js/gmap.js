/*
/* Style Gmap using JSON
*/

(function ($) {
  Drupal.gmap.addHandler('gmap', function(elem) {
    var obj = this;
      obj.bind("boot", function () {
        obj.opts.styles = [
          {
            "featureType": "poi",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "road",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "transit",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "water",
            "stylers": [
              { "visibility": "on" },
              { "color": "#CAD0CC" }
            ]
          },{
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              { "color": "#808080" },
              { "visibility": "on" },
              { "weight": 0.1 }
            ]
          },{
            "featureType": "administrative.country",
            "stylers": [
              { "visibility": "on" },
              { "color": "#808080" },
              { "weight": 0.1 }
            ]
          },{
            "featureType": "landscape",
            "stylers": [
              { "visibility": "on" },
              { "color": "#A5B7B6" }
            ]
          },{
            "featureType": "administrative.province",
            "elementType": "labels",
            "stylers": [
              { "color": "#808080" },
              { "visibility": "on" },
              { "weight": 0.1 }
            ]
          },{
            "featureType": "administrative.locality",
            "stylers": [
              { "visibility": "on" }
            ]
          },{
            "featureType": "administrative.neighborhood",
            "stylers": [
              { "visibility": "on" }
            ]
          },{
            "featureType": "landscape.natural.terrain",
            "stylers": [
              { "visibility": "off" }
            ]
          }
        ]
        obj.map = new google.maps.Map(elem, obj.opts);
      });
    });
})(jQuery);
