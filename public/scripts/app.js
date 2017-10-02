$(function() {
  $('.add-option').on('click', function() {
    $('#create-option-form').submit();
  });

  $('#create-option-form').on('submit', function(event) {
    event.preventDefault();
    var $optionNameLength = $('.add-option-name').val();
    var $optionDescLength = $('.add-option-desc').val();

    if($optionNameLength === "") {
      swal({
        title: 'Chomp!',
        text: 'You need to add an Option Name',
        icon: 'warning'
      });
      return;
    } if($optionNameLength.length > 50) {
      swal({
        title: 'Chomp!',
        text: 'Name too long, please make it shorter',
        icon: 'warning'
      });
      return;
    } if($optionDescLength.length > 150) {
      swal({
        title: 'Chomp!',
        text: 'Description too long, please make it shorter',
        icon: 'warning'
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
  });

  // Submit poll to database
  $('#create-poll-form').on('submit', function(event) {
    var $namelength = $('#poll-name').val();
    var $emailLength = $('#email').val();
    var $descLength = $('#poll-desc').val();
    if($emailLength === "") {
      swal({
        title: 'Chomp!',
        text: 'Please enter your email before submitting',
        icon: 'warning'
      });
      event.preventDefault();
      return;
    } if($namelength === "") {
      swal({
        title: 'Chomp!',
        text: 'You need to add a Poll Name',
        icon: 'warning'
      });
      event.preventDefault();
      return;
    } if($namelength.length > 50) {
      swal({
        title: 'Chomp!',
        text: 'Your Poll Name is too long',
        icon: 'warning'
      });
      event.preventDefault();
      return;
    } if($descLength.length > 150) {
      swal({
        title: 'Chomp!',
        text: 'Poll Description too long, please make it shorter',
        icon: 'warning'
      });
      event.preventDefault();
      return;
    } if($('.list-group-item').length < 3) {
      swal({
        title: 'Chomp!',
        text: 'Please add at least two options',
        icon: 'warning'
      });
      event.preventDefault();
      return;
    } else {
      var poll = {
        name: $('#poll-name').val(),
        email: $('#email').val(),
        desc: $('#poll-desc').val(),
        require_name: $('#voterCheckBox').is(':checked'),
        options: []
      };

      $('.list-option').each((i, item) => {
        poll.options.push({
          name: $(item).find('.item-name').text(),
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
  $('ul').on('mouseup', '.delete-option', function(event) {
    $(event.currentTarget).closest('li').remove();
  });


  // Description toggle create page
  $('ul').on('mouseup', '.list-group-item', function(event) {
    $(event.currentTarget).find('small').slideToggle();
  });

  // Description toggle on vote page
  $('ol').on('mouseup', '.show-button', function(event) {
    $(event.currentTarget).parent().parent().find('small').slideToggle();
  });

  // Item description default status conditional
  var currentUrl = window.location.href;
  if(currentUrl.indexOf('polls') === currentUrl.length - 5) {
    $('.item-desc').show();
  } else {
    $('.item-desc').hide();
  }
});
