(function() {

  // DOM elements
  var setSelect;
  var setContainer;
  var uiContainer;
  var infoText;
  var setImageCanvas;
  var setImageContext;

  // models
  var legoModel;
  var citiesModel;
  var colorsModel;

  // managers
  var partsTableManager;
  var partsChartManager;
  var mapManager;

  var showUI = function() {
    infoText.style.display = 'none';
    setContainer.style.display = 'flex';
    uiContainer.style.display = 'flex';
  }

  var hideUI = function() {
    infoText.style.display = 'block';
    setContainer.style.display = 'none';
    uiContainer.style.display = 'none';
  }

  var setSelectClicked = function( ev ) {

    hideUI();
    infoText.innerText = "Fetching set information...";

    var selectedSetId = this.selectedOptions[0].setId;
    var selectedSet = legoModel.getSetWithId( selectedSetId );
    console.log( "Set selected:", selectedSet );

    legoModel.getPartsForSet( selectedSetId, function( parts ) {
      console.log( "Recieved", parts.length, "parts for set", selectedSet.id, "(" + selectedSet.name + ")" );

      partsTableManager.populateTableWithParts( parts );
      partsChartManager.newChartWithParts( parts );
      showUI();
      mapManager.newMap(); // must be after showing otherwise map doesn't display until window is resized
    });

    var setImage = new Image();
    setImage.onload = function() {

      setImageContext.clearRect(0, 0, setImageCanvas.width, setImageCanvas.height);
      setImageContext.drawImage( setImage, 0, 0, setImageCanvas.width, setImageCanvas.height );
    };
    setImage.src = selectedSet.imageUrl;
  };

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

    // fetch referneces to DOM elements
    infoText = document.querySelector( '#info-text' );
    setContainer = document.querySelector( '#set-container' );
    uiContainer = document.querySelector( '#ui-container' );
    setImageCanvas = document.querySelector( '#set-image-canvas' );
    setImageContext = setImageCanvas.getContext( '2d' );
    mapContainer = document.getElementById( 'map-container' );

    // initialise models and managers
    var partsTable = document.querySelector( '#parts-table' );
    citiesModel = new CitiesModel( function() {
      partsTableManager = new PartsTableManager( partsTable, citiesModel );
    });

    var partsChartContainer = document.querySelector( '#parts-chart-container' );
    colorsModel = new ColorsModel( function() {
      partsChartManager = new PartsChartManager( partsChartContainer, colorsModel );
    });

    legoModel = new LegoModel( function() {
      populateSetSelect();
    });

    var center = { lat: 51.5, lng: -0.1227758 };
    var zoom = 10;
    mapManager = new MapManager( mapContainer, center, zoom );
  };

})();
