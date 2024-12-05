const candidatos = database;
var eleitores = [];
var votacaoEmAndamento = false;
var numeroSendoVotado = "";
var quantidadeDeVotosEmBranco = 0;
var quantidadeDeVotosNulos = 0;

if(!votacaoEmAndamento){
    montarDivDosBotoesDoMenu();
    montarDivDasInformacoes("", "default");
}

function montarDivDoRanking(){
    desmontarDivDoRanking();
    desmontarDivDasInformacoes();

    //função para ordernar de acordo com o mais votado e ordem alfabetica
    candidatos.sort(function (a, b) {
        if (a.quantidade_votos < b.quantidade_votos || a.quantidade_votos == b.quantidade_votos && a.nome > b.nome) {
            return 1;
        }
        if (a.quantidade_votos > b.quantidade_votos || a.quantidade_votos == b.quantidade_votos && a.nome < b.nome) {
            return -1;
        }
        return 0;
    });

    if(candidatos[0].quantidade_votos == candidatos[1].quantidade_votos){
        montarDivDasInformacoes("Vai haver segundo turno, pois há dois ou mais candidatos com a mesma quantidade de votos.", "ranking");
    }
    else{
        montarDivDasInformacoes("Não vai haver segundo turno!", "ranking");
    }

    for(var i = 0; i < candidatos.length; i++){
        var divRankingExtern = document.getElementById("div-ranking-extern");
        var divRanking = document.createElement("div");
        var avatar = document.createElement("img");
        var nome = document.createElement("p");
        var numero = document.createElement("p");
        var partido = document.createElement("p");
        var total = document.createElement("p");
        var porcentagem = document.createElement("p");

        divRanking.setAttribute("class", "ranking");
        divRanking.setAttribute("id", "ranking");

        avatar.setAttribute("id", "avatar-ranking");
        avatar.setAttribute("class", "avatar");
        if(candidatos[i].path_avatar != ""){
            avatar.setAttribute("src", candidatos[i].path_avatar);
        }
        else{
            avatar.setAttribute("src", "images/avatars/default.png");
        }

        nome.setAttribute("id", "nome-ranking");
        nome.setAttribute("class", "nome");
        nome.appendChild(document.createTextNode(candidatos[i].nome));

        partido.setAttribute("id", "partido-ranking");
        partido.setAttribute("class", "others");
        partido.appendChild(document.createTextNode(candidatos[i].partido));

        numero.setAttribute("id", "numero-ranking");
        numero.setAttribute("class", "numero");
        numero.appendChild(document.createTextNode(candidatos[i].numero));

        total.setAttribute("id", "total-ranking");
        total.setAttribute("class", "others");
        total.appendChild(document.createTextNode(candidatos[i].quantidade_votos + " votos"));

        const pctg = (candidatos[i].quantidade_votos*100)/eleitores.length || 0;
        porcentagem.setAttribute("id", "porcentagem-ranking")
        porcentagem.setAttribute("class", "others");
        porcentagem.appendChild(document.createTextNode(pctg + "%"));

        divRanking.appendChild(avatar);
        divRanking.appendChild(nome);
        divRanking.appendChild(numero);
        divRanking.appendChild(partido);
        divRanking.appendChild(total);
        divRanking.appendChild(porcentagem);

        divRankingExtern.appendChild(divRanking);
    }
}
function desmontarDivDoRanking(){
    var existeRanking = document.getElementById("ranking");
    if(existeRanking){
        for(var i = 0; i < candidatos.length; i++){
            document.getElementById("ranking").remove();
        }
    }
}

