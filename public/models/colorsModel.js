var ColorsModel = function( onload ) {
  ajaxHelper.makeGetRequest( "data/colors.json", function( responseObject ) {
    this.colors = responseObject;
    console.log( "New ColorsModel ready with", this.colors.length, "colors" );
    if ( onload ) onload();
  }.bind( this ) );
};

ColorsModel.prototype = {
  getRGBforColorName: function( colorName ) {
    var color = this.colors.find( function( color ) {
      return color.color_name === colorName;
    });
    if ( color.color_name === 'White' ) return '#f9f9f9';
    return color ? '#' + color.rgb : 'black';
  }
};
