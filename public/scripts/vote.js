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
       options: []
      };
      $('.item').each(function(i, item) {
        ballot.options.push($(item).text());
      });
      $('<input>').attr('type', 'hidden')
        .attr('name', 'ballot')
        .attr('value', JSON.stringify(ballot))
        .appendTo($('#vote-poll-form'));
      return true;
    };
  });
});


// var poll = {
//   name: $('#poll-name').val(),
//   email: $('#email').val(),
//   desc: $('#poll-desc').val(),
//   options: []
// };

// $('.list-option').each((i, item) => {
//   poll.options.push({ name: $(item).find('.item-name').text(),
//                       desc: $(item).find('.item-desc').text()
//                     });
// });

// $('<input>').attr('type', 'hidden')
// .attr('name', 'poll')
// .attr('value', JSON.stringify(poll))
// .appendTo($('#create-poll-form'));
// return true;  