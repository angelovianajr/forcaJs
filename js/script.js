var dificuldade = localStorage.getItem('dificuldade');
var limiteErros;
var jogador;
var palavrasDisponiveis;

$('#btnSubmit').click(function() {
  var nome = $('#userName').val();
  var dif = $('input[name="radioOptions"]:checked').val();
  if (nome !== '' && typeof dif !== 'undefined'){
    btnSound();
    inserirUsuario(nome, dif, 0);
  }
});

$('#btnReset').click(function(){
  localStorage.setItem($('#userName').val(), JSON.stringify({"palavras":[]}));
});

$('#btnCont').click(function(){
  btnSound();
  threadSleepAfeterRedirect('index.html', 1000);
});

$('#btnLeader').click(function(){ btnSound(); })
$('#btnComoJogar').click(function(){ btnSound(); });

function redirectPage(linkLocation, num) {
  if(!num){
    $('body').fadeOut(num);
  }
  window.location = linkLocation;
};


function carregarPalavras(){
  $.get('http://localhost:3000/palavras').done(function(data){

    if( dificuldade === 'nunez' ){
      palavrasDisponiveis = data.filter(function(elem){
        return elem.texto.length >= 12;
      });
    }else{
      palavrasDisponiveis = data;
    }
      user.nome = getURLParameter('nome');
      palavrasAcertadas = JSON.parse(localStorage.getItem(user.nome));
      palavrasDisponiveis = palavrasDisponiveis.filter(function(palavraDisponivel){
        return palavrasAcertadas.palavras.indexOf(palavraDisponivel.texto) === -1;
      });

      pegarPalavra();

      inicializar();
    //Coloquei o inicializar aqui pois ele só
    //pode executar depois da variavel palavra estar definida
  });
}


function pegarPalavra(){
    var index = parseInt(Math.random() * palavrasDisponiveis.length);
    palavra = palavrasDisponiveis[index].texto;
};

function getLeaderboard(){
  var i = 0;

  if(typeof arrayJogadores !== 'undefined'){
    arrayJogadores.sort(function(jogador1, jogador2){
        return jogador1.pontos - jogador2.pontos;
    });

    arrayJogadores.reverse();
    arrayJogadores.forEach(function(user){
      if(i < 5){
        $('#leaderModal').append($('<p>').html(i+1 + ' - ' + user.nome + ' - ' + user.pontos));
        i++;
      }
    });
  }
};

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function threadSleepAfeterRedirect(url, milsec){
  setTimeout(function(){
    redirectPage(url, 2000);
  }, milsec || 1500);
};

function btnSound(){
  var audio = new Audio();
  audio.src = 'resources/btn.mp3';
  audio.play();
}

var audio;
var muted = false;
function playMusic(url){
  audio = new Audio();
  audio.src = url;
  audio.loop = true;
  audio.play();
};

function mute(){
  if (muted === true){
    muted = false;
    audio.muted = false;
  }
  else{
    muted = true;
    audio.muted = true;
  }
};

$('#btnMute').click(function(){
  mute();
});

$(document).ready(function() {
  $("body").css("display", "none");
  $("body").fadeIn(1000);
});
