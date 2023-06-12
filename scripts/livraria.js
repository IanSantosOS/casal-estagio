//* Variáveis 
const notificacao = document.querySelector("#notificacao");
const carrinho_notificacao = document.querySelector(".carrinho-compras");
const lista_de_compras = document.querySelector(".lista-compras");
const carrinho_de_compras = [];

carrinho_notificacao.addEventListener("click", esconderOuMostrarLista);

//* Functions & Class 
class livro {
    constructor(titulo, valor) {
        this.titulo = titulo;
        this.valor = parseFloat(valor.replace(/[^0-9.]/g, '')).toFixed(2);
        this.qnt = 1;
    }
    maisQNT() {
        this.qnt++;
        atualizarLista();
        atualizarNotificacao();
    }
    menosQNT() {
        this.qnt--;
        verifyQNT();
    }
}

function somaQNT() {
    return carrinho_de_compras.reduce((soma, book) => soma + book.qnt, 0);
}

function verifyQNT() {
    carrinho_de_compras.forEach(book => {
        if (book.qnt <= 0) {
            carrinho_de_compras.splice(book.indexOf, 1);
        }
    });
    atualizarLista();
    atualizarNotificacao();
}

function adicionarNoCarrinho(id) {
    const livro_valor = document.querySelector(`#id${id} .valor`);
    const livro_titulo = document.querySelector(`#id${id} .titulo`);
    const livro_existente = carrinho_de_compras.find(book => book.titulo.includes(livro_titulo.innerHTML));
    
    if (livro_existente) {
        livro_existente.maisQNT();
    }
    else {
        carrinho_de_compras.push(new livro(livro_titulo.innerHTML, livro_valor.innerHTML));
    }
    atualizarNotificacao();
    atualizarLista();
}

function atualizarNotificacao() {
    if (carrinho_de_compras.length > 0) {
        if (somaQNT() > 99) {
            notificacao.innerHTML = '+99';
        }
        else {
            notificacao.innerHTML = somaQNT();
        }
        if (notificacao.style.display !== "block") {
            notificacao.style.display = "block";
        }
    }
    else {
        notificacao.style.display = "none";
    }
}

function atualizarLista() {
    lista_de_compras.innerHTML = '';
    carrinho_de_compras.forEach(book => {
        lista_de_compras.innerHTML += `
        <div class="livro-no-carrinho">
            <h3 style="text-transform: uppercase">${book.titulo}<h3>
            <div class="descricao">
                <div>
                    <h5>QNT: ${book.qnt}</h5>
                    <button onclick="carrinho_de_compras[${carrinho_de_compras.indexOf(book)}].menosQNT()" class="btn-QNT-menos">-</button>
                    <button onclick="carrinho_de_compras[${carrinho_de_compras.indexOf(book)}].maisQNT()" class="btn-QNT-mais">+</button>
                </div>
                <h5>R$ ${book.valor}</h5>
            </div>
        </div>
        `
    });
}

function esconderOuMostrarLista() {
    if (lista_de_compras.style.display !== "block") {
        lista_de_compras.style.display = "block";
    }
    else {
        lista_de_compras.style.display = "none";
    }
}