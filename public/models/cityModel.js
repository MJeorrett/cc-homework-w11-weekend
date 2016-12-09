var CitiesModel = function( data ) {
  this.data = data;
};

CitiesModel.prototype = {

  numberOfCities: function() {
    return this.data.length;
  },

  getRandomCity: function() {

  }
};
