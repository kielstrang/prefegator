$(function() {
  $('#vote-poll-form').on('submit', function(event) {
    var ballot = [];
    $('.item').each(function(i, item) {
      ballot.push($(item).text());
    });
    $('<input>').attr('type', 'hidden')
      .attr('name', 'ballot')
      .attr('value', JSON.stringify(ballot))
      .appendTo($('#vote-poll-form'));
    return true;
  });
  $('#sortable').sortable(); 
});

