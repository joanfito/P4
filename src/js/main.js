var ficheroConfig;
var cofres, armas, escudos, armaduras, pociones, moneda, botas;

/* Inicializar el juego */
function iniciarJuego() {
  //Comprobamos que el slot que se va a cargar es un valor válido (nueva, 1, 2)
  var slot = leeSlot();

  if (slot == 'nueva' || slot == '1' || slot == '2') {
    //Definimos las razas para poder usar sus habilidades
    defineRazas();

    //Cargamos el fichero correspondiente
    $.when(cargaFichero(slot)).done(function() {
      //Funciones del juego
      /* TODO */
    });
  } else {
    alert('Slot no válido, no modifiques la URL.');
    location.href = 'index.html';
  }
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}

function creaJugador() {
  player.resistenciaMagica = 2;
  player.armadura = player.defensa;
  player.raza = null;
  player.rol = null;
  delete player.defensa;
  console.log(player);
}

function mostraConfig() {
  console.log(ficheroConfig);
}

function cargaFichero(slot) {
  var url = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=' + slot;

  return $.get(url, function(data) {
    //Assignamos los datos que hay en el fichero
    data = JSON.parse(data);

    //Variables existentes en juego.js
    partida = data;
    //mapa = data.mapa;
    objetos = data.objetos;
    enemigo = data.enemigos;
    player = data.player;

    //Nuevas variables
    cofres = data.cofre;
    armas = objetos[0].armas;
    escudos = objetos[1].escudos;
    armaduras = objetos[2].armaduras;
    pociones = objetos[3].pociones;
    moneda = objetos[4].moneda;
    botas = objetos[5].botas;
  });
}

function leeSlot() {
  //location.search vale ?slot=<valor>, por lo tanto, buscamos <valor>
  var regex = new RegExp("[\\?&]" + 'slot' + "=([^&#]*)");
  var slot = regex.exec(location.search)[1];
  return slot;
}
//TODO DEFINIR FUNCIONS PRINCIPALS QUE ES NECESITEN PER A REPARTIRLES
