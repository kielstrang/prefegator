// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });


$(function() {
  $('.add-option').on('click', function() {
    const $list = $('<li>').addClass('list-group-item');
    const $divRow = $('<div>').addClass('row');
    const $divColName = $('<div>').addClass('col');
    const $spanName = $('<span>').addClass('item-name');
    const $divColDelete = $('<div>').addClass('col');
    const $buttonDelete = $('<i>').addClass('list-buttons fa fa-minus-square-o fa-2x');

    $spanName.text($('.add-option-name').val());

    $divColName.append($spanName);
    $divColDelete.append($buttonDelete);
    $divRow.append($divColName, $divColDelete);
    $list.append($divRow);
    $list.insertBefore('.list-add-option');


    $('.add-option-name').val('');
  })

  $('.delete-option').on('click', function() {
    
  })

  $('#create-poll-form').on('submit', function(event) {
    event.preventDefault();

    const poll = {
      name: $('#decision').val(),
      email: $('#email').val(),
      desc: '',
      options: []
    };

    $('.item-name').each((i, item) => {
      poll.options.push({ name: $(item).text() });
    });
    console.log(poll);

  });




  function pollVoteCreator() {
    // creates the /:id table from database
    // for each option, append below to <ul class"list-group id="sortable" on /:id
    // <li>".list-group-item grouped-list ui-state-default"
    // <div>".row line-div"
    // <div>".col name-div"
    //   <span>".item ui-icon""name from database"
    // <div>".col desc-div"
    //   <span>".ui-icon""desc from database"
    // <div>".col current-rank"
    //   <span>".ui-icon""display current rank"
    //figure out way to track current position for this span
    //$('.item') dom query?
  }

  // :id/results table creator. Identical to pollVoteCreator except for database source?
  function pollResultCreator(votes) {
    // create table based on currently cast votes
    // from database
    // for each option, append below to <ul class"list-group id="sortable" on /:id
    // <li>".list-group-item grouped-list ui-state-default"
    // <div>".row line-div"
    // <div>".col name-div"
    //   <span>".item ui-icon""name from database"
    // <div>".col desc-div"
    //   <span>".ui-icon""desc from database"
    // <div>".col current-rank"
    //   <span>".ui-icon""display current rank"
    //figure out way to track current position for this span
    //$('.item') dom query?
  };

  // Votearranger/ranker on /:id
  $('#sortable').sortable();

});
