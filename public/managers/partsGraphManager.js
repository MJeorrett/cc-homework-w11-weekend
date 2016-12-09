var PartsGraph = function( partsArray ) {
  console.log( getColoursInPartsArray( partsArray ) );
};

var getColoursInPartsArray = function( partsArray ) {
  var usedColors = [];
  partsArray.forEach( function( part ) {
    var color = part.color_name;
    if ( !usedColors.includes( color ) ) {
      usedColors.push( color );
    }
  });

  return usedColors;
};
