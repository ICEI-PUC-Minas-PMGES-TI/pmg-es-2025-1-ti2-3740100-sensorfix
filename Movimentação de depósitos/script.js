// script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const applyFilters = document.getElementById('apply-filters');
    const dataTable = document.getElementById('data-table');
  
    // Exemplo de dados
    const dados = [
      { data: '2025-04-10', tipo: 'entrada', valor: 'R$ 500,00', descricao: 'Depósito bancário' },
      { data: '2025-04-11', tipo: 'saída', valor: 'R$ 200,00', descricao: 'Pagamento de fornecedor' },
      { data: '2025-04-11', tipo: 'entrada', valor: 'R$ 300,00', descricao: 'Transferência interna' },
    ];
  
    // Função para renderizar a tabela
    function renderTabela(filtrados) {
      dataTable.innerHTML = '';
      filtrados.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.data}</td>
          <td>${item.tipo}</td>
          <td>${item.valor}</td>
          <td>${item.descricao}</td>
        `;
        dataTable.appendChild(row);
      });
    }
  
    // Renderiza inicialmente todos
    renderTabela(dados);
  
    // Menu responsivo
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  
    // Aplicar filtros
    applyFilters.addEventListener('click', () => {
      const dataSelecionada = document.getElementById('filter-date').value;
      const tipoSelecionado = document.getElementById('filter-type').value;
  
      const filtrados = dados.filter(item => {
        const correspondeData = !dataSelecionada || item.data === dataSelecionada;
        const correspondeTipo = tipoSelecionado === 'todos' || item.tipo === tipoSelecionado;
        return correspondeData && correspondeTipo;
      });
  
      renderTabela(filtrados);
    });
  });
  