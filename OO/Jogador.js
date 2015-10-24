function Jogador( options ){
	options = options || {};

	this.nome = options.nome;
	this.pontos = options.pontos;
}

Jogador.prototype.inserirJogador = function(){
  $.post('http://localhost:3000/usuarios',
    {
      "nome": this.nome,
      "pontos": this.pontos
    }
  );
}

Jogador.prototype.obterJogador = function( nome ){
	var self = this;
	$.get('http://localhost:3000/usuarios')
		.done(function(usuarios){
			var usuario = usuarios.filter(function(elem){
				return elem.nome === nome;
			});

			self.nome = (usuario.length < 2) ? usuario[0].nome : '';
			self.pontos = (usuario.length < 2) ? usuario[0].pontos : '';
		});
}
