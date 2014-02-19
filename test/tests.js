var assert = chai.assert;

suite('Conjunto de pruebas INI', function() {
  
    test('Comprobar que capta un "header"', function() {
        var tokens = lexer('[hola]');
		assert.equal(tokens[0].type,'header');
    });

    test('¿El token es "nombre = valor"?', function() {
        var tokens = lexer('nombre = valor');
		assert.equal(tokens[0].type,'nameEqualValue');
    });

    test('¿El token es un comentario con ;?', function() {
        var tokens = lexer(';Esto es un comentario');
		assert.equal(tokens[0].type,'comments');
    });

    test('¿El token es un comentario con #?', function() {
        var tokens = lexer('#Esto es un comentario');
        assert.equal(tokens[0].type,'comments');
    });

    test('Hay espacios en blanco " "', function() {
        var tokens = lexer(' ');
        assert.equal(tokens[0].type,'blanks');
    });

    test('Hay salto de línea "(n escapada)"', function() {
        var tokens = lexer('\n');
        assert.equal(tokens[0].type,'blanks');
    });

    test('Error "jsdvbsdksjb"', function() {
        var tokens = lexer('jsdvbsdksjb');
        assert.equal(tokens[0].type,'error');
    });

});