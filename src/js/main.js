var cofres, armas, escudos, armaduras, pociones, moneda, botas, mapas, hechizos;
var gameover = false, espera = true, cargasDunmer = 0;


/* Inicializar el juego */
function iniciarJuego() {
  //Comprobamos que el slot que se va a cargar es un valor válido (nueva, 1, 2)
  var slot;
  try {
    slot = leeSlot();

    if (slot == 'nueva' || slot == '1' || slot == '2') {
      //Definimos las razas para poder usar sus habilidades
      defineRazas();

      //Cargamos el fichero correspondiente
      $.when(cargaFichero(slot)).done(function() {
        //Funciones del juego

        // TODO movimiento (ADRI)
        // TODO cambiar de nivel (de mapa) (ADRI)
        //lucha (FITO)
        //TODO cambiar musica en la lucha (FITO)
        //TODO gestionar nivel personaje (augmentar las stats siguendo el enunciado + subir un punto en una de las stats (definido en rubrica.rtf)) (ADRI --> funcion creada: augmentaXP)
        //TODO recoger objetos (que dropean los enemigos) (FITO)
        //TODO comprar en tienda (ADRI -- aplicar pasiva Orco)
        //TODO abrir cofre (MARC: onclick en canvas per a "obrirlo")
        //TODO gestionar mochila (FITO)
        //TODO gestionar objetos equipados (MARC -- llegeix extras.rtf)
        //TODO visor (canvas) (ADRI)
        //TODO HUD (FITO)
        //TODO guardar partida (sobreescribir si ya existe una en el slot) (FITO)
        //musica (ADRI)
        //TODO alduin (drop 'alma' + aprender grito) (MARC)
        //TODO abrir puerta salida (MARC)
        //TODO game over (por muerte o abriendo puerta) (MARC (gameover.html))
      });
    } else {
      alert('Slot no válido, no modifiques la URL.');
      location.href = 'index.html';
    }
  } catch (e) {
    alert('Slot no válido, no modifiques la URL.');
    location.href = 'index.html';
  }
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}

/* Muestra el fichero de la partida */
function mostraConfig() {
  console.log(partida);
}

/* Carga el fichero de partida correspondiente */
function cargaFichero(slot) {
  var url = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=' + slot;

  return $.get(url, function(data) {
    //Assignamos los datos que hay en el fichero
    data = JSON.parse(data);

    //Variables existentes en juego.js
    partida = data;
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
    hechizos = objetos[6].hechizos;
    mapas = data.mapas;

    //Cargamos el mapa (variable existente en juego.js)
    mapa = cargaMapa(player.estadoPartida.nivel);
    cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);
  });
}

/* Lee el slot que tiene que cargar */
function leeSlot() {
  //location.search vale ?slot=<valor>, por lo tanto, buscamos <valor>
  var regex = new RegExp("[\\?&]" + 'slot' + "=([^&#]*)");
  var slot = regex.exec(location.search)[1];
  return slot;
}

/* Carga el mapa del nivel indicado */
function cargaMapa(nivel) {
  for (var m of mapas) {
    if (m.nivel == nivel) {
      return m;
    }
  }
}

/* Carga la imagen que pertoca segun la posicion del jugador */
function cargaPosicion(x, y, orientacion) {
  switch (orientacion) {
    case 0:
      pintaPosicion(x, y - 1);
      break;
    case 1:
      pintaPosicion(x, y + 1);
      break;
    case 2:
      pintaPosicion(x + 1, y);
      break;
    case 3:
      pintaPosicion(x - 1, y);
      break;
  }
}

/* Transforma la posicion de la imagen a la propia imagen en si */
function mapaToImg(x, y) {
  switch (mapa[x][y]) {
    case "V":
      return "vacio.jpg";
    case "X":
      return "pared.jpg";
    case "O":
      return "transporte.jpg";
    case "P":
      return "transporte.jpg";
    case "S":
      return "puertasubir.jpg";
    case "B":
      return "puertabajar.jpg";
    case "F":
      return "puertafinal.jpg";
    case "T":
      return "tienda.jpg";
    case "C":
      return "cofre.jpg";
    case "J":
      return enemigo[3].img;
    case "E":
      return enemigo[0].img;
    case "M":
      return enemigo[1].img;
    case "G":
      return enemigo[2].img;
    case "A":
      return "alma.jpg";
  }
}

