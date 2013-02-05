$(function(){

  $('button').click(add_stock);
  setInterval(run_dashboard, 5000);

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

function add_stock()
{
  $.ajax({
    type: "POST",
    url: "/stocks",
    data: { name: $('input').val() }
  }).done(function( msg ) {
  });
}

function render_stocks(data)
{
  $('#stocks').empty();

  for(var property in data)
  {
    stock = $('<div>');
    stock.addClass('stock');
    $('#stocks').append(stock);
    Morris.Line({
      element: stock,
      data: data[property],
      xkey: 'created_at',
      ykeys: ['quote'],
      labels: [property],
      ymin: 'auto',
      ymax: 'auto'
    });
  }
}
