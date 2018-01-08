window.onload = function videoInicial() {
  var video = $("#video-presentacion").get(0);

  //Cuando el video acabe, pasaremos a la selección de personaje
  video.onended = function () {
    location.href = 'seleccion.html';
  };

  $("#video-body").click(function () {
    location.href = 'seleccion.html';
  });
};
