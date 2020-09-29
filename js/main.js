// var frase = jQuery(".frase");
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function () { // inicializa quando carrega a pagina
    atualizaFrase();
    incializaContadores();
    incializaCronometro();
    InicializaMarcadores();
    $("#reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    $(".tooltip").tooltipster({
        trigger: "custom"
    });
})


function atualizaFrase() {
    var frase = $(".frase").text();  // pega todo texto da classe .frase do html
    var numPalavras = frase.split(" ").length; // transforma o texto em um vetor depois separa por espaços para pegar o tamanho

    var tamanhoFrase = $("#tamanho-frase"); // pega o valor do id #tamanho-frase

    tamanhoFrase.text(numPalavras); // altera o valor do id tamanho-frase para o numero de palavras da classe .frase
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function incializaContadores() {
    campo.on("input", function () {  // on é evento do "click", "input" de digitar
        var conteudo = campo.val(); // val() pega o valor do text area
        var qtdPalavras = conteudo.split(/\S+/).length - 1;  // transforma o texto em um vetor depois separa por espaços para pegar o tamanho

        var qtdLetras = campo.val().length; // pega valor dos caracteres

        var tamanhoLetras = $("#contador-caracteres"); // pega o valor do id
        tamanhoLetras.text(qtdLetras);

        var tamanhoPalavras = $("#contador-palavras"); // pega o valor do id
        tamanhoPalavras.text(qtdPalavras); // altera o valor do id

    });
}

function incializaCronometro() {
    campo.one("focus", function () { // evento funciona apenas uma vez
        var tempoRestante = $("#tempo-digitacao").text()
        cronometroId = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId); 
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true) //troca o atributo do elemento
    campo.toggleClass("campo-desativado"); //adiconando class
    inserePlacar();
}

function InicializaMarcadores() {
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
    
        if(digitado == comparavel){
            campo.addClass("borda-verde"); 
            campo.removeClass("borda-vermlha");
        }else{
            campo.addClass("borda-vermelha");   
            campo.removeClass("borda-verde");
        }

    });   
}

function reiniciaJogo() {
        campo.attr("disabled", false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        incializaCronometro();
        campo.toggleClass("campo-desativado");
        campo.removeClass("borda-verde");
        campo.removeClass("borda-vermelha"); 
}

$("#usuarios").selectize({
    create: true,
    sortField: 'text'
});