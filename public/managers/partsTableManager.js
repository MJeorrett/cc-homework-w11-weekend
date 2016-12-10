var PartsTableManager = function( tableElement, countriesModel ) {
  this.tableElement = tableElement;
  this.tableBody = tableElement.querySelector( 'tbody' );
  this.countriesModel = countriesModel;
  this.partsPerCountry = 20;
  this.partsDirectory = {};
};

PartsTableManager.prototype = {
  populateTableWithParts: function( partsArray ) {

    this.partsDirectory = {};
    var numberOfRows = partsArray.length / this.partsPerCountry;
    var tempParts = partsArray.slice();

    this.tableBody.innerHTML = "";
    var countries = {};

    for ( var i = 0; i < numberOfRows; i++ ) {
      var tr = htmlHelper.create( 'tr' );
      var country = this.countriesModel.getRandomCountry();
      var parts = tempParts.splice( -this.partsPerCountry )
      this.partsDirectory[country.alpha3Code] = parts;
      countries[country.alpha2Code] = parts;
      var nameTd = htmlHelper.create( 'td', country.name );
      var partTd = htmlHelper.create( 'td', "0 / " + parts.length.toString() );
      tr.appendChild( nameTd );
      tr.appendChild( partTd );
      this.tableBody.appendChild( tr );
    };

    console.log("parts directory created:", this.partsDirectory);
    return countries;
  }
};
