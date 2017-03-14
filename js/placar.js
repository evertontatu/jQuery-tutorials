function inserePlacar(){
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Everton";
  var numPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario,numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);

  $(".placar").slideDown(500);
  scrollPlacar();
}

function scrollPlacar(){
  var posicaoPlacar = $(".placar").offset().top;

  $("body").animate(
    {
      scrollTop: posicaoPlacar + "px"
    },1000);
}

function novaLinha(usuario,palavras){
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").attr("href","#").addClass("botao-remover");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha(event){
  event.preventDefault();
  var linha = $(this).parent().parent();

  linha.fadeOut(1000);
  setTimeout(function(){
    linha.remove();
  },1000);
}

$("#botao-placar").click(mostraPlacar);

function mostraPlacar(){
  $(".placar").stop().slideToggle(600);
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar", function(data){
    $(data).each(function(){
      let linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
    });
  });
}
