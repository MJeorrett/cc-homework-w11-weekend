var MapManager = function( container, defaultCenter, defaultZoom ) {
  this.map = null;
  this.container = container;
  this.defaultCenter = defaultCenter;
  this.defaultZoom = defaultZoom;
  this.countries = null;
};

MapManager.prototype = {

  newMap: function( countries, countryClickedListener ) {

    console.log( "initialising new map with countries:", countries );

    this.map = new google.maps.Map(
      this.container,
      {
        center: this.defaultCenter, zoom: this.defaultZoom
      }
    );

    google.maps.event.addListener( this.map, 'click', function( ev ) {
      console.log( "map clicked at:", ev.lat(), ",", ev.lng(), "," );
    });
  },

  addMarker: function( coords ) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map
    });
  }

  // addClickEvent: function() {
  //   , function( event ) {
  //     this.addMarker( event.latLng );
  //   }.bind( this ) );
  // }
};
