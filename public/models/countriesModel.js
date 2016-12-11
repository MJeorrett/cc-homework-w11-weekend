var CountriesModel = function( onload ) {
  ajaxHelper.makeGetRequest( "data/countries.json", function( responseObject ) {
    this.countries = responseObject;
    console.log( "New CitiesModel ready with", this.countries.length, "countries" );
    if ( onload ) onload();
  }.bind( this ) );
};

CountriesModel.prototype = {

  numberOfCountries: function() {
    return this.countries.length;
  },

  getRandomCountry: function() {
    var index = Math.round( Math.random() * ( this.numberOfCountries() - 1 ), 0 );
    return this.countries[index];
  }
};
