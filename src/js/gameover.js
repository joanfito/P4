window.onload = function () {
  //location.search vale ?victoria=<s/n>
  var regex = new RegExp("[\\?&]" + 'victoria' + "=([^&#]*)");
  var victoria = regex.exec(location.search)[1];

  if (victoria == 's') {
    //Creamos el html de victoria
    
  } else if (victoria == 'n') {
    //Creamos el html de derrota

  } else {
    $('#go-section').html('<h1>ERROR</h1>');
  }
};
