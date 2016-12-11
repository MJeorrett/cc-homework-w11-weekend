var MapManager = function( container, defaultCenter, defaultZoom, countryClickedListener, partCollectedListener ) {
  this.defaultCenter = defaultCenter;
  this.defaultZoom = defaultZoom;
  this.marginForError = 1;
  this.partCollectedListener = partCollectedListener;

  this.map = new google.maps.Map(
    this.container,
    {
      center: this.defaultCenter,
      zoom: this.defaultZoom
    }
  );

  google.maps.event.addListener( this.map, 'click', function( ev ) {
    var latLng = {
      lat: ev.latLng.lat(),
      lng: ev.latLng.lng()
    };
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( {'location': latlng} , function( results, status ) {
      if (status === 'OK') {
        console.log( "reverse geocoding results received:", results );
        if ( results[0] ) {
          var lastResultIndex = results.length - 1;
          var lastResult = results[lastResultIndex];
          var country = lastResult.address_components[0].short_name;
          countryClickedListener( countryCode, latLng );
        }
      } else {
        console.log( 'Geocoder failed due to:', status );
      }
    });
  });
}

MapManager.prototype = {
  refresh: function() {
    this.map.setCenter( this.defaultCenter );
    this.map.setZoom( this.defaultZoom );
    this.markers.forEach( function( marker ) {
      marker.setMap( null );
    });
    this.markers = [];
  },

  scatterLego: function( parts, latLng ) {
    console.log( "scattering parts:", partsGroup );
    var currentMarkers = [];
    for( var part of partsArray ) {
      this._addLeoPart(
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

    setTimeout( function() {
      this.zoomMapToMarkers( currentMarkers );
    }.bind( this ), 1500 );
  },

  zoomMapToMarkers: function( markersArray ) {
    if ( !markersArray ) var markersArray = this.markers;
    var bounds = new google.maps.LatLngBounds();
    markersArray.forEach( function( marker) {
      bounds.extend( marker.getPosition() );
    });
    this.map.fitBounds( bounds );
  },

  _addLegoPart: function( countryCode, coords, part, onadded ) {
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
}
