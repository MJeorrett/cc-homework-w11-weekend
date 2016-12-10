(function() {

  // DOM elements
  var setSelect;
  var infoText;
  var setImageCanvas;
  var setImageContext;
  var partsTable;
  var partsChartContainer;
  var mapContainer;

  // models
  var legoModel;
  var citiesModel;
  var colorsModel;

  // managers
  var partsChartManager;

  // UI elements
  var mapWrapper;

  var showUI = function() {
    infoText.style.display = 'none';
    setImageCanvas.style.display = 'inline-block';
    partsTable.style.display = 'inline-block'
    partsChartContainer.style.display = 'inline-block';
    mapContainer.style.display = 'inline-block';
  }

  var setSelectClicked = function( ev ) {

    infoText.innerText = "Fetching set information...";

    var selectedSetId = this.selectedOptions[0].setId;
    var selectedSet = legoModel.getSetWithId( selectedSetId );
    console.log( "Set selected:", selectedSet );

    legoModel.getPartsForSet( selectedSetId, function( parts ) {
      showUI();
      console.log( "Recieved", parts.length, "parts for set", selectedSet.id, "(" + selectedSet.name + ")" );
      populateTableWithParts( partsTable, parts, citiesModel );
      partsChartManager.newChartWithParts( parts );
    });

    var setImage = new Image();
    setImage.onload = function() {

      setImageContext.clearRect(0, 0, setImageCanvas.width, setImageCanvas.height);
      setImageContext.drawImage( setImage, 0, 0, setImageCanvas.width, setImageCanvas.height );
    };
    setImage.src = selectedSet.imageUrl;
  };

  var setUpMap = function() {
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

    // fetch referneces to DOM elements
    infoText = document.querySelector( '#info-text' );
    setImageCanvas = document.querySelector( '#set-image-canvas' );
    setImageContext = setImageCanvas.getContext( '2d' );
    partsTable = document.querySelector( '#parts-table' );
    partsChartContainer = document.querySelector( '#parts-chart-container' );
    mapContainer = document.getElementById( 'map-container' );

    // initialise models
    citiesModel = new CitiesModel();

    colorsModel = new ColorsModel( function() {
      partsChartManager = new PartsChartManager( partsChartContainer, colorsModel );
    });

    legoModel = new LegoModel( function() {
      populateSetSelect();
    });

    setUpMap();
  };

})();
