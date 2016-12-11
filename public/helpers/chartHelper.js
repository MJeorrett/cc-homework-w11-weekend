createChart = function( data, container ) {

  var series = [];
  series[0] = data.map( function( dataPoint ) {
    return {
      color: dataPoint.color ? dataPoint.color : 'black',
      y: 0
    };
  });
  series[1] = data.map( function( dataPoint ) {
    return {
      color: 'lightgrey',
      y: dataPoint.count
    };
  });

  var categories = data.map( function( dataPoint ) {
    return dataPoint.name;
  });

  var chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container
    },
    title: {
      text: "Parts Count"
    },
    series: [
      {
        name: "Collected",
        data: series[0]
      },
      {
        name: "Missing",
        data: series[1]
      }
    ],
    xAxis: {
      categories: categories
    },
    yAxis: {
      title: ""
    }
  });
  return chart;
};
