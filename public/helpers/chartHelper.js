createChart = function( data, container ) {

  console.log("data:", data);

  var series = data.map( function( dataPoint ) {
    return {
      color: dataPoint.color ? dataPoint.color : 'black',
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
    series: [{
      name: " ",
      data: series
    }],
    xAxis: {
      categories: categories
    }
  });
  return chart;
};
