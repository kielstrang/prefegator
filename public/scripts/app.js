$(function() {
  
  $('.add-option').on('click', function() {
    $('#create-option-form').submit();
  });

  $('#create-option-form').on('submit', function(event) {
    event.preventDefault();
    const $list = $('<li>').addClass('list-group-item list-option');
    const $divRowMain = $('<div>').addClass('row');
    const $divColName = $('<div>').addClass('col');
    const $spanName = $('<span>').addClass('item-name');
    const $divColDelete = $('<div>').addClass('col');
    const $buttonDelete = $('<i>').addClass('list-buttons fa fa-minus-square-o fa-2x delete-option');
    const $divRowDesc = $('<div>').addClass('row');
    const $smallDesc = $('<small>').addClass('item-desc');

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
    $('.item-desc').hide();
  })

  
  // Submit poll to database
  $('#create-poll-form').on('submit', function(event) {
    const poll = {
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

    // $('.list-group-item').each((i, item) => {
    //   console.log($(item).find('.item-name').text());
    // });

    $('<input>').attr('type', 'hidden')
    .attr('name', 'poll')
    .attr('value', JSON.stringify(poll))
    .appendTo($('#create-poll-form'));
    return true;  
  });
  
  // Delete button for options on create page
  $('ul').on('click', '.delete-option', function(event) {
    $(event.currentTarget).closest('li').remove();
   })


   // Description toggle functionality
   $('.item-desc').hide(); //This one might not be needed, should only live in #create-option-form
  $('ul').on('click', '.list-group-item', function(event) {
    $(event.currentTarget).find('small').slideToggle();
  });


  $('ol').on('click touchstart', '.show-button', function(event) {
    $(event.currentTarget).parent().parent().find('small').slideToggle();
    // console.log(event.currentTarget);
  });
    // }
  
  //   return false
  // });

});
