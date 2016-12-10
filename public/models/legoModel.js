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
      callback( responseObject );
    });
  }
};
