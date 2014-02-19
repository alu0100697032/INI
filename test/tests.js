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
    test('¿El token es un comentario?', function() {
        var tokens = lexer(';Esto es un comentario');
		assert.equal(tokens[0].type,'comments');
    });
});