var PartsChartManager = function( container, colorsModel ) {
  this.container = container;
  this.colorsModel = colorsModel;
  this.chart = null;
  this.parts = null;
  this.otherThresholdPerc = 0.1; // the percentage of max count below which colors are grouped in other
  this.otherColors = [];
  this.colorsCollected = [];
}

PartsChartManager.prototype = {
  newChartWithParts: function( partsArray ) {

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
        this.otherColors.push( colorCount.name );
        return false;
      }
      return true;
    }.bind( this ) );

    if ( otherCount > 0 ) {
      finalColorCounts.push({ name: 'OTHER', color: 'dodgerblue', count: otherCount });
    }

    this.colorsCollected = finalColorCounts.map( function( colorCount ) {
      return {
        color: colorCount.name,
        numberFound: 0
      };
    });

    // console.log("colorsCollected:", this.colorsCollected );
    // console.log("otherColors:", this.otherColors );

    this.chart = createChart( finalColorCounts, this.container );
  },

  partFound: function( part ) {
    var colorName = part.color_name;

    if ( this.otherColors.includes( colorName ) ) {
      collectedInfo = this.colorsCollected[this.colorsCollected.length - 1];
    }
    else {
      var collectedInfo = this.colorsCollected.find( function( colorInfo ) {
        return colorInfo.color === colorName;
      });
    }

    // collectedInfo.numberFound += parseInt( part.qty );
    collectedInfo.numberFound += 1;
    var seriesIndex = this.colorsCollected.indexOf( collectedInfo );
    this.chart.series[0].data[seriesIndex].update({ y: collectedInfo.numberFound } );
  },

  _getColoursInPartsArray: function( partsArray ) {
    // create object with color names as keys for counts
    var colorCounts = {};
    partsArray.forEach( function( part ) {
      var color = part.color_name;
      // var count = parseInt( part.qty );
      var count = 1;
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
