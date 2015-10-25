var arrayJogadores;

function carregarJogadores(){
	$.get('http://localhost:3000/usuarios').done(function(data){
  		arrayJogadores = data;
  	});
}


function obterJogador(nome){
  if (typeof arrayJogadores !== 'undefined'){
	  var user = arrayJogadores.filter(function(elem){
	        return elem.nome === nome;});

	  if (typeof user !== 'undefined')
	  	return user[0];
   }
};

function obterJogadorId(id){
  var user = arrayJogadores.filter(function(elem){
        return elem.id === id;});

  if (typeof user !== 'undefined')
  	return user[0];
};

function atualizarUser(user){
   $.post('http://localhost:3000/usuarios', 
   	{
   	  "nome": user.nome,
      "dificuldade": user.dificuldade,
      "pontos": user.pontos,
      "id": user.id
   	}
   );
};

function inserirUsuario(nome, radio, valor){
    localStorage.setItem('dificuldade', radio);
		var usuario = JSON.parse(localStorage.getItem(nome));
		if(usuario === null){
			localStorage.setItem(nome, JSON.stringify({"palavras":[]}))
		}
    $.post('http://localhost:3000/usuarios',
    {
      "nome": nome,
      "dificuldade":radio,
      "pontos":valor
    });

    setTimeout(function(){
    	$.get('http://localhost:3000/usuarios').done(function(data){
	    	var user = data.filter(function(elem){
	    		return elem.nome === nome;
	    	});

	    	location.replace('home.html?nome='+nome+'&dificuldade='+radio+'&id='+user[0].id+'&pontos='+valor);
	    	threadSleepAfeterRedirect('jogo.html', 1000);
   		});
   	}, 1000);
};
