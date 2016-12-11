var PartsManager = function ( parts, callback ) {
  this.partsPerCountry = 20;
  var colorsModelLoaded = false;
  var countriesModelLoaded = false;

  this.colorsModel = new ColorsModel( function() {
    colorsModelLoaded = true;
    if ( countriesModelLoaded ) { setUpPartsList() }
  });

  this.countriesModel = new CountriesModel( function() {
    countriesModelLoaded = true;
    if ( colorsModelLoaded ) { setUpPartsList() }
  });

  var setUpPartsList = function() {
    var numberOfCountries = partsArray.length / this.partsPerCountry;
    this._data = [];

    for (var i = 0; i < numberOfCountries; i++ ) {
      var countryAlpha2Code = countriesModel.getRandomCountry().alpha2Code;
      var partsForCountry = partsArray.splice( -this.partsPerCountry );
      this._data.[countryAlpha2Code] = {
        partsNotFound: partsForCountry,
        totalParts: partsForCountry.length
      };
    }

    callback();
  };
};

PartsManager.prototype = {
  partsForCountry = function( countryAlpha2Code )
}
