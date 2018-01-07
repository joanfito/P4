/*
 * Este fichero proporciona al administrador funciones para poder testear
 * distintas funcionalidades del juego
 */

/*
 * Función para cargar el fichero nuevaPartida.json en la API
 */
 function cargaJSON() {
  var url = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=nueva';

  //Creamos el archivo
  var ficheroJSON = JSON.stringify({
    "nombre": "Nueva",
    "mapas": [{
      "nivel": -1,
      "salto": -5,
      "0": ["X","F","X","X","X","X","X","X","X","X"],
      "1": ["X","V","V","K","X","V","V","V","V","X"],
      "2": ["X","V","V","X","X","V","G","V","C","X"],
      "3": ["X","V","X","X","V","V","V","X","X","X"],
      "4": ["X","V","X","V","V","V","V","V","V","B"],
      "5": ["X","V","E","V","V","E","V","X","X","X"],
      "6": ["X","V","V","V","V","V","V","V","V","X"],
      "7": ["X","V","X","V","V","V","V","M","V","X"],
      "8": ["X","M","X","V","K","V","V","V","O","X"],
      "9": ["X","X","X","X","X","X","X","X","X","X"]
    }, {
      "nivel": -2,
      "salto": -4,
      "0": ["X","X","X","X","X","X","X","X","X","X"],
      "1": ["X","C","T","V","X","V","V","V","V","X"],
      "2": ["X","X","X","V","X","X","X","V","V","X"],
      "3": ["X","V","V","V","V","V","X","V","G","X"],
      "4": ["X","V","V","E","V","V","G","V","V","S"],
      "5": ["X","X","X","V","V","V","V","V","K","X"],
      "6": ["X","X","B","V","M","V","X","X","X","X"],
      "7": ["X","K","X","V","V","V","V","M","V","X"],
      "8": ["X","V","V","V","P","V","V","V","V","X"],
      "9": ["X","X","X","X","X","X","X","X","X","X"]
    }, {
      "nivel": -3,
      "salto": -3,
      "0": ["X","X","X","X","X","X","X","X","X","X"],
      "1": ["X","V","V","V","V","V","V","V","V","X"],
      "2": ["B","V","V","V","V","V","V","V","K","X"],
      "3": ["X","V","X","V","V","V","V","E","V","X"],
      "4": ["X","K","X","V","M","V","V","V","V","X"],
      "5": ["X","X","X","V","X","V","V","V","V","X"],
      "6": ["X","X","S","V","X","X","X","V","M","X"],
      "7": ["X","C","X","X","X","V","V","V","V","X"],
      "8": ["X","V","V","E","V","V","G","V","V","X"],
      "9": ["X","X","X","X","X","X","X","X","X","X"]
    }, {
      "nivel": -4,
      "salto": -2,
      "0": ["X","X","X","X","X","X","X","X","X","X"],
      "1": ["X","C","X","M","V","V","V","V","V","B"],
      "2": ["S","V","V","V","V","V","V","V","V","X"],
      "3": ["X","T","X","V","M","V","V","E","V","X"],
      "4": ["X","X","X","V","V","V","V","V","V","X"],
      "5": ["X","V","V","V","V","V","P","V","V","X"],
      "6": ["X","V","X","V","V","X","V","V","V","X"],
      "7": ["X","V","X","E","V","X","V","V","V","X"],
      "8": ["X","K","X","V","V","X","V","V","V","X"],
      "9": ["X","X","X","X","X","X","X","X","X","X"]
    }, {
      "nivel": -5,
      "salto": -1,
      "0": ["X","X","X","X","X","X","X","X","X","X"],
      "1": ["X","V","E","V","V","V","V","G","V","S"],
      "2": ["X","G","V","V","M","E","V","V","V","X"],
      "3": ["X","V","V","K","V","V","C","V","V","X"],
      "4": ["X","V","X","X","V","V","X","X","V","X"],
      "5": ["X","V","X","V","V","V","V","X","V","X"],
      "6": ["X","V","X","V","J","V","V","X","V","X"],
      "7": ["X","V","X","X","A","X","V","X","V","X"],
      "8": ["X","O","X","X","V","X","V","X","K","X"],
      "9": ["X","X","X","X","X","X","X","X","X","X"]
    }],
    "razas": [{
      "nombre": "Altmer",
      "habilidad": "Soberbia Altmer",
      "descripcion": "La habilidad para las artes mágicas de los altmer no tiene rival. Es por eso que tienen +2 de daño mágico inicial."
    }, {
      "nombre": "Bosmer",
      "habilidad": "Tiro de Valen",
      "descripcion": "Los bosmer son los mejores arqueros de todo Tamriel. Antes de empezar el combate, es capaz de realizar un tiro con el arco que inflinge +1 de daño verdadero al enemigo."
    }, {
      "nombre": "Dunmer",
      "habilidad": "Ira del Antepasado",
      "descripcion": "Los dunmer, nativos de Morrowind, donde se alza la Montaña Roja, un enorme volcán, no le temen al fuego. Cada 10 turnos, se rodean durante un turno de fuego, que inflinge +4 de daño verdadero al enemigo cuándo ataca."
    }, {
      "nombre": "Orco",
      "habilidad": "Herrero de Orsinium",
      "descripcion": "Los orcos son los mayores herreros de toda Tamriel. Las armas y escudos comprados en la tienda son un 20% mejores."
    }, {
      "nombre": "Imperial",
      "habilidad": "Astucia de Cyrodiil",
      "descripcion": "Los imperiales, nativos de Cyrodiil, sobresalen sobre las demadas razas por su astucia. Por eso, son capaces de conseguir un 25% más de oro."
    }, {
      "nombre": "Nórdico",
      "habilidad": "Fuerza de Skyrim",
      "descripcion": "Los nordicos son una de las grandes razas guerreras de Tamriel. Su excelente habilidad para con la espada, les otorga un 20% más de daño si llevan equipados una espada y un escudo."
    }, {
      "nombre": "Bretón",
      "habilidad": "Piel de dragón",
      "descripcion": "Los bretones, habitantes de Roca Alta, son una raza mestiza entre altmer y humanos, tienen parte de la habilidad mágica de los altmer y una gran resistencia hacia la magia. Disponen de +2 de resistencia mágica y +1 de daño mágico adicional."
    }, {
     "nombre": "Guardia Rojo",
      "habilidad": "Subida de adrenalina",
      "descripcion": "Los guardia rojo, habitantes de Páramo del Martillo, son la mejor raza guerrera de toda Tamriel. Su gran envergadura les permite usar armaduras pesadas, por lo tanto, tienen +2 de armadura adicional, y su execelente habilidad con armas de gran envergadura, les otorga +3 de daño físico si llevan dos armas equipadas."
    }, {
      "nombre": "Argoniano",
      "habilidad": "Piel de Hist",
      "descripcion": "Los argonianos, una raza con aspecto de reptiliano que habitan en la Ciénaga Negra son resistentes a casi cualquier enfermedad. Despues de cada combate, tienen un 33% de curarse un 50% de la vida perdida."
    }, {
      "nombre": "Khajita",
      "habilidad": "Sigilo",
      "descripcion": "Los khajita son una raza de aspecto felino originaria de Elsweyr y conocida por ser excelentes ladrones, gracias a su sigilo y agilidad. Tienen un 10% de posibilidades de esquivar el ataque de un enemigo."
    }],
    "roles": [{
      "nombre": "Colegio de Hibernalia",
      "descripcion": "En el Colegio de Hibernalia se aprende todo lo relacionado con las artes arcanas. Sus miembros son hábiles magos. +3 de daño mágico adicional y -1 de armadura y resistencia mágica.",
      "ataque": 3,
      "armadura": -1,
      "resistenciaMagica": -1
    }, {
      "nombre": "Hermandad Oscura",
      "descripcion": "La Hermandad Oscura es el gremio de asesinos más mortífero de toda Tamriel. Sus miembros son despiadados asesinos. +3 de daño física adicional y -1 de armadura de resistencia mágica",
      "ataque": 3,
      "armadura": -1,
      "resistenciaMagica": -1
    }, {
      "nombre": "Legión Imperial",
      "descripcion": "En el ejercito del imperio, la Legión Imperial, se encuentran los mejores soldados del imperio. Sus miembros son resistentes gracias a sus excelentes armaduras. -1 de daño y +2 de armadura y resistencia mágica.",
      "ataque": -1,
      "armadura": 2,
      "resistenciaMagica": 2
    }],
    "player": {
      "nombre": "",
      "raza": "",
      "sexo": "",
      "rol": "",
      "vida": 10,
      "vidaMax":10,
      "oro": 0,
      "nivel": 1,
      "xp": 0,
      "ataque": 2,
      "tipoAtaque": "",
      "armadura": 1,
      "resistenciaMagica": 1,
      "manoderecha": "",
      "manoizquierda": "",
      "cuerpo": "",
      "mochila": ["","","","","",""],
      "estadoPartida": {
        "x": 3,
        "y": 1,
        "nivel": -2,
        "direccion": 0,
        "alma": false,
        "grito": false,
        "enemigosMuertos": 0
      }
    },
    "enemigos": [{
      "nombre": "Draugr",
      "vida": 10,
      "tipoAtaque": "fisico",
      "ataque": 3,
      "armadura": 2,
      "resistenciaMagica": 2,
      "xp": 20,
      "img": "draug.png",
      "objetos": [100]
    },{
      "nombre": "Nigromante",
      "vida": 10,
      "tipoAtaque": "magico",
      "ataque": 3,
      "armadura": 2,
      "resistenciaMagica": 2,
      "xp": 20,
      "img": "nigromante.png",
      "objetos": [100]
    }, {
      "nombre": "Trol",
      "vida": 20,
      "tipoAtaque": "fisico",
      "ataque": 3,
      "armadura": 4,
      "resistenciaMagica": 4,
      "xp": 40,
      "img": "troll.png",
      "objetos": [200]
    }, {
      "nombre": "Alduin",
      "vida": 50,
      "tipoAtaque": "magico",
      "ataque": 20,
      "armadura": 10,
      "resistenciaMagica": 10,
      "xp": 400,
      "img": "alduin.png",
      "objetos": [1000]
    }],
    "objetos": [ {
      "armas": [{
        "nombre": "Espada de Hierro",
        "img": "espada_hierro.png",
        "ataque": 3,
        "precio": 100
      },{
        "nombre": "Espada Élfica",
        "img": "espada_elfica.png",
        "ataque": 4,
        "precio": 150
      }, {
        "nombre": "Espada Enana",
        "img": "espada_enana.png",
        "ataque": 5,
        "precio": 200
      },{
        "nombre": "Espada de Cristal",
        "img": "espada_cristal.png",
        "ataque": 6,
        "precio": 250
      }, {
        "nombre": "Espada Daédrica",
        "img": "espada_daedrica.png",
        "ataque": 9,
        "precio": 400
      },{
        "nombre": "Espada de Hueso de Dragón",
        "img": "espada_dragon.png",
        "ataque": 12,
        "precio": 700
      }, {
        "nombre": "Hacha JS",
        "img": "hacha_js.png",
        "ataque": 5000,
        "precio": 3000000}]
    },{
      "escudos": [{
        "nombre": "Escudo de Piel",
        "img": "escudo_piel.png",
        "armadura": 2,
        "precio": 100
      },{
        "nombre": "Escudo Élfico",
        "img": "escudo_elfico.png",
        "armadura": 3,
        "precio": 200

      },{
        "nombre": "Escudo Daédrico",
        "img": "escudo_daedra.png",
        "armadura": 4,
        "precio": 300
      },{
        "nombre": "Escudo de Dragón",
        "img": "escudo_dragon.png",
        "armadura": 5,
        "precio": 400},
        {
        "nombre": "Escudo CSS",
        "img": "escudo_css.png",
        "armadura": 5000,
        "precio": 3000000}]
    },{
      "armaduras": [{
        "nombre": "Capa de Ruiseñor",
        "img": "armadura_ruisenor.png",
        "armadura": 4,
        "resistenciaMagica": 2,
        "precio": 500
      },{"nombre": "Armadura Élfica",
        "img": "armadura_elfica.png",
        "armadura": 2,
        "resistenciaMagica": 4,
        "precio": 500}, {
        "nombre": "Armadura ligera de Dragón",
        "img": "armadura_dragon.png",
        "armadura": 6,
        "resistenciaMagica": 4,
        "precio": 1000
      },{"nombre": "Armadura Daédrica",
        "img": "armadura_daedrica.png",
        "armadura": 4,
        "resistenciaMagica": 6,
        "precio": 1000},
        {"nombre": "Armadura de Dragón",
        "img": "armadura_hueso_dragon.png",
        "armadura": 8,
        "resistenciaMagica": 8,
        "precio": 2000}]
    },{
      "pociones": [{
        "nombre": "Poción de salud",
        "img": "pocion_1.png",
        "curacion": 2,
        "precio": 20
      },{
        "nombre": "Gran poción de salud",
        "img": "pocion_2.png",
        "curacion": 5,
        "precio": 100
      }]
    }, {
      "moneda": {
        "nombre": "Séptim",
        "img": "septim.png",
        "cantidad": 0
      }
    }, {
      "botas": [{
        "nombre": "Boots-trap",
        "img": "boots_trap.png",
        "precio": 3000000
      }]
    }, {
      "hechizos": [{
        "nombre": "Llamas",
        "img": "hechizo_fuego.png",
        "ataque": 3,
        "precio": 100
      }, {
        "nombre": "Congelación",
        "img": "hechizo_hielo.png",
        "ataque": 4,
        "precio": 150
      }, {
        "nombre": "Rayo",
        "img": "hechizo_rayo.png",
        "ataque": 5,
        "precio": 200
      }, {
        "nombre": "Bola de fuego",
        "img": "hechizo_fuego.png",
        "ataque": 6,
        "precio": 250
      }, {
        "nombre": "Estaca de hielo",
        "img": "hechizo_hielo.png",
        "ataque": 9,
        "precio": 400
      }, {
        "nombre": "Relámpagos",
        "img": "hechizo_rayo.png",
        "ataque": 12,
        "precio": 700
      }]
    }],
    "cofre": [{
      "img": "cofre1.png",
      "objetos": [100, "Poción de salud", "Escudo Élfico"],
      "usado": false
    }, {
      "img": "cofre1.png",
      "objetos": [100, "Gran poción de salud", "Armadura Élfica"],
      "usado": false
    }]
  });

  //Subimos el json de configuración
  return $.ajax({
    type: 'POST',
    url: url,
    data: {json: ficheroJSON},
    statusCode: {
     404: function () {
       console.log('Slot ocupat');
     }
    },
    success: function() {
     console.log('JSON inicial guardado correctamente');
    }
  });

 }

/*
 * Función para eliminar el fichero nuevaPartida.json en la API
 */
function eliminaJSON() {
  return $.ajax({
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=nueva',
    type: 'DELETE',
    success: function(result) {
        console.log('JSON inicial eliminado');
    }
  });
}
