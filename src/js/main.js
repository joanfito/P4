var ficheroConfig;

/* Inicializar el juego */
function iniciarJuego() {
  /* TODO */
  defineRazas();
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
