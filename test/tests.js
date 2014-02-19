var assert = chai.assert;

suite('Conjunto de pruebas INI', function() {
  
    test('Comprobar que capta un "header"', function() {
        var tokens = lexer('[hola]');
		assert.equal(tokens[0].type,'header');
    });
});