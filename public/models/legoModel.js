var LegoModel = function( onload ) {
  ajaxHelper.makeGetRequest( "data/lego_sets.json", function( responseObject ) {
    this.legoSets = responseObject;
    console.log( "New LegoModel ready with", this.legoSets.length, "lego sets" );
    if ( onload ) onload();
  }.bind( this ) );
};

LegoModel.prototype = {
  numberOfSets: function() {
    return this.legoSets.length;
  },
  getSetWithId: function( setId ) {
    return this.legoSets.find( function( set ) {
      return set.id === setId;
    });
  },
  getPartsForSet: function( setId, callback ) {
    var set = this.getSetWithId( setId );
    // ajaxHelper.makeGetRequest( 'data/example_parts_request.json', function( responseObject ) {
    //   callback( responseObject );
    // });
    ajaxHelper.makeGetRequest( "https://rebrickable.com/api/get_set_parts?key=" + apiKey + "&format=json&set=" + set.id, function( responseObject ) {
      var parts = responseObject[0].parts;
      parts = shuffle( parts );
      callback( parts );
    });
  }
};

// taken from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
