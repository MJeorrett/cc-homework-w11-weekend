var ColorsModel = function() {
  ajaxHelper.makeGetRequest( "data/colors.json", function( responseObject ) {
    this.colors = responseObject;
    console.log( "New ColorsModel ready with", this.colors.length, "colors" );
  }.bind( this ) );
};
