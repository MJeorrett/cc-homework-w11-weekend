var LegoModel = function( data ) {
  this.data = data;
};

LegoModel.prototype = {
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
    ajaxHelper.makeGetRequest( 'data/example_parts_request.json', function( responseObject ) {
      callback( responseObject );
    });
  }
};
