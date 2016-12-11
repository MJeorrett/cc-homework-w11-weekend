var ChartManager = function( container, partsByColorName ) {

  this.series = [];
  this.categories = [];

  for ( var color_name of partsByColorName ) {
    var partsForColor = partsByColorName[color_name];
    var numberOfPartsForColor = partsForColor.length;
    var rgbColor = partsForColor[0].rgbColor;
    this.series[0].push({ color: rgbColor, y: 0 });
    this.series[1].push({ color: lightgrey, y: numberOfPartsForColor });
    this.categories.push( color_name );
  }

  this.chart = createChart( series, categories, container );
};


ChartManager.prototype = {
  updateForPartFound: function( colorName, numberFound ) {
    var seriesIndex = this.cateogires.indexOf( colorName );
    this.chart.series[0].data[seriesIndex].update({ y: numberFound });
  }
};
