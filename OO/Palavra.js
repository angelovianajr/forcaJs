function Palavra( texto ){
	this.texto = texto;
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