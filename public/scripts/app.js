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

$(function () {
//   // Base code for logo redirect to /create.
//   // Can just href instead. Affects design choices?
//   $('.navbar-brand').on('click', function () {
//     window.location.href = '/'
//     return false
//   })
  
  // Starter-function for displaying options made by user
  function renderOptions (options) {
    var optionsContainer = $('.???')
    optionsContainer.empty()
    options.forEach(function (tweet) {
      optionsContainer.append(/* something */)
    })
  };

  // appends to renderOptions
  function pollOptionsCreator (option) {
    // create poll options on /create
    // Starter-function for add-poll options button
    $('btn btn-success').on('submit', function () {
      event.preventDefault()
    })
    //  Classes
    // append to <ul class"list-group"
    // <li>".list-group-item grouped-list"
    // <div>".row line-div"
    // <div>".col name-div"
    //   <span>"name from database"
    // <div>".col desc-div"
    //   <span>"desc from database"
    // <div>".col delete-div" 
    //   <button>".btn btn-sucess">Delete  
  };

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

  // :id (vote) table creator
  function pollOptionsSubmitter (options) {
    // submits the table made by pollOptionsCreaetor
    // from database
    $('.submit btn').on('submit', function () {
      // consider .class names for all elements
      $('.item').map((i, item) => $(item).text())
      // above method will query the dom and return an array of
      // each item's current position. We send this information to
      // the db.
    })
  };

  // :id/results table creator. Identical to pollVoteCreator except for database source?
  function pollResultCreator (votes) {
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
  $('#sortable').sortable()

})
