import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { api } from "../../utils/api";
import PageLayout from "../../components/PageLayout";

const urlDepositos = "/estoque-depositos/";
const urlDemandas = "/api/demandas/";
const urlFalhas = "/falhas//todas_falhas";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function parseDateArray(arr) {
  if (!Array.isArray(arr) || arr.length < 3) return null;
  const year = arr[0];
  const month = arr[1] - 1;
  const day = arr[2];
  const hour = arr[3] || 0;
  const minute = arr[4] || 0;
  const second = arr[5] || 0;
  const millisecond = arr[6] ? Math.floor(arr[6] / 1000000) : 0;
  return new Date(year, month, day, hour, minute, second, millisecond);
}

async function getDepositos(url) {
  try {
    return await api.get(url);
  } catch {
    return [];
  }
}
async function getDemandas(url) {
  try {
    return await api.get(url);
  } catch {
    return [];
  }
}
async function getFalhas(url) {
  try {
    return await api.get(url);
  } catch {
    return [];
  }
}

function calcularMediaTempoProducao(vetor) {
  if (!vetor || vetor.length === 0) return "0.00";
  let somaTempos = 0;
  let demandasValidas = 0;
  vetor.forEach((obj) => {
    const dtCriacao = parseDateArray(obj.dataHoraCriacao);
    const dtEncerramento = parseDateArray(obj.dataEncerramento);
    if (
      dtCriacao &&
      dtEncerramento &&
      !isNaN(dtCriacao.getTime()) &&
      !isNaN(dtEncerramento.getTime()) &&
      dtEncerramento > dtCriacao
    ) {
      const diffMs = dtEncerramento.getTime() - dtCriacao.getTime();
      const diffHoras = diffMs / (1000 * 60 * 60);
      somaTempos += diffHoras;
      demandasValidas++;
    }
  });
  if (demandasValidas === 0) return "0.00";
  const media = somaTempos / demandasValidas;
  return media.toFixed(2);
}

function processarDadosFalhas(vetor) {
  const contagemFalhas = {};
  vetor.forEach((falha) => {
    const nomeFalha = falha.falhaEncontrada;
    if (nomeFalha) {
      contagemFalhas[nomeFalha] = (contagemFalhas[nomeFalha] || 0) + 1;
    }
  });
  const labels = Object.keys(contagemFalhas).sort(
    (a, b) => contagemFalhas[b] - contagemFalhas[a]
  );
  const data = labels.map((label) => contagemFalhas[label]);
  return { labels, data };
}

function filtrarDemandasPorAnoEMes(vetor, ano, mesesSelecionados) {
  return vetor.filter((obj) => {
    const dateObj = parseDateArray(obj.dataHoraCriacao);
    if (!dateObj) return false;
    return (
      dateObj.getFullYear() === ano &&
      mesesSelecionados.includes(dateObj.getMonth() + 1)
    );
  });
}
function filtrarFalhasPorAnoEMes(vetor, ano, mesesSelecionados) {
  return vetor.filter((obj) => {
    const dateObj = parseDateArray(obj.dataRevisao);
    if (!dateObj) return false;
    return (
      dateObj.getFullYear() === ano &&
      mesesSelecionados.includes(dateObj.getMonth() + 1)
    );
  });
}

