// ============================
// AGROCONECTA 2.0
// ============================

let produtos =
JSON.parse(localStorage.getItem("produtos")) || [];

let carrinho = [];

// ============================
// LOGIN
// ============================

function mostrarLoginProdutor() {
    document.getElementById("loginProdutor").style.display = "flex";
}

function mostrarLoginComprador() {
    document.getElementById("loginComprador").style.display = "flex";
}

function fecharLogin() {
    document.getElementById("loginProdutor").style.display = "none";
    document.getElementById("loginComprador").style.display = "none";
}

function loginProdutor() {

    const usuario =
    document.getElementById("usuarioProdutor").value;

    const senha =
    document.getElementById("senhaProdutor").value;

    if(usuario && senha){

        alert("Login realizado com sucesso!");

        fecharLogin();

        document
        .getElementById("dashboard")
        .scrollIntoView({
            behavior:"smooth"
        });

    }else{

        alert("Preencha usuário e senha");

    }

}

function loginComprador(){

    const usuario =
    document.getElementById("usuarioComprador").value;

    const senha =
    document.getElementById("senhaComprador").value;

    if(usuario && senha){

        alert("Bem-vindo!");

        fecharLogin();

        document
        .getElementById("produtos")
        .scrollIntoView({
            behavior:"smooth"
        });

    }else{

        alert("Preencha usuário e senha");

    }

}

// ============================
// PRODUTOS
// ============================

function salvarProdutos(){

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}

function cadastrarProduto(){

    const nome =
    document.getElementById("nomeProduto").value;

    const preco =
    Number(
        document.getElementById("precoProduto").value
    );

    const quantidade =
    Number(
        document.getElementById("quantidadeProduto").value
    );

    const categoria =
    document.getElementById("categoriaProduto").value;

    if(
        !nome ||
        !preco ||
        !quantidade ||
        !categoria
    ){
        alert("Preencha todos os campos");
        return;
    }

    produtos.push({
        nome,
        preco,
        quantidade,
        categoria
    });

    salvarProdutos();

    renderizarProdutos();

    atualizarDashboard();

    document.getElementById("nomeProduto").value = "";
    document.getElementById("precoProduto").value = "";
    document.getElementById("quantidadeProduto").value = "";
    document.getElementById("categoriaProduto").value = "";

    alert("Produto cadastrado!");
}

// ============================
// LISTAGEM
// ============================

function renderizarProdutos(lista = produtos){

    const container =
    document.getElementById("listaProdutos");

    container.innerHTML = "";

    lista.forEach((produto,index)=>{

        container.innerHTML += `

        <div class="produto-card">

            <h3>${produto.nome}</h3>

            <p>
            Categoria:
            ${produto.categoria}
            </p>

            <p>
            Quantidade:
            ${produto.quantidade}
            </p>

            <p>
            Preço:
            R$ ${produto.preco.toFixed(2)}
            </p>

            <button
            onclick="adicionarCarrinho(${index})">

            Adicionar ao Carrinho

            </button>

        </div>

        `;

    });

}

// ============================
// PESQUISA
// ============================

function pesquisarProduto(){

    const texto =
    document
    .getElementById("pesquisa")
    .value
    .toLowerCase();

    const filtrados =
    produtos.filter(produto =>

        produto.nome
        .toLowerCase()
        .includes(texto)

    );

    renderizarProdutos(filtrados);

}

// ============================
// CARRINHO
// ============================

function adicionarCarrinho(index){

    carrinho.push(produtos[index]);

    renderizarCarrinho();

}

function renderizarCarrinho(){

    const area =
    document.getElementById("itensCarrinho");

    area.innerHTML = "";

    let total = 0;

    carrinho.forEach(item=>{

        total += item.preco;

        area.innerHTML += `

        <div class="item-carrinho">

            <strong>
            ${item.nome}
            </strong>

            <p>
            R$ ${item.preco.toFixed(2)}
            </p>

        </div>

        `;

    });

    document
    .getElementById("valorTotal")
    .innerText =

    "Total: R$ " +
    total.toFixed(2);

}

function finalizarCompra(){

    if(carrinho.length === 0){

        alert("Carrinho vazio");

        return;

    }

    alert(
        "Compra simulada com sucesso!"
    );

    carrinho = [];

    renderizarCarrinho();

}

// ============================
// DASHBOARD
// ============================

function atualizarDashboard(){

    let totalProdutos =
    produtos.length;

    let estoque = 0;

    let receita = 0;

    produtos.forEach(produto=>{

        estoque += produto.quantidade;

        receita +=
        produto.preco *
        produto.quantidade;

    });

    document
    .getElementById("totalProdutos")
    .innerText =
    totalProdutos;

    document
    .getElementById("estoqueTotal")
    .innerText =
    estoque;

    document
    .getElementById("receitaTotal")
    .innerText =

    "R$ " +
    receita.toFixed(2);

}

// ============================
// INICIALIZAÇÃO
// ============================

renderizarProdutos();

atualizarDashboard();

renderizarCarrinho();
