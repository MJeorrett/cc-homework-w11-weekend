createChart = function( series, cateogires, container ) {

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
