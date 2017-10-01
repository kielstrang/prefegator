$(function() {
  $('#sortable').sortable(); 
  $('#vote-poll-form').on('submit', function(event) {
    var $voterName = $('#voter-name').val();
    if ($voterName === '') {
      swal({
        title: 'Chomp!',
        text:  'You need to provide a name/alias/callsign',
        icon:  'warning'
      });
      event.preventDefault();
    } else {
      var ballot = {
       votername: $('#voter-name').val(),
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
    };
  });
  
  if ($('#voterCheckBox').prop('checked')) {
    $("#voter-name").show();
  } else {
    $("#voter-name").hide();
  }
});
