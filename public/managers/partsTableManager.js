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
      countries[country.alpha2Code] = parts;
      var nameTd = htmlHelper.create( 'td', country.name );
      var partTd = htmlHelper.create( 'td', "0 / " + parts.length.toString() );
      tr.appendChild( nameTd );
      tr.appendChild( partTd );
      this.tableBody.appendChild( tr );

      this.partsDirectory[country.alpha2Code] = {
        td: partTd,
        totalParts: parts.length,
        partsUncollected: parts
      };
    };

    console.log( "parts directory created:", this.partsDirectory );
    return countries;
  },

  partCollected: function( countryCode, part ) {
    var countryData = this.partsDirectory[countryCode];
    var partIndex = countryData.partsUncollected.indexOf( part );
    countryData.partsUncollected.splice( partIndex, 1 );
    var partsCollected = countryData.totalParts - countryData.partsUncollected.length;
    countryData.td.innerText = partsCollected.toString() + " / " + countryData.totalParts;

    console.log("parts remaining:", countryData.partsUncollected);
  }
};
