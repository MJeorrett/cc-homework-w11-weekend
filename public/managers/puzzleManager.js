var PuzzleManager = function ( partsArray, countriesModel, colorsModel ) {
  this.partsPerCountry = 20;
  this.otherThresholdPerc = 0.1; // the percentage of max count below which colors are grouped in other

  this.parts = [];
  var colorCounts = {};

  while ( partsArray.length > 0 ) {
    var country = countriesModel.getRandomCountry();
    var count = 0;

    while ( count < this.partsPerCountry && partsArray.length > 0 ) {
      var part = partsArray.pop();

      if ( part.color_name in colorCounts ) {
        colorCounts[part.color_name]++;
      }
      else {
        colorCounts[part.color_name] = 1;
      }

      var rgbColor = colorsModel.getRGBforColorName( part.color_name );
      part.countryCode = country.alpha2Code;
      part.countryName = country.name;
      part.rgbColor = rgbColor;
      part.found = false;
      this.parts.push( part );
      count++;
    }
  }

  var colorCountValues = [];
  for ( var color of colorCounts ) {
    colorCountValues.push( colorCounts[color] );
  }

  var maxColorCount = Math.max( ...colorCountValues );
  var minForSeparateColor = maxColorCount * this.otherThresholdPerc;
  colorsIncludedInOther = [];

  for ( var color of colorCounts ) {
    if ( colorCounts[color] < minForSeparateColor ) {
      colorsIncludedInOther.push( color );
    }
  }

  this.parts.forEach( function( part ) {
    if ( colorsIncludedInOther.includes( part.color_name ) ) {
      part.color_name = 'OTHER';
      part.rgbColor = 'dodgerblue';
    }
  });
};

PuzzleManager.prototype = {
  logPartFound( part ) {
    part.found = true;
  },

  getPartsBy: function( key ) {
    var resultObject = {};
    for ( var part of this.parts ) {
      var partValue = part[key];
      if ( partValue in resultObject ) {
        resultObject[partValue].push( part );
      }
      else {
        resultObject[partValue] = [ part ];
      }
    }
    return resultObject;
  },

  getPartsByCountryCode: function() {
    return this.getPartsBy( 'countryCode' );
  },

  getPartsByColorName: function() {
    return this.getPartsBy( 'color_name' );
  },

  numberOfPartsFoundForColor: function( colorName ) {
    var parts = this.parts.filter( function( part ) {
      return part.color_name === colorName && part.found;
    });
    return parts.length;
  }
};
