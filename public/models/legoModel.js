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
    var url = "https://rebrickable.com/api/get_set_parts"
        url += "?key=" + apiKey;
        url += "&format=json";
        url += "&set=" + set.id;

    ajaxHelper.makeGetRequest( url, function( responseObject ) {
      var parts = responseObject[0].parts;
      parts = shuffle( parts );
      console.log( "Recieved", parts.length, "parts for set", setId );
      callback( parts );
    });
  },

  getImageUrlForSet: function( setId ) {
    var set = this.getSetWithId( setId );
    return set.imageUrl;
  },

  getImageUrlForPart: function( part ) {
    var legoUrl = "http://cache.lego.com/media/bricks/5/1/" + part.element_id + ".jpg";
    var bricksetElementUrl = part.element_img_url;
    var bricksetPartUrl = part.part_img_url;
    var urlsToTry = [ legoUrl, bricksetElementUrl, bricksetPartUrl ];


  }
};
