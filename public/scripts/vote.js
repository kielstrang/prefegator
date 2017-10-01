$(function() {
  $('#sortable').sortable();

  $('#vote-poll-form').on('submit', function(event) {
    if ($('#voter-name')) {
      var $voterName = $('#voter-name').val();
      if ($voterName === '') {
        swal({
          title: 'Chomp!',
          text:  'You need to provide a name/alias/callsign',
          icon:  'warning'
        });
        event.preventDefault();
        return;
      }
    };
    var ballot = {
      voter_name: $('#voter-name').val(),
      votes: []
    };
    $('.item').each(function(i, item) {
      ballot.votes.push($(item).text());
    });
    $('<input>').attr('type', 'hidden')
      .attr('name', 'ballot')
      .attr('value', JSON.stringify(ballot))
      .appendTo($('#vote-poll-form'));
    return true;
  });
});
