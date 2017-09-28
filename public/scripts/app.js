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


//Votearranger on /:id
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
});
