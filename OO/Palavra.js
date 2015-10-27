function Palavra( texto ){
	this.texto = texto;
	this.vetor = this.textoToArray();
	this.oculta = this.ocultarTexto();
};

Palavra.prototype.textoToArray = function(){
	return this.texto.split('');
};

Palavra.prototype.ocultarTexto = function(){

	var palavraOculta = [];

	this.vetor.forEach(function(caractere) {
		if(caractere !== ' '){
			palavraOculta.push('*');
		}else{
			palavraOculta.push(' ');
		}
	});

	return palavraOculta;
};
