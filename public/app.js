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
  var countriesModel;
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

      var countries = partsTableManager.populateTableWithParts( parts );
      partsChartManager.newChartWithParts( parts );
      showUI();
      mapManager.newMap( countries, countryClicked ); // must be after showing otherwise map doesn't display until window is resized
    });

    var setImage = new Image();
    setImage.onload = function() {

      setImageContext.clearRect(0, 0, setImageCanvas.width, setImageCanvas.height);
      setImageContext.drawImage( setImage, 0, 0, setImageCanvas.width, setImageCanvas.height );
    };
    setImage.src = selectedSet.imageUrl;
  };

  var populateSetSelect = function( data ) {
    setSelect.onchange = setSelectClicked;
    setSelect.innerHTML = "";
    setSelect.innerHTML = "<option value='' disabled selected>Select a Set</option>";
    legoModel.legoSets.forEach( function( set ) {
      var aOption = htmlHelper.create( 'option', set.name );
      aOption.setId = set.id;
      setSelect.appendChild( aOption );
    });
  };

  var countryClicked = function( countryCode ) {
    console.log( "country clicked:", countryCode );
  };

  window.onload = function() {
    console.log( "The hunt for lego has started..." );

    // fetch referneces to DOM elements
    setSelect = document.querySelector( '#set-select' );
    infoText = document.querySelector( '#info-text' );
    setContainer = document.querySelector( '#set-container' );
    uiContainer = document.querySelector( '#ui-container' );
    setImageCanvas = document.querySelector( '#set-image-canvas' );
    setImageContext = setImageCanvas.getContext( '2d' );
    mapContainer = document.getElementById( 'map-container' );

    // initialise models and managers
    var partsTable = document.querySelector( '#parts-table' );
    countriesModel = new CountriesModel( function() {
      partsTableManager = new PartsTableManager( partsTable, countriesModel );
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
