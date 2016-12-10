var PartsTableManager = function( tableElement, cityModel ) {
  this.tableElement = tableElement;
  this.tableBody = tableElement.querySelector( 'tbody' );
  this.cityModel = cityModel;
};

PartsTableManager.prototype = {
  populateTableWithParts: function( partsArray ) {

    var numberOfRows = partsArray.length / 20;
    console.log( "Populating table with", partsArray.length, "parts" );

    this.tableBody.innerHtml = "";

    for ( var i = 0; i < numberOfRows; i++ ) {
      var tr = htmlHelper.create( 'tr' );
      var city = this.cityModel.getRandomCity();
      var countryTd = htmlHelper.create( 'td', city.country );
      var cityTd = htmlHelper.create( 'td', city.name );
      var partTd = htmlHelper.create( 'td', "?" );
      tr.appendChild( countryTd );
      tr.appendChild( cityTd );
      tr.appendChild( partTd );
      this.tableBody.appendChild( tr );
    };
  }
};
