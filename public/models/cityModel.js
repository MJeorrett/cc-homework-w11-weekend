var CitiesModel = function( data ) {
  this.data = data;
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
