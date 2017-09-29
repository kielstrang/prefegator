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
//Base code for logo redirect to /create.
//Can just href instead. Affects design choices?
  $(".navbar-brand").on("click", function() {
     window.location.href='/';
     return false;
   })


   // Starter-function for displaying options made by user
  function renderOptions (options) {
    var optionsContainer = $(".???");
    optionsContainer.empty();
    options.forEach(function(tweet) {
      optionsContainer.append(/*something*/);
    });
  }

 //Starter-function for add-poll options button
 $("btn btn-success").on("submit", function() {
  event.preventDefault();

  })


  //Votearranger/ranker on /:id
  $( "#sortable" ).sortable();
  function voteRank() {
    $(".submit btn").on("submit", function() {
  //consider .class names for all elements
      $('.item').map((i, item) => $(item).text())
    //above method will query the dom and return an array of
    //each item's current position. We send this information to
    //the db.
    })
  }


  // :id (vote) table creator
  function pollOptionsCreator(options) {
    //create table based on poll options set by creator
  }


  // :id/results table creator
  function pollResultCreator(votes) {
        //create table based on currently cast votes
  }



});
