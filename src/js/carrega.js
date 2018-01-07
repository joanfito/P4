var existe1 = false, existe2 = false;

window.onload = function () {
  //Cargamos la musica de la pantalla
  cargaMusica("cargaPartida")
  //Comprobamos que existan los slots, después de la comprobación rellenamos la pantalla con los datos correspondientes
  $.when(compruebaSlots()).done(function() {
    //Si existen, leemos los datos de la API, sino, dejamos los valores por defecto
    rellenaDatos();
  });

};

function compruebaSlots() {
  var url = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d';

  return $.get(url, function(data) {
    var slots = JSON.parse(data);

    if (slots[1] == 1) {
      existe1 = true;
    }
    if (slots[1] == 2 || slots[2] == 2) {
      existe2 = true;
    }
  });
}

function rellenaDatos() {
  if (existe1) {
    var urlGet1 = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=1';
    $.get(urlGet1, function(data) {
      var slot = JSON.parse(data);
      $('.img-slot').get(0).src = './media/images/slot1.png';
      //Rellenamos con los datos del slot
      $('#nombre-1').html(slot.nombre);
      $('#username-1').html(slot.player.nombre);
      $('#niv-1').html(slot.player.nivel);
      $('#rr-1').html(slot.player.raza + " / " + slot.player.rol);
      $('#sotano-1').html(slot.player.estadoPartida.nivel);
      $('#oro-1').html(slot.player.oro);
    });
  }

  if (existe2) {
    var urlGet2 = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=2';
    $.get(urlGet2, function(data) {
      var slot = JSON.parse(data);
$('.img-slot').get(1).src = './media/images/slot2.png';
      //Rellenamos con los datos del slot
      $('#nombre-2').html(slot.nombre);
      $('#username-2').html(slot.player.nombre);
      $('#niv-2').html(slot.player.nivel);
      $('#rr-2').html(slot.player.raza + " / " + slot.player.rol);
      $('#sotano-2').html(slot.player.estadoPartida.nivel);
      $('#oro-2').html(slot.player.oro);
    });
  }
}

function cargaPartida(slot) {
  if (slot == 1 && existe1) {
    location.href = 'juego.html?slot=1';
  } else if (slot == 2 && existe2) {
    location.href = 'juego.html?slot=2';
  } else {
    alert('No puedes cargar un slot vacío');
  }
}
