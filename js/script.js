var dificuldade = localStorage.getItem('dificuldade');
var limiteErros;
var jogador;

$('#btnSubmit').click(function() {
  var nome = $('#userName').val();
  var dif = $('input[name="radioOptions"]:checked').val();
  if ((nome !== 'undefined' || nome !== '') && dif !== 'undefined'){
    inserirUsuario(nome, dif, 0);
    console.log($('input[name=RadioOptions]:checked').val());
    redirectPage('jogo.html');
  }
});

$('#btnCont').click(function(){
  redirectPage('index.html');
});


function redirectPage(linkLocation, num) {
  if(!num){
    $('body').fadeOut(num);
  }
  window.location = linkLocation;
};

function inserirUsuario(nome, radio, valor){

  localStorage.setItem('dificuldade', radio);

  limiteErros = ( dificuldade === 'nunez' ) ? 2 : 5;

   $.post('http://localhost:3000/usuarios',
    {
      "nome": nome,
      "dificuldade":radio,
      "pontos":valor
    });

   location.replace('home.html?nome='+nome+'&dificuldade='+radio);
};

function pegarPalavra(){
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

    inicializar();
    //Coloquei o inicializar aqui pois ele só
    //pode executar depois da variavel palavra estar definida
  });

};

function getLeaderboard(){
  var users = [];
  var top;
  $.get('http://localhost:3000/usuarios').done(function(data){
     users = data;
  });

  users.sort(function(a, b){
      return a.pontos < b.pontos;
  });

  users.forEach(function(user){
     $('#leaderModal').append($('<h2>').html(user.nome + ' - ' + user.pontos));
  });
 
};

function threadSleepAfeterRedirectToGameOver(){
  setTimeout(function(){
    redirectPage('gameOver.html', 2000);
  }, 700);
};

$(document).ready(function() {
  $("body").css("display", "none");
  $("body").fadeIn(1000);
});
