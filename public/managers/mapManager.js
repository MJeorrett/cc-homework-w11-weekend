var MapManager = function( container, defaultCenter, defaultZoom ) {
  this.map = null;
  this.container = container;
  this.defaultCenter = defaultCenter;
  this.defaultZoom = defaultZoom;
  this.countries = null;
  this.marginForError = 1;
  this.geocoder = new google.maps.Geocoder();
  this.markers = [];
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
            delete countries[countryClicked];
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
        console.log( "reverse geocoding results received:", results );
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
    for( var part of partsArray ) {
      var marker = this.addMarker(
        {
          lat: latLng.lat + ( Math.random() * 5 ) - 2.5,
          lng: latLng.lng + ( Math.random() * 5 ) - 2.5
        },
        part
      );
      this.markers.push( marker );
    }

    setTimeout( function() {
      var bounds = new google.maps.LatLngBounds();
      this.markers.forEach( function( marker) {
        bounds.extend( marker.getPosition() );
      });
      this.map.fitBounds( bounds );
    }.bind( this ), 1500 );
  },

  addMarker: function( coords, part ) {
    var image = {
      url: part.element_img_url,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(60, 60)
    };

    var marker = new google.maps.Marker({
      position: coords,
      icon: image,
      map: this.map
    });
    marker.legoPart = part;
    var listner = this.partCollectedListener
    google.maps.event.addListener( marker, 'click', function( ev ) {
      listner( this.legoPart );
      this.setMap( null );
    });
    return marker;
  }
};
