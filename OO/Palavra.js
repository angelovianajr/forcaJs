function Palavra(){
	this.texto = pegarPalavra();
	this.vetor = this.texto.split('');
	this.oculta = [];
}

Palavra.prototype.ocultar = function(){
	var self = this;
	this.vetor.forEach(function(letra) {
		if (letra !== ' '){
			self.oculta.push('*');
		}else{
			self.oculta.push(' - ');
		}
	});

	$('#palavraOculta').text(this.oculta.join(''));
}

function pegarPalavra(){
	var palavra;
  $.get('http://localhost:3000/palavras').done(function(data){
    var palavrasDisponiveis;
    if( dificuldade === 'nunez' ){
      palavrasDisponiveis = data.filter(function(elem){
        return elem.texto.length >= 12;
      });
    }else{
      palavrasDisponiveis = data;
    }
    var index = parseInt(Math.random() * palavrasDisponiveis.length);
    palavra = palavrasDisponiveis[index].texto;
		return palavra;
  });

};
