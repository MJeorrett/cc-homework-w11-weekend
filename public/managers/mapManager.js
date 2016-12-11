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
      // console.log( "map clicked at:", latLng.lat, ",", latLng.lng, "," );

      this._wasCountryClickedAt(
        latLng,
        function( countryClicked ) {
          if ( countryClicked in countries ) {
            console.log( "country found:", countryClicked );
            this._scatterLego( countryClicked, countries[countryClicked], latLng );
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
          console.log( 'No reverse geocoding results found' );
        }
      } else {
        console.log( 'Geocoder failed due to:', status );
      }
    });
  },

  _scatterLego: function( countryCode, partsArray, latLng ) {
    console.log("scattering parts:", partsArray );
    var currentMarkers = [];
    for( var part of partsArray ) {
      this._addMarker(
        countryCode,
        {
          lat: latLng.lat + ( Math.random() * 5 ) - 2.5,
          lng: latLng.lng + ( Math.random() * 5 ) - 2.5
        },
        part,
        function( marker ) {
          this.markers.push( marker );
          currentMarkers.push( marker );
          if ( partsArray.indexOf( part ) === partsArray.length - 1 ) {
            zoomMap();
          }
        }.bind( this )
      );
    };

    var zoomMap = function() {
      setTimeout( function() {
        var bounds = new google.maps.LatLngBounds();
        currentMarkers.forEach( function( marker) {
          bounds.extend( marker.getPosition() );
        });
        this.map.fitBounds( bounds );
      }.bind( this ), 1500 );
    }.bind( this );
  },

  _addMarker: function( countryCode, coords, part, onadded ) {
    this._getPartImageUrl( part, function( partImageUrl ) {
      // console.log( "image found at:", partImageUrl );
      var image = {
        url: partImageUrl,
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
      var markers = this.markers;
      var listner = this.partCollectedListener
      google.maps.event.addListener( marker, 'click', function( ev ) {
        listner( countryCode, this.legoPart );
        this.setMap( null );
        var markerIndex = markers.indexOf( this );
        markers.splice( markerIndex, 1 );
      });
      onadded( marker );
    }.bind( this ) );
  },

  _getPartImageUrl: function( part, onfind ) {
    var legoUrl = "http://cache.lego.com/media/bricks/5/1/" + part.element_id + ".jpg";

    var legoImageResult = function() {
      // console.log( "lego image size:", this.width, "x", this.height );
      if ( this.width > 10 && this.height > 10 ) {
        onfind( legoUrl );
      }
      else {
        // console.log( "no lego image found, trying brickset...");
        tryBrickSetImage();
      }
    };

    var legoImage = new Image();
    legoImage.onload = legoImageResult;
    legoImage.onerror = legoImageResult;
    legoImage.src = legoUrl;

    var tryBrickSetImage = function() {
      var bricksetUrl = part.element_img_url;

      bricksetImageResult = function() {
        // console.log("bricksetImage:",this );
        if ( this.width > 10 && this.height > 10 ) {
          onfind( bricksetUrl );
        }
        else {
          // console.log( "no brickset element img found, trying part..." );
          tryBrickSetPartImage();
        }
      }

      var bricksetImage = new Image();
      bricksetImage.onload = bricksetImageResult;
      bricksetImage.onerror = bricksetImageResult;
      bricksetImage.src = bricksetUrl;
    }

    var tryBrickSetPartImage = function() {
      var bricksetPartUrl = part.part_img_url;

      bricksetPartImageResult = function() {
        if ( this.width > 10 && this.height > 10 ) {
          onfind( bricksetPartUrl );
        }
        else {
          console.log( "no image found for part:", part );
        }
      }

      var bricksetPartImage = new Image();
      bricksetPartImage.onload = bricksetPartImageResult;
      bricksetPartImage.onerror = bricksetPartImageResult;
      bricksetPartImage.src = bricksetPartUrl;
    }
  }
};
