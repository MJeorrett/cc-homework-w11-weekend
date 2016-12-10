var CitiesModel = function( onload ) {
  ajaxHelper.makeGetRequest( "data/cities.json", function( responseObject ) {
    this.cities = responseObject;
    console.log( "New CitiesModel ready with", this.cities.length, "cities" );
    if ( onload ) onload();
  }.bind( this ) );
};

CitiesModel.prototype = {

  numberOfCities: function() {
    return this.data.length;
  },

  getRandomCity: function() {
    var index = Math.round( Math.random() * this.numberOfCities(), 0 );
    return this.data[index];
  }
};
