$(function(){

  $('button').click(addStock);
  $('.stock').each(function(i) {
    var ticker = $(this).data('ticker');
    buildInitialGraph(ticker);
  });


function updateGraph(ticker, graph)
{
  var graphContainer = $(".stock[data-ticker='" + ticker + "']")
  $.ajax({
    type: "GET",
    url: "/quotes/" + ticker + "/latest"
  }).done(function(data) {

    // THE PROBLEM...

    var oldData = graph.data;
    var newData = oldData.push(data);
    graph.setData(newData);
  });
}

function buildInitialGraph(ticker) {
  var graph;
  $.ajax({
    type: "GET",
    url: "/stocks/" + ticker
  }).done(function(data) {
    var graphContainer = $(".stock[data-ticker='" + ticker + "']")
    graph = Morris.Line({
              element: graphContainer,
              data: data,
              xkey: 'time',
              ykeys: ['quote'],
              labels: [ticker],
              ymin: 'auto',
              ymax: 'auto'
            });
    setInterval(updateGraph, 5000, ticker, graph);
    graphContainer.data('updated', 'true');
  });
}

});

function run_dashboard()
{
  $.ajax({
    type: "GET",
    url: "/stocks"
  }).done(function( msg ) {
    render_stocks(msg);
  });
}

function addStock() {
  $.ajax({
    type: "POST",
    url: "/stocks",
    data: { name: $('input').val() }
  }).done(function(msg) {});
}

// function renderStocks(data, type) {
//   var morrisDefaultOptions = {
//     element: stock,
//     xkey: 'created_at',
//     ykeys: ['quote'],
//     ymin: 'auto',
//     ymax: 'auto'
//   };
//   if (type === 'line') {

//   }
// };

function render_stocks(data)
{
  $('#stocks').empty();

  for(var property in data)
  {
    stock = $('<div>');
    stock.addClass('stock');
    $('#stocks').append(stock);
    Morris.Bar({
      element: stock,
      data: data[property],
      xkey: 'time',
      ykeys: ['quote'],
      labels: [property],
      ymin: 'auto',
      ymax: 'auto'
    });
  }
}
