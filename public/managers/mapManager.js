var MapManager = function( container, defaultCenter, defaultZoom ) {
  this.map = null;
  this.container = container;
  this.defaultCenter = defaultCenter;
  this.defaultZoom = defaultZoom;
};

MapManager.prototype = {

  newMap: function() {
    this.map = new google.maps.Map(
      this.container,
      {
        center: this.defaultCenter, zoom: this.defaultZoom
      }
    );
  },

  addMarker: function( coords ) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map
    });
  },

  addClickEvent: function() {
    google.maps.event.addListener( this.map, 'click', function( event ) {
      this.addMarker( event.latLng );
    }.bind( this ) );
  }
};