function montarDivDasInformacoes(info, condicao){
    var div = document.getElementById("informacoes");
    var span = document.createElement("span");
    var span2 = document.createElement("span");
    var span3 = document.createElement("span");

    div.setAttribute("class", "informacoes");

    span.setAttribute("class", "span-instrucoes");
    span.setAttribute("id", "span-instrucoes");

    span2.setAttribute("class", "span-instrucoes");
    span2.setAttribute("id", "span-instrucoes2");

    span3.setAttribute("class", "span-instrucoes");
    span3.setAttribute("id", "span-instrucoes3");

    if(info == "" && condicao == "default"){
        span.appendChild(document.createTextNode('Clique em "Novo Voto" para votar. Se você já votou, não poderá votar de novo. Vote consciente!'));
        span2.appendChild(document.createTextNode('É possível ver a lista dos candidatos clicando em "Estatísticas".'));
        
        div.appendChild(span);
        div.appendChild(span2);
    }
    else if(info != "" && condicao == ""){
        span.appendChild(document.createTextNode(info));

        div.appendChild(span);
    }
    else if(info != "" && condicao == "ranking"){
        span.appendChild(document.createTextNode(info));
        span2.appendChild(document.createTextNode("Votos em branco: " + quantidadeDeVotosEmBranco));
        span3.appendChild(document.createTextNode("Votos nulos: " + quantidadeDeVotosNulos));

        div.appendChild(span);
        div.appendChild(span2);
        div.appendChild(span3);
    }
}
function desmontarDivDasInformacoes(){
    var span1 = document.getElementById("span-instrucoes");
    var span2 = document.getElementById("span-instrucoes2");
    var span3 = document.getElementById("span-instrucoes3");

    if(span1){
        document.getElementById("span-instrucoes").remove();
    }
    if(span2){
        document.getElementById("span-instrucoes2").remove();
    }
    if(span3){
        document.getElementById("span-instrucoes3").remove();
    }
}

function montarDivDosBotoesDoMenu(){
    var div = document.getElementById("buttons-menu");
    var button1 = document.createElement("button");
    var button2 = document.createElement("button");

    div.setAttribute("class", "buttons-menu");

    button1.setAttribute("id", "button-votar");
    button1.setAttribute("class", "button-votar");
    button1.setAttribute("onclick", "montarDivDeNovoVoto()");
    button1.appendChild(document.createTextNode('Novo Voto'));

    button2.setAttribute("id", "button-estatisticas");
    button2.setAttribute("class", "button-estatisticas");
    button2.setAttribute("onclick", "montarDivDoRanking()");
    button2.appendChild(document.createTextNode('Estatisticas'));

    div.appendChild(button1);
    div.appendChild(button2);
}
function desmontarDivDosBotoesDoMenu(){
    document.getElementById("button-votar").remove();
    document.getElementById("button-estatisticas").remove();
}

function montarDivContent(nome, titulo){
    desmontarDivDeNovoVoto();

    var divContainer = document.getElementById("container");
    var divContent = document.createElement("div");
    var divMessage = document.createElement("div");
    var divTeclado = document.createElement("div");
    var divDisplay = document.createElement("div");

    divContent.setAttribute("id", "content");
    divContent.setAttribute("class", "content");

    divMessage.setAttribute("id", "message");
    divTeclado.setAttribute("id", "teclado");
    divDisplay.setAttribute("id", "display");

    divContent.appendChild(divMessage);
    divContent.appendChild(divTeclado);
    divContent.appendChild(divDisplay);

    divContainer.appendChild(divContent);

    montarDivDaIdentificacaoDoEleitor(nome, titulo);
    montarDivDoTeclado();
    montarDivDoDisplay("images/avatars/default.png", "Nome", "S/P");
}

function desmontarDivContent(){
    document.getElementById("content").remove();
}

function montarDivDaIdentificacaoDoEleitor(nome, titulo){
    var divContent = document.getElementById("content");
    var div = document.getElementById("message");
    var span1 = document.createElement("span");
    var span2 = document.createElement("span");

    div.setAttribute("class", "message");

    span1.setAttribute("class", "span-message");
    span1.appendChild(document.createTextNode('Olá, ' + nome + '.'));

    span2.setAttribute("class", "span-message");
    span2.appendChild(document.createTextNode('Número do Título: ' + titulo));

    div.appendChild(span1);
    div.appendChild(span2);

    divContent.appendChild(div);
}

function montarDivDeNovoVoto(){
    desmontarDivDoRanking();

    var div = document.getElementById("eleitor");
    var inputNome = document.createElement("input");
    var inputTitulo = document.createElement("input");
    var form = document.createElement("form");
    var button = document.createElement("button");

    div.setAttribute("class", "eleitor");

    inputNome.setAttribute("placeholder", "Nome");
    inputNome.setAttribute("type", "text");
    inputNome.setAttribute("id", "nomeEleitor");

    inputTitulo.setAttribute("placeholder", "Número do Título");
    inputTitulo.setAttribute("type", "number");
    inputTitulo.setAttribute("id", "numeroDoTituloDoEleitor");

    button.setAttribute("id", "button-submit-novo-voto");
    button.setAttribute("class", "button-submit-novo-voto");
    button.setAttribute("type", "submit");
    button.appendChild(document.createTextNode("Continuar"));

    form.setAttribute("id", "form-novo-voto");
    form.setAttribute("onsubmit", "handleNomeNumeroDoTitulo()");
    form.appendChild(inputNome);
    form.appendChild(inputTitulo);
    form.appendChild(button);

    div.appendChild(form);

    desmontarDivDosBotoesDoMenu();
    desmontarDivDasInformacoes();
}
function desmontarDivDeNovoVoto(){
    var existeForm = document.getElementById("form-novo-voto");
    if(existeForm){
        document.getElementById("eleitor").removeAttribute("class");
        document.getElementById("form-novo-voto").remove();
    }
}

