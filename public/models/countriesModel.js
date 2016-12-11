var CountriesModel = function( onload ) {
  ajaxHelper.makeGetRequest( "data/countries.json", function( responseObject ) {
    this.countries = responseObject;
    this.tempCountries = responseObject.slice();
    console.log( "New CitiesModel ready with", this.countries.length, "countries" );
    if ( onload ) onload();
  }.bind( this ) );
};

CountriesModel.prototype = {

  numberOfCountries: function() {
    return this.countries.length;
  },

  resetRandomGenerator() {
    this.tempCountries = this.countries.slice();
  },

  getRandomCountry: function() {
    if ( this.tempCountries.length === 0 ) {
      console.log( "There are no more countries left, repopulating list" );
      this.tempCountries = this.countries.slice();
    }
    var index = Math.round( Math.random() * ( this.tempCountries.length - 1 ), 0 );
    return this.tempCountries[index];
  }
};
