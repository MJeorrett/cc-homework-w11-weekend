var populateTableWithParts = function( partsArray, cityModel ) {
  console.log( "populating table with parts:", partsArray );
  var partsTable = document.querySelector( '#parts-table' );
  var partsTableBody = partsTable.querySelector( 'tbody' );
  partsArray.forEach( function( part ) {
    var tr = htmlHelper.create( 'tr' );
    var city = cityModel.getRandomCity();
    var countryTd = htmlHelper.create( 'td', city.country );
    var cityTd = htmlHelper.create( 'td', city.name );
    var partTd = htmlHelper.create( 'td', "?" );
    tr.appendChild( countryTd );
    tr.appendChild( cityTd );
    tr.appendChild( partTd );
    partsTableBody.appendChild( tr );
  });
};
