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

  // appends to renderOptions
  function pollOptionsCreator (option) {
    // create poll options on /create
    // Starter-function for add-poll options button
    $('.list-buttons fa fa-plus-square-o fa-2x').on('submit', function () {
      const $list = $('<list>').addClass('list-group-item grouped-list');
      const $divRow = $('<div>').addClass('row option-div');
      const $divColName = $('<div>').addClass('col name-div');
      const $spanName = $('<span>').addClass('nameFromDB');
      const $divColDesc = $('<div>').addClass('col desc-div');
      const $spanDesc = $('<span>').addClass('descFromDB');
      const $divColDelete = $('<div>').addClass('col button-del');
      const $buttonDelete = $('<button>').addClass('list-buttons fa fa-minus-square-o fa-2x')

      // $list.text(db.source);
      $spanName.text(db.source.name);
      $spanDesc.text(db.source.desc);

      $divColName.append($spanName);
      $divColDesc.append($spanDesc);
      $divColDelete.append($buttonDelete);

      $divRow.append($divColName, $divColDesc, $divColDelete);

      $list.append($divRow);  
      return $list
    })
  };

  // Starter-function for displaying options made by user
  function renderOptions (options) {
    var optionsContainer = $('.list-group')
    optionsContainer.empty()
    options.forEach(function (option) {
      optionsContainer.append(pollOptionsCreator(option))
    })
  };


  function loadOptions () {
    $.ajax({
      url: "/options",
      method: "GET",
      success: function (data) {
        renderOptions(data);
      },
      failure: function (err) {
        console.log(err);
      }
    });
  }

  loadOptions();


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
  function pollSubmitter (options) {
    // submits the table made by pollVoteCreator/pollOptionsCreator
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
