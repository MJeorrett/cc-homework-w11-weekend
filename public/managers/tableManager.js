var TableManager = function( tableElement, partsByCountryName ) {
  this.tableElement = tableElement;
  this.tableBody = tableElement.querySelector( 'tbody' );

  this.tableBody.innerHTML = "";

  var countryNames = Obejct.keys( partsByCountryName );

  for ( var countryName of countryNames ) {
    var tr = htmlHelper.create( 'tr' );
    var parts = partsByCountryCode[countryCode];
    var nameTd = htmlHelper.create( 'td', countryName );

    var totalParts = parts.length;
    var partsTd = htmlHelper.create( 'td', "0 / " + totalParts.toString() );
    partsTd.partsFound = 0;
    partsTd.totalParts = totalParts;

    parts.forEach( function( part ) {
      part.tableCell = partTd;
    });

    tr.appendChild( nameTd );
    tr.appendChild( partTd );
    this.tableBody.appendChild( tr );
  };
}

TableManager.prototype = {
  updatePartFound: function( part ) {
    var td = part.tableCell;
    var partsFound = td.partsFound + 1;
    var totalParts = td.totalParts;
    td.innerText = partsFound.toString() + " / " + totalParts.toString();
  }
};
