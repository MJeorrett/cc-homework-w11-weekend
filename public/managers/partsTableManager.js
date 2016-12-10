var PartsTableManager = function( tableElement, countriesModel ) {
  this.tableElement = tableElement;
  this.tableBody = tableElement.querySelector( 'tbody' );
  this.countriesModel = countriesModel;
};

PartsTableManager.prototype = {
  populateTableWithParts: function( partsArray ) {

    var numberOfRows = partsArray.length / 20;
    // console.log( "Populating table with", partsArray.length, "parts" );

    this.tableBody.innerHtml = "";

    for ( var i = 0; i < numberOfRows; i++ ) {
      var tr = htmlHelper.create( 'tr' );
      var country = this.countriesModel.getRandomCountry();
      var nameTd = htmlHelper.create( 'td', country.name );
      var partTd = htmlHelper.create( 'td', "?" );
      tr.appendChild( nameTd );
      tr.appendChild( partTd );
      this.tableBody.appendChild( tr );
    };
  }
};
