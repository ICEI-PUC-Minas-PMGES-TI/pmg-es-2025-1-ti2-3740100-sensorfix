// URLs da API
const urlMovimentacao = "http://localhost:8080/movimentacoes/";
const urlEquipamento = "http://localhost:8080/equipamentos/";
const urlEstoqueDeposito = "http://localhost:8080/estoque-depositos";

// Variáveis globais
let courretEquipamento;
let movimentacoes = [];

// Inputs
const inputIdEquipamento = document.getElementById("inputIdEquip");
const inputnomeProduto = document.getElementById("nomeProduto");
const inputselectOrigem = document.getElementById("selectOrigem");
const inputselectDestino = document.getElementById("selectDestino");
const inputQuantidade = document.getElementById("quantidade");

// Botões
const btnBuscaEquip = document.getElementById("btnBuscarEquip");
btnBuscaEquip.addEventListener("click", () => {
  getEquipamento(urlEquipamento, inputIdEquipamento.value);
});

const btnSalvarMovimentacao = document.getElementById("btnSalvarMovimentacao");
btnSalvarMovimentacao.addEventListener("click", async () => {
  const origem = inputselectOrigem.value;
  const destino = inputselectDestino.value;
  const idEquipamento = inputIdEquipamento.value;
  let quantidade = parseInt(inputQuantidade.value);

  const quantidadeOrigem = await getQuantidadeDeposito(urlEstoqueDeposito, origem);
  if (quantidade > quantidadeOrigem) {
    alert(`Quantidade indisponível no depósito de origem.\nDisponível: ${quantidadeOrigem}`);
    inputQuantidade.value = ""; // limpa o campo
    inputQuantidade.focus(); // foca para o usuário digitar novamente
    return;
  }

  const movimentacaoCriada = await criaMovimentacao(origem, destino, idEquipamento, quantidade);
  if (movimentacaoCriada) {
    await atualizarQuantidadeDeposito(origem, quantidadeOrigem - quantidade);
    const quantidadeDestino = await getQuantidadeDeposito(urlEstoqueDeposito, destino);
    await atualizarQuantidadeDeposito(destino, quantidadeDestino + quantidade);
    getTodasMovimentacoes();
  }
});

// Função que busca um equipamento por ID
async function getEquipamento(url, idEquipamento) {
  try {
    const resposta = await fetch(url + idEquipamento);
    if (resposta.ok) {
      courretEquipamento = await resposta.json();
      inputnomeProduto.value = courretEquipamento.nome;
    } else {
      console.error("Erro na requisição:", resposta.status);
    }
  } catch (erro) {
    console.error("Erro ao buscar equipamento:", erro);
  }
}

// Função que busca todas as movimentações
async function getTodasMovimentacoes() {
  try {
    const resposta = await fetch(urlMovimentacao);
    if (!resposta.ok) throw new Error("Erro ao buscar movimentações");

    movimentacoes = await resposta.json();
    populaTabelaMovimentacoes(movimentacoes);
  } catch (e) {
    console.error("Erro:", e);
  }
}

// Popula a tabela com as movimentações
function populaTabelaMovimentacoes(lista) {
  const tabela = document.querySelector("#transactions-table tbody");
  if (!tabela) return console.warn("Tabela não encontrada");
  tabela.innerHTML = "";

  const nomesDepositos = {
    1: "Ativação",
    2: "Ativo",
    3: "Danificado",
    4: "Estoque",
    5: "Manutenção"
  };

  lista.forEach(mov => {
    const linha = document.createElement("tr");
    const data = mov.dataMovimentacao;
    const dataFormatada = `${data[2].toString().padStart(2, "0")}/${data[1].toString().padStart(2, "0")}/${data[0]} ${data[3].toString().padStart(2, "0")}:${data[4].toString().padStart(2, "0")}`;

    linha.innerHTML = `
      <td>${dataFormatada}</td>
      <td>${mov.equipamento.nome}</td>
      <td>${nomesDepositos[mov.origem]}</td>
      <td>${nomesDepositos[mov.destino]}</td>
      <td>${mov.quantidade}</td>
    `;

    tabela.appendChild(linha);
  });
}

// Cria uma nova movimentação
async function criaMovimentacao(origem, destino, idEquipamento, quantidade) {
  const dataAtual = new Date().toISOString().slice(0, 19);

  const novaMovimentacao = {
    origem: parseInt(origem),
    destino: parseInt(destino),
    dataMovimentacao: dataAtual,
    quantidade: parseInt(quantidade),
    equipamento: { id: parseInt(idEquipamento) }
  };

  try {
    const resposta = await fetch(urlMovimentacao, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaMovimentacao)
    });

    if (resposta.ok) {
      alert("Movimentação criada com sucesso!");
      return true;
    } else {
      console.error("Erro ao salvar movimentação:", resposta.status);
      return false;
    }
  } catch (error) {
    console.error("Erro ao tentar criar movimentação:", error);
    return false;
  }
}

// Busca a quantidade de um depósito
async function getQuantidadeDeposito(baseUrl, idDeposito) {
  try {
    const resposta = await fetch(`${baseUrl}/${idDeposito}`);
    if (resposta.ok) {
      const dados = await resposta.json();
      return dados.quantidade;
    } else {
      console.error("Erro ao buscar depósito:", resposta.status);
      return 0;
    }
  } catch (erro) {
    console.error("Erro ao buscar depósito:", erro);
    return 0;
  }
}

// Atualiza a quantidade de um depósito
// Atualiza a quantidade de um depósito (usando PATCH com JSON {"quantidade": novaQuantidade})
async function atualizarQuantidadeDeposito(idDeposito, novaQuantidade) {
  try {
    const body = { quantidade: novaQuantidade };
    const resposta = await fetch(`${urlEstoqueDeposito}/${idDeposito}/quantidade`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao atualizar depósito ${idDeposito}: ${resposta.status}`);
    }
  } catch (erro) {
    console.error("Erro ao atualizar depósito:", erro);
  }
}


// Inicializa funcionalidades do modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("movimentacao-modal");
  const openBtn = document.getElementById("nova-movimentacao-btn");
  const closeBtn = document.querySelector(".close-button");
  const form = document.getElementById("form-movimentacao");

  openBtn?.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
      <td>${formData.get("data")}</td>
      <td>${formData.get("descricao")}</td>
      <td>${formData.get("deposito")}</td>
      <td>${formData.get("quantidade")}</td>
    `;

    document.querySelector("#transactions-table tbody")?.appendChild(novaLinha);
    form.reset();
    modal.style.display = "none";
  });

  // Carrega movimentações ao iniciar
  getTodasMovimentacoes();
});
