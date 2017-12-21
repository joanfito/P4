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
      "nombre": "Orci",
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
      "descripcion": "Los guardia rojo, habitantes de Páramo del Martillo, son la mejor raza guerrera de toda Tamriel. Su gran envergadura les permite usar armaduras pesadas, por lo tanto, tienen +2 de armadura adicional, y su execelente habilidad con armas de gran envergadura, les otorga +3 de daño físico si no llevan escudo equipado."
    }, {
      "nombre": "Argoniano",
      "habilidad": "Piel de Hist",
      "descripcion": "Los argonianos, una raza con aspecto de reptiliano que habitan en la Ciénaga Negra son resistentes a casi cualquier enfermedad. Despues de cada combate, tienen un 33% de curarse un 25% de su vida restante."
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
      "descripcion": "En el ejercito del imperio, la Legión Imperial, se encuentran los mejores soldados del imperio. Sus miembros son resistentes gracias a sus excelentes armaduras. -2 de daño y +2 de armadura y resistencia mágica.",
      "ataque": -2,
      "armadura": 2,
      "resistenciaMagica": 2
    }],
    "player": {
      "nombre": "",
      "raza": "",
      "sexo": "",
      "rol": "",
      "vida": 10,
      "nivel": 0,
      "xp": 100,
      "ataque": 0,
      "tipoAtaque": "",
      "armadura": 0,
      "resistenciaMagica": 0,
      "manoderecha": "garrot",
      "manoizquierda": "",
      "mochila": [],
      "estadoPartida": {
        "x": 3,
        "y": 1,
        "nivel": -2,
        "direccion": 0
      }
    },
    "enemigos": [{
      "nombre": "",
      "vida": 10,
      "tipoAtaque": "fisico",
      "ataque": 3,
      "armadura": 2,
      "resistenciaMagica": 2,
      "xp": 20,
      "img": "",
      "objetos": []
    },{
      "nombre": "",
      "vida": 10,
      "tipoAtaque": "magico",
      "ataque": 3,
      "armadura": 2,
      "resistenciaMagica": 2,
      "xp": 20,
      "img": "",
      "objetos": []
    }],
    "objetos": [ {
      "armas": [{
        "nombre": "",
        "img": "",
        "ataque": 3,
        "precio": 100
      },{
        "nombre": "",
        "img": "",
        "ataque": 4,
        "precio": 150
      }]
    },{
      "escudos": [{
        "nombre": "",
        "img": "",
        "armadura": 2,
        "precio": 100
      },{"nombre": "",
        "img": "",
        "armadura": 3,
        "precio": 200}]
    },{
      "armaduras": [{
        "nombre": "",
        "img": "",
        "armadura": 4,
        "resistenciaMagica": 2,
        "precio": 500
      },{"nombre": "",
        "img": "",
        "armadura": 2,
        "resistenciaMagica": 4,
        "precio": 500}]
    },{
      "pociones": [{
        "nombre": "",
        "img": "",
        "curacion": 2,
        "precio": 20
      },{
        "nombre": "",
        "img": "",
        "curacion": 3,
        "precio": 30
      }]
    }, {
      "moneda": {
        "nombre": "",
        "img": ""
      }
    }, {
      "botas": {
        "nombre": "",
        "img": ""
      }
    }],
    "cofre": [{
      "img": "",
      "objetos": []
    }, {
      "img": "",
      "objetos": []
    }]
  });

  //Subimos el json de configuración
  $.ajax({
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
  $.ajax({
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=nueva',
    type: 'DELETE',
    success: function(result) {
        console.log('JSON inicial eliminado');
    }
});
}
