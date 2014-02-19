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

function tokensToString(tokens) {
   var r = '';
   for(var i=0; i < tokens.length; i++) {
     var t = tokens[i]
     var s = JSON.stringify(t, undefined, 2);
     s = _.template(temp, {token: t, match: s});
     r += s;
   }
   return '<ol>\n'+r+'</ol>';
}

function lexer(input) {
  var blanks         = /^\s+/;                        //Identifica espacios
  var iniheader      = /^\[([^\]\r\n]+)\]/;           //Identifica campos de cabecera "[cabecera]""
  var comments       = /^[;#](.*)/;                   //Identifica comentarios
  var nameEqualValue = /^([^=;\r\n]+)=([^;\r\n]*)/;   //Identifica valores.
  var any            = /^(.|\n)+/;                    // Un . o retorno de carro.

  var out = [];   //Irá almacenando las cadenas de salida aquí.
  var m = null;   //Almacenará de forma temporal la cadena leída, para que después introducirla en el vector out.
                  // Entrará en el if correspondiente según "el tipo" de campo que haya leído.

  while (input != '') {
    if (m = blanks.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type : 'blanks', match: m });
    }
    else if (m = iniheader.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'header', match: m });
    }
    else if (m = comments.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'comments', match: m });
    }
    else if (m = nameEqualValue.exec(input)) {
      /* while (match casa con /\\$/) concatena la siguiente línea */
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'nameEqualValue', match: m });
    }
    else if (m = any.exec(input)) {
      out.push({ type: 'error', match: m });
      input = '';
    }
    else {
      alert("Fatal Error!"+substr(input,0,20));
      input = '';
    }
  }
  return out;
}