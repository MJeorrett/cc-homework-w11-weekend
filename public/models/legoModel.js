var LegoModel = function() {
};

LegoModel.prototype = {
  init: function( callback ) {
    ajaxHelper.makeGetRequest( 'data/lego_sets.json', function( setsData ) {
      this.data = setsData;
      callback();
    }.bind( this ) );
  },
  numberOfSets: function() {
    return this.data.length;
  },
  getSetWithId: function( setId ) {
    return this.data.find( function( set ) {
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
