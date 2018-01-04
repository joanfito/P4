window.onload = function () {
  //location.search vale ?victoria=<s/n>
  var regex = new RegExp("[\\?&]" + 'victoria' + "=([^&#]*)");
  var victoria = regex.exec(location.search)[1];

  if (victoria == 's') {
    $('#go-section').html('<h1 class="go-victoria" id="go-titulo">Victoria!</h1>');
    $('#go-titulo').after('<p id="go-playagain"><a href="index.html" id="go-volverjugarvictoria">Jugar de nuevo</a></p>');
    $('#go-titulo').after('<h2 class="go-victoria">Pulsa para volver a jugar</h2>');
    $('#go-titulo').after('<h2 class="go-victoria">Has conseguido salir de la mazmorra!</h2>');
    $('#go-section').css('background-image', 'url("media/images/go-win.jpg")');

  } else if (victoria == 'n') {
    $('#go-section').html('<h1 class="go-derrota" id="go-titulo">Derrota!</h1>');
    $('#go-titulo').after('<p id="go-playagain"><a href="index.html" id="go-volverjugarderrota">Jugar de nuevo</a></p>');
    $('#go-titulo').after('<h2 class="go-derrota">Pulsa para volver a jugar</h2>');
    $('#go-titulo').after('<h2 class="go-derrota">Has muerto!</h2>');
    $('#go-section').css('background-image', 'url("media/images/go-defeat.jpg")');

  } else {
    $('#go-section').html('<h1 id="go-error">ERROR</h1>');
    $('#go-section').css('background-image', 'url("media/images/logo.jpg")');
  }
};
