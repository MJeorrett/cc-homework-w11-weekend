(function() {

  // models
  var legoModel;
  var citiesModel;
  var colorsModel;

  // DOM elements
  var setSelect;
  var setImageCanvas;
  var setImageContext;

  // UI elements
  var mapWrapper;
  var partsGraph;

  var setSelectClicked = function( ev ) {
    var selectedSetId = this.selectedOptions[0].setId;
    var selectedSet = legoModel.getSetWithId( selectedSetId );
    console.log( "set selected:", selectedSet );

    legoModel.getPartsForSet( selectedSetId, function( parts ) {
      console.log( "Recieved", parts.length, "pieces for set", selectedSet.id, "(" + selectedSet.name + ")" );
      populateTableWithParts( parts, citiesModel );
      partsGraph = new PartsGraph( parts );
    });

    var setImage = new Image();
    setImage.onload = function() {

      setImageContext.clearRect(0, 0, setImageCanvas.width, setImageCanvas.height);
      setImageContext.drawImage( setImage, 0, 0, setImageCanvas.width, setImageCanvas.height );
    };
    setImage.src = selectedSet.imageUrl;
  };

  var setUpMap = function() {
    var mapContainer = document.getElementById( 'map-container' );
    var center = { lat: 51.5, lng: -0.1227758 };
    var zoom = 10;
    mapWrapper = new MapWrapper( mapContainer, center, zoom );
  }

  var populateSetSelect = function( data ) {
    setSelect = document.querySelector( '#set-select' );
    setSelect.onchange = setSelectClicked;
    setSelect.innerHtml = "";
    legoModel.legoSets.forEach( function( set ) {
      var aOption = htmlHelper.create( 'option', set.name );
      aOption.setId = set.id;
      setSelect.appendChild( aOption );
    });
  }

  window.onload = function() {
    console.log( "The hunt for lego has started..." );

    setImageCanvas = document.querySelector( '#set-image-canvas' );
    setImageContext = setImageCanvas.getContext( '2d' );

    setUpMap();
    citiesModel = new CitiesModel();
    colorsModel = new ColorsModel();
    legoModel = new LegoModel( function() {
      populateSetSelect();
    });
  };

})();
