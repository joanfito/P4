var cofres, armas, escudos, armaduras, pociones, moneda, botas, mapas;
var gameover = false;


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
      //movimiento (ADRI)
      //cambiar de nivel (de mapa) (ADRI)
      //lucha (FITO)
      //gestionar nivel personaje (augmentar las stats siguendo el enunciado + subir un punto en una de las stats (definido en rubrica.rtf)) (ADRI --> funcion creada: augmentaXP)
      //recoger objetos (que dropean los enemigos) (FITO)
      //comprar en tienda (ADRI -- aplicar pasiva Orco)
      //abrir cofre (MARC: onclick en canvas per a "obrirlo")
      //gestionar mochila (FITO)
      //gestionar objetos equipados (MARC -- llegeix extras.rtf)
      //visor (canvas) (ADRI)
      //HUD (FITO)
      //guardar partida (sobreescribir si ya existe una en el slot) (FITO)
      //musica (ADRI)
      //alduin (drop 'alma' + aprender grito) (MARC)
      //abrir puerta salida (MARC)
      //game over (por muerte o abriendo puerta) (MARC (gameover.html))
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
    mapas = data.mapas;

    //Cargamos el mapa (variable existente en juego.js)
    mapa = cargaMapa('-2');
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

/* Ejecuta el combate entre el jugador y el enemigo */
function combate(rival) {
  var huir = false, esquivar = false;
  //Comprobamos que el combate sea posible, sino, el jugador huye del combate
  if (player.tipoAtaque == 'AD' && player.tipoAtaque <= rival.armadura) {
    huir = true;
  } else if (player.tipoAtaque == 'AP' && player.tipoAtaque <= rival.resistenciaMagica) {
    huir = true;
  } else {
    //El combate es posible, ejecutamos la habilidad pasiva (si tiene)
    switch (player.raza) {
      case 'bosmer':
        bosmer.habilidad(rival);
        break;
      case 'dunmer':
        dunmer.habilidad(rival);
        break;
    }

    //Empieza el combate
    while (player.vida > 0 || rival.vida > 0) {
      //AUGMENTAR CONTADOR TURNO DUNMER
      //Primero ataca el jugador
      var dano;
      if (player.tipoAtaque == 'AD') {
        dano = player.ataque - rival.armadura;
      } else dano = player.ataque - rival.resistenciaMagica;

      rival.vida = rival.vida - dano;

      //MOSTRAR EN EL DIV + ACTUALIZAR STATS ENEMIGO
      //Esperamos X tiempo o hasta que pulse un boton

      //Turno del enemigo
      if (player.raza == 'khajita') {
        esquivar = khajita.habilidad();
      }
      if (!esquivar) {
        if (rival.tipoAtaque == 'fisico') {
          dano = rival.ataque - player.armadura;
        } else dano = rival.ataque - player.resistenciaMagica;

        player.vida = player.vida - dano;
      } else {

      }
      //MOSTRAR EN EL DIV + ACTUALIZAR STATS JUGADOR
      //Esperamos X tiempo o hasta que pulse un boton
    }

    //Si el enemigo muere, augmentamos la XP y dropeamos los objetos
    if (rival.vida == 0) {
      augmentaXP(rival.xp);
      recogeObjetos(rival.objetos);
    }

    if (player.vida == 0) {
      gameover = true;
    }
  }
}

/* Gestiona la experiencia y el nivel del jugador */
function augmentaXP(xp) {

}

/* Gestiona la recogida de objetos de un enemigo */
function recogeObjetos(objetos) {

}

/* Indicamos que se ha acado la partida */
function setGameover(victoria) {
  gameover = true;
  var fin = function() {
    location.href = (victoria ? 'gameover.html?victoria=s' : 'gameover.html?victoria=n');
  }();
}
