var PartsChartManager = function( container, colorsModel ) {
  this.container = container;
  this.colorsModel = colorsModel;
  this.chart = null;
  this.parts = null;
  this.otherThresholdPerc = 0.1; // the percentage of max count below which colors are grouped in other
}

PartsChartManager.prototype = {
  newChartWithParts: function( partsArray ) {
console.log( "partsArray:", partsArray)
    this.parts = partsArray;

    var rawColorCounts = this._getColoursInPartsArray( partsArray );

    var counts = rawColorCounts.map( function( rawColorCount ) {
      return rawColorCount.count;
    });

    var maxCount = Math.max( ... counts );
    var otherCount = 0;
    var otherThreshold = maxCount * this.otherThresholdPerc;
    var finalColorCounts = rawColorCounts.filter( function( colorCount ) {
      if ( colorCount.count < otherThreshold ) {
        otherCount += colorCount.count;
        return false;
      }
      return true;
    });

    if ( otherCount > 0 ) {
      finalColorCounts.push({ name: 'OTHER', color: 'dodgerblue', count: otherCount });
    }
    console.log( "finalColorCounts:", finalColorCounts );
    this.chart = createChart( finalColorCounts, this.container );
  },

  _getColoursInPartsArray: function( partsArray ) {
    // create object with color names as keys for counts
    var colorCounts = {};
    partsArray.forEach( function( part ) {
      var color = part.color_name;
      var count = parseInt( part.qty );
      if ( color in colorCounts ) {
        colorCounts[color] += count;
      }
      else {
        colorCounts[color] = count;
      }
    });

    // map this to an array of obejct each with an rgb color and count
    var rgbColorCounts = [];
    Object.keys( colorCounts ).forEach( function( colorName ) {
      var dataPoint = {
        name: colorName,
        color: this.colorsModel.getRGBforColorName( colorName ),
        count: colorCounts[colorName]
      };
      rgbColorCounts.push( dataPoint );
    }.bind( this ) );

    return rgbColorCounts;
  }
};
