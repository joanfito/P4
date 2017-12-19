/*
 * Este fichero proporciona al administrador funciones para poder testear
 * distintas funcionalidades del juego
 */

/*
 * Función para cargar el fichero nuevaPartida.json en la API
 */
 function cargaJSON() {
   /*var ajaxASYNC = {
    request: function (url){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
          console.log(this.responseCode);
        });
        xhr.open("POST", url, true);
        xhr.send();
    }
  };*/
  //ajaxASYNC.request('http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d');
  ajaxASYNC.request('http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=nueva');
 }
