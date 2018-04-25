$(function() {
  $('form').on('submit', function () {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: data
    }).done(function () {
      alert( "success" );
    }).fail(function () {
      alert( "LOL epic fail!!!!111!!" )
    })
  });
});
