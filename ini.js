"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("#fileinput").change(calculate);
});

function calculate(evt) {
  var f = evt.target.files[0]; 

  if (f) {                            //FileReader es una interfaz que se puede utilizar para leer 
    var r = new FileReader();         // un archivo de forma asíncrona mediante el control de eventos de JavaScript.                          
    r.onload = function(e) {          // Cuando se hayan cargado los ficheros se llama a function.
      var contents = e.target.result; // Guarda el contenido leído del fichero en una variable.
      
      var tokens = lexer(contents);         //Función encargada de identificar los diferentes campos y clasificar la información.    
      var pretty = tokensToString(tokens);  //Estos campos que han sido generados por lexer, ahora serán convertidos en cadenas de
                                            // caracteres gracias a la función tokensToString(tokens).

      out.className = 'unhidden';
      initialinput.innerHTML = contents;    // Mostrará los contenidos iniciales sin procesar. (Lo que leyó inicialmente)
      finaloutput.innerHTML = pretty;       // Mostrará la información clasificada y procesada.
    }
    r.readAsText(f);                        // readAsText se usa para empezar a leer de un fichero especifico.
  } else { 
    alert("Failed to load file");           // en el caso de que no se pueda leer
  }
}

var temp = '<li> <span class = "<%= token.type %>"> <%= match %> </span>\n';