function montarDivDoTeclado(){
    var divContent = document.getElementById("content");
    var divTeclado = document.getElementById("teclado");
    var divDisplayNumero = document.createElement("div");
    var inputDisplayNumero = document.createElement("input");

    divTeclado.setAttribute("class", "teclado");

    divDisplayNumero.setAttribute("class", "display-numero");

    inputDisplayNumero.setAttribute("type", "number");
    inputDisplayNumero.setAttribute("placeholder", "Número do Candidato");
    inputDisplayNumero.setAttribute("readonly", "readonly");
    inputDisplayNumero.setAttribute("id", "inputDisplayNumero");
    inputDisplayNumero.setAttribute("minlength", "2");
    inputDisplayNumero.setAttribute("maxlength", "2");

    divDisplayNumero.appendChild(inputDisplayNumero);
    divTeclado.appendChild(divDisplayNumero);

    var divBtnsTeclado = document.createElement("div");
    var divBtnsNumeros = document.createElement("div");
    var divBtnsOpcoes = document.createElement("div");

    divBtnsTeclado.setAttribute("class", "btns-teclado");

    divBtnsNumeros.setAttribute("class", "btns-numeros");

    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");
    var btn4 = document.createElement("button");
    var btn5 = document.createElement("button");
    var btn6 = document.createElement("button");
    var btn7 = document.createElement("button");
    var btn8 = document.createElement("button");
    var btn9 = document.createElement("button");
    var btn0 = document.createElement("button");
    var br1 = document.createElement("br");
    var br2 = document.createElement("br");
    var br3 = document.createElement("br");

    btn1.appendChild(document.createTextNode('1'));
    btn1.setAttribute("onclick", "tecladoN1pressionado()"); //falta o press

    btn2.appendChild(document.createTextNode('2'));
    btn2.setAttribute("onclick", "tecladoN2pressionado()"); //falta o press

    btn3.appendChild(document.createTextNode('3'));
    btn3.setAttribute("onclick", "tecladoN3pressionado()"); //falta o press

    btn4.appendChild(document.createTextNode('4'));
    btn4.setAttribute("onclick", "tecladoN4pressionado()"); //falta o press

    btn5.appendChild(document.createTextNode('5'));
    btn5.setAttribute("onclick", "tecladoN5pressionado()"); //falta o press

    btn6.appendChild(document.createTextNode('6'));
    btn6.setAttribute("onclick", "tecladoN6pressionado()"); //falta o press

    btn7.appendChild(document.createTextNode('7'));
    btn7.setAttribute("onclick", "tecladoN7pressionado()"); //falta o press

    btn8.appendChild(document.createTextNode('8'));
    btn8.setAttribute("onclick", "tecladoN8pressionado()"); //falta o press

    btn9.appendChild(document.createTextNode('9'));
    btn9.setAttribute("onclick", "tecladoN9pressionado()"); //falta o press

    btn0.appendChild(document.createTextNode('0'));
    btn0.setAttribute("onclick", "tecladoN0pressionado()"); //falta o press

    divBtnsNumeros.appendChild(btn1);
    divBtnsNumeros.appendChild(btn2);
    divBtnsNumeros.appendChild(btn3);
    divBtnsNumeros.appendChild(br1);
    divBtnsNumeros.appendChild(btn4);
    divBtnsNumeros.appendChild(btn5);
    divBtnsNumeros.appendChild(btn6);
    divBtnsNumeros.appendChild(br2);
    divBtnsNumeros.appendChild(btn7);
    divBtnsNumeros.appendChild(btn8);
    divBtnsNumeros.appendChild(btn9);
    divBtnsNumeros.appendChild(br3);
    divBtnsNumeros.appendChild(btn0);

    divBtnsOpcoes.setAttribute("class", "btns-opcoes");

    var btnBranco = document.createElement("button");
    var btnCorrige = document.createElement("button");
    var btnConfirma = document.createElement("button");

    btnBranco.setAttribute("id", "btn-branco-voto");
    btnBranco.setAttribute("class", "btn-branco-voto");
    btnBranco.setAttribute("onclick", "handleButtonBranco()"); //falta o press
    btnBranco.appendChild(document.createTextNode('Branco'));
    
    btnCorrige.setAttribute("id", "btn-corrige-voto");
    btnCorrige.setAttribute("class", "btn-corrige-voto");
    btnCorrige.setAttribute("onclick", "handleButtonCorrige()"); //falta o press
    btnCorrige.appendChild(document.createTextNode('Corrige'));

    btnConfirma.setAttribute("id", "btn-confirma-voto");
    btnConfirma.setAttribute("class", "btn-confirma-voto");
    btnConfirma.setAttribute("onclick", "handleButtonConfirma()"); //falta o press
    btnConfirma.appendChild(document.createTextNode('Confirma'));

    divBtnsOpcoes.appendChild(btnBranco);
    divBtnsOpcoes.appendChild(btnCorrige);
    divBtnsOpcoes.appendChild(btnConfirma);

    divBtnsTeclado.appendChild(divBtnsNumeros);
    divBtnsTeclado.appendChild(divBtnsOpcoes);

    divContent.appendChild(divTeclado);
    divContent.appendChild(divBtnsTeclado);
}