/* Trata el movimiento del jugador */
function movimiento(x, y) {
  //Entran x, y que serian la posicion siguiente dependiendo de la tecla que pulsemos --> x+1,y , etc.
  switch (mapa[x][y]) {
    case "V":
      //Actualizamos la posicion
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      break;
    case "X":
      /*TODO Mostrar Mensaje?*/
      break;
    case "O":
      if (player.estadoPartida.nivel == -5) {
        player.estadoPartida.nivel = -1;
        player.estadoPartida.x = 8;
        player.estadoPartida.y = 7;
        player.estadoPartida.direccion = 3;
      } else {
        player.estadoPartida.nivel = -5;
        player.estadoPartida.x = 8;
        player.estadoPartida.y = 1;
        player.estadoPartida.direccion = 0;
      }
      break;
    case "P":
      if (player.estadoPartida.nivel == -4) {
        player.estadoPartida.nivel = -2;
        player.estadoPartida.x = 8;
        player.estadoPartida.y = 4;
        player.estadoPartida.direccion = 0;
      } else {
        player.estadoPartida.nivel = -4;
        player.estadoPartida.x = 5;
        player.estadoPartida.y = 6;
        player.estadoPartida.direccion = 0;
      }
      break;
    case "S":
      player.estadoPartida.nivel++;
      switch (player.estadoPartida.nivel) {
        case -1:
          player.estadoPartida.x = 4;
          player.estadoPartida.y = 8;
          player.estadoPartida.direccion = 3;
          break;
        case -2:
          player.estadoPartida.x = 6;
          player.estadoPartida.y = 3;
          player.estadoPartida.direccion = 2;
          break;
        case -3:
          player.estadoPartida.x = 2;
          player.estadoPartida.y = 1;
          player.estadoPartida.direccion = 2;
          break;
        case -4:
          player.estadoPartida.x = 8;
          player.estadoPartida.y = 1;
          player.estadoPartida.direccion = 3;
          break;
      }
      break;
    case "B":
      player.estadoPartida.nivel--;
      switch (player.estadoPartida.nivel) {
        case -2:
          player.estadoPartida.x = 4;
          player.estadoPartida.y = 8;
          player.estadoPartida.direccion = 3;
          break;
        case -3:
          player.estadoPartida.x = 6;
          player.estadoPartida.y = 3;
          player.estadoPartida.direccion = 0;
          break;
        case -4:
          player.estadoPartida.x = 2;
          player.estadoPartida.y = 1;
          player.estadoPartida.direccion = 2;
          break;
        case -5:
          player.estadoPartida.x = 8;
          player.estadoPartida.y = 1;
          player.estadoPartida.direccion = 3;
          break;
      }
      break;
    case "F":
      if (player.estadoPartida.grito == true) {
        setGameover(true);
      } else {
        /* TODO Mensaje? */
      }
      break;
    case "T":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      creaTienda();
      break;
    case "C":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      creaCofre();
      break;
    case "J":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      combate(enemigo[3]);
      break;
    case "G":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      combate(enemigo[2]);
      break;
    case "E":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      combate(enemigo[0]);
      break;
    case "M":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      combate(enemigo[1]);
      break;
    case "A":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      break;
  }
  mapa = cargaMapa(player.estadoPartida.nivel);
  cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);
}

/* Trata los giros de camara */
function girarCamara(x, y, derecha) {
  if (derecha == true) {
    switch (player.estadoPartida.direccion) {
      case 0:
        player.estadoPartida.direccion = 2;
        break;
      case 1:
        player.estadoPartida.direccion = 3;
        break;
      case 2:
        player.estadoPartida.direccion = 1;
        break;
      case 3:
        player.estadoPartida.direccion = 0;
        break;
    }
  } else {
    switch (player.estadoPartida.direccion) {
      case 0:
        player.estadoPartida.direccion = 3;
        break;
      case 1:
        player.estadoPartida.direccion = 2;
        break;
      case 2:
        player.estadoPartida.direccion = 0;
        break;
      case 3:
        player.estadoPartida.direccion = 1;
        break;
    }
  }
}

/* Creamos el menu de la Tienda con los items*/
function creaTienda() {

}

/* Creamos el menu de la Tienda con los items*/
function creaCofre() {

}

