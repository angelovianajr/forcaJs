function Jogo( options ){
		options = options || {};
		this.erros = options.erros || 0;
		this.insert = options.insert || '';
		this.jogavel = true;
		this.dificuldade = options.dificuldade || "normal";
		this.palavra = options.palavra || new Palavra(dificuldade);

		this.jogador = options.jogador || new Jogador();

		this.limiteErros = options.limiteErros;
}

Jogo.prototype.novoJogo = function(){
	this.palavra.ocultar();
}

Jogo.prototype.jogada = function( letra ){
	var i = 0;
	var erro = true;
	var self = this;

	this.palavra.vetor.forEach(function (let) {
		if (let === letra){
			self.palavra.oculta[i] = letra;
			erro = false;
		}

		i++;
	});

	if(erro === true){
	    erros++;
	  	$('p').append($('span').html(this.erros));
	}

	$('h2').empty();
	$('#palavraOculta').html(this.palavra.oculta.join(''));
	this.verifica();
}



Jogo.prototype.verifica = function(){
	if(this.erros === this.limiteErros){
		alert('Jogador perdeu!' + this.erros + ' erros');
		redirectPage('index.html');
	}

	if (this.palavra.texto === this.palavra.oculta.join('')){
		alert('Jogador venceu!');
		redirectPage('index.html');
	}
}
