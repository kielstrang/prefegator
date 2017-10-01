$(function() {
  
  $('.add-option').on('click', function() {
    $('#create-option-form').submit();
  });

  $('#create-option-form').on('submit', function(event) {
    event.preventDefault();
    var $optionNameLength = $('.add-option-name').val();
    var $optionDescLength = $('.add-option-desc').val();

    if ($optionNameLength === "") {
      swal({
        title: 'Sorry!',
        text:  'You need to add an Option Name',
        icon:  'error'
      });
      return;
    } if ($optionNameLength.length > 50) {
      swal({
        title: 'Sorry!',
        text:  'Name too long, please make it shorter',
        icon:  'error'
      });
      return;
    } if ($optionDescLength.length > 150) {
      swal ({
        title: 'Sorry!',
        text:  'Description too long, please make it shorter',
        icon:  'error'
      });
      return;
    } else {
      var $list = $('<li>').addClass('list-group-item list-option');
      var $divRowMain = $('<div>').addClass('row');
      var $divColName = $('<div>').addClass('col');
      var $spanName = $('<span>').addClass('item-name');
      var $divColDelete = $('<div>').addClass('col');
      var $buttonDelete = $('<i>').addClass('list-buttons fa fa-minus-square-o fa-2x delete-option');
      var $divRowDesc = $('<div>').addClass('row');
      var $smallDesc = $('<small>').addClass('item-desc');

      $spanName.text($('.add-option-name').val());
      $smallDesc.text($('.add-option-desc').val());

      $divColName.append($spanName);
      $divColDelete.append($buttonDelete);
      $divRowMain.append($divColName, $divColDelete);
      $divRowDesc.append($smallDesc);
      $list.append($divRowMain, $divRowDesc);
      $list.insertBefore('.list-add-option');

      $('.add-option-name').val('');
      $('.add-option-desc').val('');
    }
  })

  
  // Submit poll to database
  $('#create-poll-form').on('submit', function(event) {
    var $namelength = $('#poll-name').val();
    var $emailLength = $('#email').val();
    var $descLength = $('#poll-desc').val();
    if ($namelength === "") {
      swal({
        title: 'Sorry!',
        text:  'You need to add a List Name',
        icon:  'error'
      });
      event.preventDefault();
      return;
    } if ($emailLength === "") {
      swal({
        title: 'Sorry!',
        text:  'Please add an email before submitting',
        icon:  'error'
      });
      event.preventDefault();
      return;
    // } if ($namelength.length > 50) {
      //     swal('Poll Name too long, please make it shorter');
      //     return;
    } if ($descLength.length > 150) {
      swal({
          title: 'Sorry!',
          text:  'Poll Description too long, please make it shorter',
          icon:  'error'
        });
        event.preventDefault(); //a return after seems redundant but 
                                //phone requests somehow went through otherwise.
        return;                 //will investigate on Sunday.
    } else {
        var poll = {
          name: $('#poll-name').val(),
          email: $('#email').val(),
          desc: $('#poll-desc').val(),
          options: []
        };
        
        $('.list-option').each((i, item) => {
          poll.options.push({ name: $(item).find('.item-name').text(),
                              desc: $(item).find('.item-desc').text()
                            });
        });

        $('<input>').attr('type', 'hidden')
        .attr('name', 'poll')
        .attr('value', JSON.stringify(poll))
        .appendTo($('#create-poll-form'));
        return true;  
    }
  });
  
  // Delete button for options on create page
  $('ul').on('click', '.delete-option', function(event) {
    $(event.currentTarget).closest('li').remove();
   })


   // Description toggle functionality
  $('ul').on('click', '.list-group-item', function(event) {
    $(event.currentTarget).find('small').slideToggle();
  });


  $('ol').on('click touchstart', '.show-button', function(event) {
    $(event.currentTarget).parent().parent().find('small').slideToggle();
  });

  var currentUrl = window.location.href;
  if (currentUrl.indexOf('polls') === currentUrl.length - 5) {
    $('.item-desc').show();
  } else {
    $('.item-desc').hide();
  }

});
