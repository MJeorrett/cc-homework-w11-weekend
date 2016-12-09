var createChart = function( data, container ) {

  var series = Object.keys( data ).map( function( color ) {
    return {
      y: data[color],
      color: color
    };
  });

  console.log( "series:", series );

  // var chart = new Highcharts.Chart({
  //   chart: {
  //     type: 'column',
  //     renderTo: container
  //   },
  //   title: {
  //     text: "test"
  //   },
  //   series: [{
  //     name: "Countries",
  //     data: series
  //   }],
  //   xAxis: {
  //     categories: categories
  //   }
  // });
};
