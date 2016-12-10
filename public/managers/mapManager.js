var MapManager = function( container, defaultCenter, defaultZoom ) {
  this.map = null;
  this.container = container;
  this.defaultCenter = defaultCenter;
  this.defaultZoom = defaultZoom;
  this.countries = null;
  this.marginForError = 1;
  this.geocoder = new google.maps.Geocoder();
};

MapManager.prototype = {

  newMap: function( countries, partCollectedListener ) {

    console.log( "initialising new map with countries:", countries );

    this.partCollectedListener = partCollectedListener;

    this.map = new google.maps.Map(
      this.container,
      {
        center: this.defaultCenter, zoom: this.defaultZoom
      }
    );

    google.maps.event.addListener( this.map, 'click', function( ev ) {

      var latLng = {
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng()
      };
      console.log( "map clicked at:", latLng.lat, ",", latLng.lng, "," );

      this._wasCountryClickedAt(
        latLng,
        function( countryClicked ) {
          if ( countryClicked in countries ) {
            console.log( "country found:", countryClicked );
            this._scatterLego( countries[countryClicked], latLng );
          }
          else {
            console.log( "country clicked:", countryClicked );
          }
        }.bind( this )
      );
    }.bind( this ) );
  },

  _wasCountryClickedAt: function( latlng, onresult ) {
    this.geocoder.geocode( {'location': latlng} , function( results, status ) {
      if (status === 'OK') {
        console.log( "reverse geocoding results:", results );
        if ( results[0] ) {

          var lastResultIndex = results.length - 1;
          var lastResult = results[lastResultIndex];
          var country = lastResult.address_components[0].short_name;
          onresult( country );
        } else {
          console.log('No reverse geocoding results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  },

  _scatterLego: function( partsArray, latLng ) {
    console.log("latLng:", latLng);
    for( var part of partsArray ) {
      this.addMarker({
        lat: latLng.lat + ( Math.random() * 5 ),
        lng: latLng.lng + ( Math.random() * 5 )
      });
    }
  },

  addMarker: function( coords ) {
    console.log("adding marker at:", coords );
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map
    });
  }
};
