(function() {

  var legoModel;
  var citiesModel;
  var setSelect;
  var setImageDiv;
  var mapWrapper;
  var partsGraph;

  var setSelectClicked = function( ev ) {
    var selectedSetId = this.selectedOptions[0].setId;
    var selectedSet = legoModel.getSetWithId( selectedSetId );
    console.log( "set selected:", selectedSet );

    var partsObject

    legoModel.getPartsForSet( selectedSetId, function( parts ) {
      partsObject = parts;
      console.log( "Recieved pieces for set", selectedSet.id, "(" + selectedSet.name + ")" + ":", parts );
      var parts = partsObject[0].parts;
      populateTableWithParts( parts, citiesModel );
      partsGraph = new PartsGraph( parts );
    });

    var setImage = document.querySelector( '#set-image' );
    setImage.src = selectedSet.imageUrl;

  };

  var setUpMap = function() {
    var mapContainer = document.getElementById( 'map-container' );
    var center = { lat: 51.5, lng: -0.1227758 };
    var zoom = 10;
    mapWrapper = new MapWrapper( mapContainer, center, zoom );
  }

  var populateSetSelect = function() {

    legoModel = new LegoModel();
    legoModel.init( function() {
      console.log("Number of sets available to play with:", legoModel.numberOfSets() );

      setSelect = document.querySelector( '#set-select' );
      setSelect.onchange = setSelectClicked;
      setSelect.innerHtml = "";
      legoModel.data.forEach( function( set ) {
        var aOption = htmlHelper.create( 'option', set.name );
        aOption.setId = set.id;
        setSelect.appendChild( aOption );
      });
    });
  }

  window.onload = function() {
    console.log( "The hunt for lego has started..." );

    setUpMap();
    populateSetSelect();

    // LOAD CITIES DATA AND INITIALISE MODEL
    ajaxHelper.makeGetRequest( 'data/cities.json', function( responseObject ) {
      citiesModel = new CitiesModel( responseObject );
      console.log( "Number of cities to find:", citiesModel.numberOfCities() );
    })
  };

})();
