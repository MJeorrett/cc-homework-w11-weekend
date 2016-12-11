(function() {

  // DOM elements
  var setSelect;
  var setContainer;
  var uiContainer;
  var infoText;
  var setImageCanvas;
  var setImageContext;
  var partsTable;
  var partsChartContainer;

  // models
  var legoModel;
  var countriesModel;
  var colorsModel;

  // managers
  var TableManager;
  var ChartManager;
  var MapManager;

  var showUI = function() {
    setSelect.disabled = false;
    infoText.style.display = 'none';
    setContainer.style.display = 'flex';
    uiContainer.style.display = 'flex';
  };

  var hideUI = function() {
    setSelect.disabled = true;
    infoText.style.display = 'block';
    setContainer.style.display = 'none';
    uiContainer.style.display = 'none';
  };

  var setImageUrl = function( imageUrl ) {
    var setImage = new Image();
    setImage.onload = function() {

      setImageContext.clearRect( 0, 0, setImageCanvas.width, setImageCanvas.height );
      setImageContext.drawImage( setImage, 0, 0, setImageCanvas.width, setImageCanvas.height );
    };
    setImage.src = imageUrl;
  };

  var setSelected = function( ev ) {
    hideUI();
    infoText.innerText = "Fetching set information...";

    var selectedSetId = this.selectedOptions[0].setId;
    console.log( "Set selected:", selectedSetId );

    legoModel.getPartsForSet( selectedSetId, function( parts ) {
      puzzleManager = new PuzzleManager( parts, countriesModel, colorsModel );

      var partsByCountryCode = puzzleManager.getPartsByCountryCode();
      var partsByColor = puzzleManager.getPartsByColor();

      tableManager = new TableManager( partsTable, partsByCountryName );
      chartManager = new ChartManager( partsChartContainer, partsByColorName );

      showUI();
    });

    partsMap.refresh();

    var imageUrl = legoModel.getImageUrlForSet( selectedSetId );
    setImageUrl( imageUrl );
  };

  var populateSetSelect = function() {
    setSelect.onchange = setSelected;
    setSelect.innerHTML = "";
    setSelect.innerHTML = "<option value='' disabled selected>Select a Set</option>";

    legoModel.legoSets.forEach( function( set ) {
      var aOption = htmlHelper.create( 'option', set.name );
      aOption.setId = set.id;
      setSelect.appendChild( aOption );
    });
  };

  var partFound = function( part ) {
    console.log( "part found", part.part_name );
    puzzleManager.logPartFound( part );
    tableManager.updateForPartFound( part );
    var numberFound = puzzleManager.numberOfPartsFoundForColor( part.color_name );
    chartManager.updateForPartFound( part.color_name, numberFound );
  };

  var countryClicked = function( countryCode, latLng ) {
    var legoInCountry = puzzleManager.getLegoForCountry( countryCode );
    if ( legoInCountry ) {
      mapManager.scatterLego( legoInCountry, latLng );
    }
  };

  window.onload = function() {

    // fetch referneces to DOM elements
    setSelect = document.querySelector( '#set-select' );
    infoText = document.querySelector( '#info-text' );
    setContainer = document.querySelector( '#set-container' );
    uiContainer = document.querySelector( '#ui-container' );
    setImageCanvas = document.querySelector( '#set-image-canvas' );
    setImageContext = setImageCanvas.getContext( '2d' );
    partsTable = document.querySelector( '#parts-table' );
    partsChartContainer = document.querySelector( '#parts-chart-container' );
    var mapContainer = document.getElementById( 'map-container' );

    // initialise models
    countriesModel = new CountriesModel( function() {
      colorsModel = new ColorsModel( function() {
        legoModel = new LegoModel( function() {

          populateSetSelect();
          console.log( "The hunt for lego has started..." );
        });
      });
    });

    // initialize map
    var center = { lat: 51.5, lng: -0.1227758 };
    mapManager = new MapManager( mapContainer, center, 1, countryClicked, partFound );
  };

})();
