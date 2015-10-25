function Jogador( nome ){
	this.nome = nome;
	this.pontos = 0;
	this.id;
};


Jogador.prototype.inserirJogador = function(){

	var self = this;

	//Fazer requisição para ver quantos usuarios existem no JSON
	$.get('http://localhost:3000/usuarios').done(function(data){

		//Faz um reduce para contar a quantidade de usuarios com nome válido
		ultimoId = data.reduce(function(totalUsuarios, usuario){
							return usuario.nome !== undefined ? totalUsuarios+1 : totalUsuarios;
						}, 0);

		self.id = ultimoId+1;

		//Guardar as informações do usuario no localStorage para ser acessado de outras páginas
		//Aqui também está sendo setado o atributo "palavras" como um array vazio, este array
		//irá conter as palavras que o uauario acertou
		localStorage.setItem(self.nome, JSON.stringify({ "id":self.id, "nome":self.nome, "pontos":self.pontos, "palavras":[] }));

		$.post('http://localhost:3000/usuarios',
    {	
    	"id": self.id,
      "nome": self.nome,
      "pontos":self.pontos
    });
	});

};