export default function Indicator() {
  // Estados para dados
  const [depositos, setDepositos] = useState([]);
  const [demandas, setDemandas] = useState([]);
  const [falhas, setFalhas] = useState([]);

  // Filtros Demandas
  const [anosDemandas, setAnosDemandas] = useState([]);
  const [anoFiltro, setAnoFiltro] = useState("");
  const [mesesFiltro, setMesesFiltro] = useState([]);
  const [mediaTempo, setMediaTempo] = useState("0.00");
  const [mediaFiltroAtivo, setMediaFiltroAtivo] = useState(false);

  // Filtros Falhas
  const [anosFalhas, setAnosFalhas] = useState([]);
  const [anoFalhaFiltro, setAnoFalhaFiltro] = useState("");
  const [mesesFalhaFiltro, setMesesFalhaFiltro] = useState([]);
  const [dadosFalhas, setDadosFalhas] = useState({ labels: [], data: [] });
  const [falhaFiltroAtivo, setFalhaFiltroAtivo] = useState(false);

  // Refs para canvas
  const depEquipRef = useRef(null);
  const falhasRef = useRef(null);

  // Chart instances
  const chartDepRef = useRef(null);
  const chartFalhasRef = useRef(null);

  // Carregar dados iniciais
  useEffect(() => {
    async function fetchData() {
      const dep = await getDepositos(urlDepositos);
      setDepositos(dep);

      const dem = await getDemandas(urlDemandas);
      setDemandas(dem);

      const fal = await getFalhas(urlFalhas);
      setFalhas(fal);
    }
    fetchData();
  }, []);

  // Atualizar anos disponíveis para filtro de demandas
  useEffect(() => {
    const anos = demandas
      .map((obj) => {
        const dateObj = parseDateArray(obj.dataHoraCriacao);
        return dateObj ? dateObj.getFullYear() : null;
      })
      .filter((ano) => ano !== null);
    setAnosDemandas([...new Set(anos)].sort((a, b) => a - b));
    // Média inicial
    setMediaTempo(calcularMediaTempoProducao(demandas));
    setMediaFiltroAtivo(false);
  }, [demandas]);

  // Atualizar anos disponíveis para filtro de falhas
  useEffect(() => {
    const anos = falhas
      .map((obj) => {
        const dateObj = parseDateArray(obj.dataRevisao);
        return dateObj ? dateObj.getFullYear() : null;
      })
      .filter((ano) => ano !== null);
    setAnosFalhas([...new Set(anos)].sort((a, b) => a - b));
    setDadosFalhas(processarDadosFalhas(falhas));
    setFalhaFiltroAtivo(false);
  }, [falhas]);

  // Gráfico de depósitos
  useEffect(() => {
    if (!depEquipRef.current || depositos.length === 0) return;
    const quantidades = depositos.map((obj) => Number(obj.quantidade));
    const soma = quantidades.reduce((acc, val) => acc + val, 0);
    const nomes = depositos.map((obj, i) => {
      const percentual = ((quantidades[i] / soma) * 100).toFixed(1);
      return `${obj.tipoDeposito} (${percentual}%)`;
    });
    if (chartDepRef.current) chartDepRef.current.destroy();
    chartDepRef.current = new Chart(depEquipRef.current, {
      type: "pie",
      data: {
        labels: nomes,
        datasets: [
          {
            label: "Quantidade",
            data: quantidades,
            backgroundColor: [
              "rgba(229, 235, 54, 0.7)",
              "rgba(114, 235, 54, 0.7)",
              "rgba(235, 54, 54, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(148, 54, 235, 0.7)",
            ],
            borderColor: "rgb(0, 0, 0)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Distribuição dos Tipos de Depósitos" },
        },
      },
    });
    // eslint-disable-next-line
  }, [depositos]);

  // Gráfico de falhas
  useEffect(() => {
    if (!falhasRef.current) return;
    if (chartFalhasRef.current) chartFalhasRef.current.destroy();
    const labels =
      dadosFalhas.labels && dadosFalhas.labels.length > 0
        ? dadosFalhas.labels
        : [];
    const chartData =
      dadosFalhas.data && dadosFalhas.data.length > 0 ? dadosFalhas.data : [];
    const totalFalhas = chartData.reduce((sum, count) => sum + count, 0);
    chartFalhasRef.current = new Chart(falhasRef.current, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: falhaFiltroAtivo
              ? `Ocorrências de Falhas (filtrado) - Total: ${totalFalhas}`
              : `Ocorrências de Falhas - Total: ${totalFalhas}`,
            data: chartData,
            backgroundColor: "rgba(99, 193, 255, 0.7)",
            borderColor: "rgb(99, 195, 255)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Falha Encontrada" } },
          y: {
            beginAtZero: true,
            precision: 0,
            title: { display: true, text: "Número de Ocorrências" },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) label += ": ";
                if (context.parsed.y !== null) label += context.parsed.y;
                return label;
              },
            },
          },
        },
      },
    });
    // eslint-disable-next-line
  }, [dadosFalhas, falhaFiltroAtivo]);

  // Handlers filtro demandas
  function handleAnoFiltro(e) {
    setAnoFiltro(e.target.value);
  }
  function handleMesFiltro(e) {
    const val = parseInt(e.target.value);
    setMesesFiltro((prev) =>
      e.target.checked ? [...prev, val] : prev.filter((m) => m !== val)
    );
  }
  function aplicarFiltroDemandas() {
    const ano = parseInt(anoFiltro);
    if (isNaN(ano) || mesesFiltro.length === 0) {
      alert(
        "Para o filtro de Média de Demora de Produção: Informe um ano e pelo menos um mês."
      );
      return;
    }
    const vetorFiltrado = filtrarDemandasPorAnoEMes(demandas, ano, mesesFiltro);
    setMediaTempo(calcularMediaTempoProducao(vetorFiltrado));
    setMediaFiltroAtivo(true);
  }
  function limparFiltroDemandas() {
    setAnoFiltro("");
    setMesesFiltro([]);
    setMediaTempo(calcularMediaTempoProducao(demandas));
    setMediaFiltroAtivo(false);
  }

  // Handlers filtro falhas
  function handleAnoFalhaFiltro(e) {
    setAnoFalhaFiltro(e.target.value);
  }
  function handleMesFalhaFiltro(e) {
    const val = parseInt(e.target.value);
    setMesesFalhaFiltro((prev) =>
      e.target.checked ? [...prev, val] : prev.filter((m) => m !== val)
    );
  }
  function aplicarFiltroFalhas() {
    const ano = parseInt(anoFalhaFiltro);
    if (isNaN(ano) || mesesFalhaFiltro.length === 0) {
      alert(
        "Para o filtro de Defeitos Recorrentes: Informe um ano e pelo menos um mês."
      );
      return;
    }
    const vetorFiltrado = filtrarFalhasPorAnoEMes(
      falhas,
      ano,
      mesesFalhaFiltro
    );
    setDadosFalhas(processarDadosFalhas(vetorFiltrado));
    setFalhaFiltroAtivo(true);
  }
  function limparFiltroFalhas() {
    setAnoFalhaFiltro("");
    setMesesFalhaFiltro([]);
    setDadosFalhas(processarDadosFalhas(falhas));
    setFalhaFiltroAtivo(false);
  }

  return (
    <PageLayout>
      <div className="container py-4">
        <h1 className="mb-4 text-primary">Indicadores de Desempenho</h1>
        <div className="row g-4">
          {/* Gráfico Depósitos */}
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title fs-5 mb-3">Estado Atual Depósitos</h2>
                <canvas ref={depEquipRef} />
              </div>
            </div>
          </div>

          {/* Média de Demora de Produção */}
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title fs-5 mb-3">
                  Média de Demora de Produção
                </h2>
                <form className="mb-3">
                  <div className="mb-2">
                    <label htmlFor="ano" className="form-label">
                      Escolha o ano:
                    </label>
                    <input
                      type="number"
                      list="anos"
                      id="ano"
                      name="ano"
                      min="1900"
                      max="2100"
                      value={anoFiltro}
                      onChange={handleAnoFiltro}
                      className="form-control"
                    />
                    <datalist id="anos">
                      {anosDemandas.map((ano) => (
                        <option key={ano} value={ano} />
                      ))}
                    </datalist>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Meses:</label>
                    <div className="row row-cols-3 g-1">
                      {meses.map((mes, i) => (
                        <div className="col" key={i}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`mes_${i + 1}`}
                              value={i + 1}
                              checked={mesesFiltro.includes(i + 1)}
                              onChange={handleMesFiltro}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`mes_${i + 1}`}
                            >
                              {mes}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      id="btnAplicarFiltro"
                      onClick={aplicarFiltroDemandas}
                    >
                      Aplicar Filtro
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      id="btnLimparFiltro"
                      onClick={limparFiltroDemandas}
                    >
                      Limpar Filtro
                    </button>
                  </div>
                </form>
                <div className="alert alert-info py-2" id="mediaTempoProducao">
                  <p className="mb-1">
                    Média de Demora: <strong>{mediaTempo} horas</strong>{" "}
                    {mediaFiltroAtivo ? "(filtrado)" : "(total)"}
                  </p>
                  {mediaTempo === "0.00" && (
                    <p className="text-danger small mb-0">
                      Nenhuma demanda válida encontrada para o período
                      selecionado.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Apuração de defeitos por revisão */}
          <div className="col-lg-4 col-md-12">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title fs-5 mb-3">
                  Apuração de defeitos por revisão
                </h2>
                <form className="mb-3">
                  <div className="mb-2">
                    <label htmlFor="anoRevisoes" className="form-label">
                      Escolha o ano:
                    </label>
                    <input
                      type="number"
                      list="anosRevisoes"
                      id="anoRevisoes"
                      name="anoRevisoes"
                      min="1900"
                      max="2100"
                      value={anoFalhaFiltro}
                      onChange={handleAnoFalhaFiltro}
                      className="form-control"
                    />
                    <datalist id="anosRevisoes">
                      {anosFalhas.map((ano) => (
                        <option key={ano} value={ano} />
                      ))}
                    </datalist>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Meses:</label>
                    <div className="row row-cols-3 g-1">
                      {meses.map((mes, i) => (
                        <div className="col" key={i}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`mes_rev_${i + 1}`}
                              value={i + 1}
                              checked={mesesFalhaFiltro.includes(i + 1)}
                              onChange={handleMesFalhaFiltro}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`mes_rev_${i + 1}`}
                            >
                              {mes}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      id="btnAplicarFiltroRevisoes"
                      onClick={aplicarFiltroFalhas}
                    >
                      Aplicar Filtro
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      id="btnLimparFiltroRevisoes"
                      onClick={limparFiltroFalhas}
                    >
                      Limpar Filtro
                    </button>
                  </div>
                </form>
                <canvas ref={falhasRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
