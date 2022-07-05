document.addEventListener('DOMContentLoaded', initialize, false);

function initialize() {
  document.getElementById('searchPokemon').addEventListener('click', searchPokemon);
}

function searchPokemon() {
  var pokemonId = document.getElementById('pokemonName').value;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    var response,
    types;
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      
      /* Success request */
      if (xmlhttp.status == 200) {
        response = JSON.parse( xmlhttp.responseText);
        
        document.getElementById("name").innerHTML = response.name;
        
        response.types.forEach(function (typeSlot) {
          types = typeSlot.type.name + ' ';
        });
        document.getElementById("type").innerHTML = types;
        
        toggleLoading(false);
      }
      /* Errors */
      else if (xmlhttp.status == 400) {
        alert('There was an error 400');
      }
      else {
        alert('something else other than 200 was returned');
      }
    }
  };

  xmlhttp.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + pokemonId+ '/', true);
  xmlhttp.send();
  toggleLoading(true);
}

function toggleLoading(show){
  if(show) {
    document.getElementById('loading').classList.remove('hide');
  } else {
    document.getElementById('loading').classList.add('hide');
  }
}