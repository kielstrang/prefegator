$(function() {
     $('.item-desc').first().show();

     // Toggles voters list
     $('.voters-list').hide();
     $('#voters').on('mouseup', function(event) {
        $('.voters-list').slideToggle();
      });
})