function montarDivDoDisplay(path, nome, partido){
    var divContent = document.getElementById("content");
    var div = document.getElementById("display")
    var avatarDoCandidato = document.createElement("img");
    var nomeDoCandidato = document.createElement("p");
    var partidoDoCandidato = document.createElement("p");

    div.setAttribute("class", "display");

    avatarDoCandidato.setAttribute("id", "avatar-candidato");
    avatarDoCandidato.setAttribute("class", "avatar");
    avatarDoCandidato.setAttribute("src", path);

    nomeDoCandidato.setAttribute("id", "nome-candidato");
    nomeDoCandidato.setAttribute("class", "nome");
    nomeDoCandidato.appendChild(document.createTextNode(nome));

    partidoDoCandidato.setAttribute("id", "partido-candidato");
    partidoDoCandidato.setAttribute("class", "partido");
    partidoDoCandidato.appendChild(document.createTextNode(partido));

    div.appendChild(avatarDoCandidato);
    div.appendChild(nomeDoCandidato);
    div.appendChild(partidoDoCandidato);

    divContent.appendChild(div);
}

function desmontarDivDoDisplay(){
    document.getElementById("avatar-candidato").remove();
    document.getElementById("nome-candidato").remove();
    document.getElementById("partido-candidato").remove();
}

function atualizarDisplay(){
    var candidatoExiste = false;
    for(i = 0; i < candidatos.length; i++){
        if(numeroSendoVotado == candidatos[i].numero){
            desmontarDivDoDisplay();
            montarDivDoDisplay(candidatos[i].path_avatar, candidatos[i].nome, candidatos[i].partido);
            candidatoExiste = true;
            break;
        }
        else{
            desmontarDivDoDisplay();
            montarDivDoDisplay("images/avatars/default.png", "Nome", "S/P");
        }
    }
    if(!candidatoExiste && numeroSendoVotado.length == 2){
        montarDivDasInformacoes('Não existe um candidato com este número! Clique em "Corrige" e tente novamente.', "");
        var btnConfirma = document.getElementById('btn-confirma-voto');
        var btnBranco = document.getElementById('btn-branco-voto');

        btnConfirma.setAttribute("disabled", "disabled");
        btnConfirma.setAttribute("class", "btn-confirma-voto button-not-allowed");

        btnBranco.setAttribute("disabled", "disabled");
        btnBranco.setAttribute("class", "btn-branco-voto button-not-allowed");
    }
    else if(numeroSendoVotado.length == 2){
        var btnBranco = document.getElementById('btn-branco-voto');

        btnBranco.setAttribute("disabled", "disabled");
        btnBranco.setAttribute("class", "btn-branco-voto button-not-allowed");
    }

}

function handleButtonCorrige(){
    document.getElementById('efeito-sonoro-click').play();
    var btnConfirma = document.getElementById('btn-confirma-voto');
    var btnBranco = document.getElementById('btn-branco-voto');

    btnConfirma.removeAttribute("disabled", "disabled");
    btnConfirma.setAttribute("class", "btn-confirma-voto");

    btnBranco.removeAttribute("disabled", "disabled");
    btnBranco.setAttribute("class", "btn-branco-voto");

    document.getElementById("inputDisplayNumero").value = "";
    numeroSendoVotado = "";
    desmontarDivDoDisplay();
    desmontarDivDasInformacoes();
    montarDivDoDisplay("images/avatars/default.png", "Nome", "S/P");
}

