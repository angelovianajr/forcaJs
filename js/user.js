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
  $.post('http://localhost:3000/usuarios', user);
};

function inserirUsuario(nome, radio, valor){
  localStorage.setItem('dificuldade', radio);

   $.post('http://localhost:3000/usuarios',
    {
      "nome": nome,
      "dificuldade":radio,
      "pontos":valor
    });

   var u = obterJogador(nome);
   console.log(u);

   location.replace('home.html?nome='+nome+'&dificuldade='+radio+'&id='+u.id+'&pontos='+valor);
};