/* Ejecuta el combate entre el jugador y el enemigo */
function combate(rival) {
  var huir = false, esquivar = false;

  //Comprobamos que el combate sea posible, sino, el jugador huye del combate
  if (player.tipoAtaque == 'AD' && player.ataque <= rival.armadura) {
    huir = true;
    $('#texto-juego').html('Has huido del combate contra ' + rival.nombre);
  } else if (player.tipoAtaque == 'AP' && player.ataque <= rival.resistenciaMagica) {
    huir = true;
    $('#texto-juego').html('Has huido del combate contra ' + rival.nombre);
  } else {
    //El combate es posible, ejecutamos la habilidad pasiva (si tiene)
    if (player.raza == 'bosmer') {
      setTimeout(bosmer.habilidad, 500, rival);
    }

    //Empieza el combate
    $('#texto-juego').html('Te enfrentas a un ' + rival.nombre);
    turnosCombate(rival, esquivar, 0, 0);

  }
}

function turnosCombate(rival, esquivar, turno, vidaPerdida) {
  //Empieza el combate (2 segundos entre turno y turno)
  if (player.vida > 0 && rival.vida > 0) {
    if (turno % 2 == 0) {
      //Primero ataca el jugador
      if (player.raza == 'dunmer' && cargasDunmer == 10) {
        setTimeout(dunmer.habilidad, 2000, rival, cargasDunmer);
        setTimeout(turnoJugador, 4000, rival, esquivar, turno, vidaPerdida);
        cargasDunmer = 0;
      } else {
        setTimeout(turnoJugador, 2000, rival, esquivar, turno, vidaPerdida);
      }

    } else {
      //Despues ataca el enemigo
      setTimeout(turnoRival, 2000, rival, esquivar, turno, vidaPerdida);
    }
  } else {
    //Si el enemigo muere, augmentamos la XP y dropeamos los objetos
    if (rival.vida <= 0) {
      setTimeout(victoriaCombate, 2000, rival, vidaPerdida);
    }

    if (player.vida <= 0) {
      setTimeout(derrotaCombate, 2000, rival);
    }
  }
}

/* Turno del jugador */
function turnoJugador(rival, esquivar, turno, vidaPerdida) {
  //TODO ACTUALIZAR STATS ENEMIGO

  var dano;
  if (player.tipoAtaque == 'AD') {
    dano = player.ataque - rival.armadura;
  } else dano = player.ataque - rival.resistenciaMagica;

  rival.vida = rival.vida - dano;
  $('#texto-juego').html(player.nombre + ' inflinge ' + dano + ' de daño al ' + rival.nombre);

  //Augmentamos el turno
  cargasDunmer++;
  turno++;

  //Si el rival tiene vida, volvemos a llamar a la funcion
  turnosCombate(rival, esquivar, turno, vidaPerdida);
}

/* Turno del rival */
function turnoRival(rival, esquivar, turno, vidaPerdida) {
  //TODO ACTUALIZAR STATS JUGADOR
  var dano;
  if (player.raza == 'khajita') {
    esquivar = khajita.habilidad();
  }

  if (!esquivar) {
    if (rival.tipoAtaque == 'fisico') {
      dano = rival.ataque - player.armadura;
    } else dano = rival.ataque - player.resistenciaMagica;

    player.vida = player.vida - dano;
    vidaPerdida = vidaPerdida + dano;
    $('#texto-juego').html('El ' + rival.nombre + ' te inflinge ' + dano + ' de daño');
  } else {
    $('#texto-juego').html('Has esquivado el ataque');
  }

  //Augmentamos el turno
  turno++;

  //Si el jugador tiene vida, volvemos a llamar a la funcion
  turnosCombate(rival, esquivar, turno, vidaPerdida);
}

/* Gestiona la victoria en un combate */
function victoriaCombate(rival, vidaPerdida) {
  $('#texto-juego').html(player.nombre + ' ha vencido el combate contra el ' + rival.nombre);
  augmentaXP(rival.xp);
  recogeObjetos(rival.objetos);

  if (player.raza == 'argoniano') {
    player.vida = player.vida + argoniano.habilidad(vidaPerdida);
  }
}

/* Gestiona la derrota en un combate */
function derrotaCombate(rival) {
  $('#texto-juego').html(player.nombre + ' ha perdido el combate contra el ' + rival.nombre);
  //setGameover(false);
}

/* Gestiona la experiencia y el nivel del jugador */
function augmentaXP(xp) {

}

/* Gestiona la recogida de objetos de un enemigo */
function recogeObjetos(objetos) {

}

/* Indicamos que se ha acabado la partida */
function setGameover(victoria) {
  gameover = true;
  var fin = function() {
    location.href = (victoria ? 'gameover.html?victoria=s' : 'gameover.html?victoria=n');
  }();
}