function handleButtonBranco(){
    document.getElementById('efeito-sonoro-click').play();
    alert("Seu voto [Branco] foi confirmado!");
    document.getElementById('efeito-sonoro-confirma').play();
    quantidadeDeVotosEmBranco++;
    desmontarDivContent();
    desmontarDivDasInformacoes();
    montarDivDosBotoesDoMenu();
    montarDivDasInformacoes("", "default");
    numeroSendoVotado = "";
}

function handleButtonConfirma(){
    document.getElementById('efeito-sonoro-click').play();
    if(numeroSendoVotado == ""){
        const confirmaSeNulo = confirm("Seu voto será considerado como nulo. Tem certeza que deseja prosseguir?");

        if(confirmaSeNulo){
            alert("Seu voto foi confirmado!");
            document.getElementById('efeito-sonoro-confirma').play();
        
            desmontarDivContent();
            montarDivDosBotoesDoMenu();
            montarDivDasInformacoes("", "default");
            numeroSendoVotado = "";
            quantidadeDeVotosNulos++;
        }
    }
    else{
        alert("Seu voto foi confirmado!");
        document.getElementById('efeito-sonoro-confirma').play();
        for(var i = 0; i < candidatos.length; i++){
            if(numeroSendoVotado == candidatos[i].numero){
                candidatos[i].quantidade_votos++;
                break;
            }
        }
        desmontarDivContent();
        montarDivDosBotoesDoMenu();
        montarDivDasInformacoes("", "default");
        numeroSendoVotado = "";
    }
}

function handleNomeNumeroDoTitulo(){
    var inputNomeEleitor =  document.getElementById("nomeEleitor").value;
    var inputNumeroDoTituloDoEleitor =  document.getElementById("numeroDoTituloDoEleitor").value;
    var jaVotou = false;

    if(inputNomeEleitor == "" || inputNumeroDoTituloDoEleitor == ""){
        desmontarDivDeNovoVoto();
        montarDivDosBotoesDoMenu();
        montarDivDasInformacoes('Por favor, preencha os campos adequadamente...', "");
        return;
    }
    
    for(var i = 0; i < eleitores.length; i++){
        if(eleitores[i].titulo == inputNumeroDoTituloDoEleitor){ //Duas pessoas podem ter o mesmo nome, MAS NÃO O MESMO TÍTULO
            desmontarDivDeNovoVoto();
            montarDivDosBotoesDoMenu();
            montarDivDasInformacoes('Este eleitor já votou! Próximo...', "");
            jaVotou = true;
            break;
        }
    }

    if(!jaVotou && inputNomeEleitor != "" && inputNumeroDoTituloDoEleitor != ""){
        var eleitor = {nome: inputNomeEleitor, titulo: inputNumeroDoTituloDoEleitor};

        eleitores.push(eleitor);
        montarDivContent(inputNomeEleitor, inputNumeroDoTituloDoEleitor);
    }
}

function tecladoN1pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "1";
    numeroSendoVotado += '1';
    atualizarDisplay();
}
function tecladoN2pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "2";
    numeroSendoVotado += '2';
    atualizarDisplay();
}
function tecladoN3pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "3";
    numeroSendoVotado += '3';
    atualizarDisplay();
}
function tecladoN4pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "4";
    numeroSendoVotado += '4';
    atualizarDisplay();
}
function tecladoN5pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "5";
    numeroSendoVotado += '5';
    atualizarDisplay();
}
function tecladoN6pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "6";
    numeroSendoVotado += '6';
    atualizarDisplay();
}
function tecladoN7pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "7";
    numeroSendoVotado += '7';
    atualizarDisplay();
}
function tecladoN8pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "8";
    numeroSendoVotado += '8';
    atualizarDisplay();
}
function tecladoN9pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "9";
    numeroSendoVotado += '9';
    atualizarDisplay();
}
function tecladoN0pressionado(){
    if(numeroSendoVotado.length >= 2){
        return;
    }
    document.getElementById('efeito-sonoro-click').play();
    document.getElementById("inputDisplayNumero").value += "0";
    numeroSendoVotado += '0';
    atualizarDisplay();
}