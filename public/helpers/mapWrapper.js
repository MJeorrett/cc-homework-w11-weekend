var MapWrapper = function( container, center, zoom ) {
  this.googleMap = new google.maps.Map(
    container,
    {
      center: center, zoom: zoom
    }
  );
};

MapWrapper.prototype = {

  addMarker: function( coords ) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
  },

  addClickEvent: function() {
    google.maps.event.addListener( this.googleMap, 'click', function( event ) {
      this.addMarker( event.latLng );
    }.bind( this ) );
  }
};
