var PartsGraph = function( partsArray ) {
  var colorData = getColoursInPartsArray( partsArray );
  var chartContainer = document.querySelector( '#chart-container' );
  createChart( colorData, chartContainer );
};

var getColoursInPartsArray = function( partsArray ) {
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

  return colorCounts;
};
