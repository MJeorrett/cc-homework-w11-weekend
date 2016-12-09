var htmlHelper = {
  create: function( tag, innerText ) {
    var element = document.createElement( tag );
    if (innerText) element.innerText = innerText;
    return element;
  },

  createImage: function( src ) {
    var image = this.create( 'img' );
    image.src = src;
    return image;
  }
}
