var ajaxHelper = {
  makeGetRequest: function( url, callback ) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open( 'GET', url );
    httpRequest.onload = function() {
      if ( this.status == 200 ) {
        callback( JSON.parse( this.responseText ) );
      } else {
        console.log( "Request failed with status ", this.status );
      }
    };
    httpRequest.send();
  }
};
