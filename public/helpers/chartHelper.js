var createChart = function( data, container ) {

  var series = Object.keys( data ).map( function( color ) {
    return {
      y: data[color],
      color: color
    };
  });

  var rawPieceCounts = series.map( function( dataPoint ) {
    return dataPoint.y;
  });

  console.log( pieceCounts );

  var maxPieceCount = rawPieceCounts.reduce( function( max, count ) {
    if ( count > max ) return count;
    return max;
  }, 0);

  var pieceCounts = [];
  var other = 0;
  series.forEach( function( dataPoint ) {
    var count = dataPoint.y;
    count < maxPieceCount / 10 ? other += count : pieceCounts.push( dataPoint );
  });

  pieceCounts.push({ color: 'OTHER', y: other });

  var categories = pieceCounts.map( function( dataPoint ) {
    return dataPoint.color;
  });

  console.log( "series:", series );

  var chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container
    },
    title: {
      text: "Parts Count"
    },
    series: [{
      name: "pieces",
      data: pieceCounts
    }],
    xAxis: {
      categories: categories
    }
  });
};
