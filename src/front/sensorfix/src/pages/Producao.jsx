import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { GoPlus } from "react-icons/go";
import { FaSave } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import Select from "react-select";

const DemandaAberta = () => {

  const opcoes = ["Peça 1", "Peça 2", "Peça 3"];
  return (
    <div className="container-fluid bg-lightgray">
      <h4 className="display-6 text-start mb-1">
        Demanda <span id="nomeDemanda">Lorem Ipsum</span> - Nº{" "}
        <span id="idDemanda">3</span>
      </h4>
      <p className="fs-5 text-start">
        Gerado em: <span id="horaDemanda">22:22</span> -{" "}
        <span id="dataDemanda">31/12/2025</span>
      </p>
      <div className="mb-2 text-center row justify-content-center p-1">
        <div className="col-8 d-flex align-items-center bg-light rounded">
          <label
            className="form-check-label fs-5 me-2 "
            htmlFor="switchLimpezaCheck"
          >
            Limpeza realizada?
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchLimpezaCheck"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              id="addPecaDefeituosa"
              className="btn btn-light dropdown-toggle rounded"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <GoPlus /> Adicionar Peça Defeituosa
            </button>
            <ul className="dropdown-menu">
              <li className="p-2">
                <Select
                  id="idPeca"
                  options={opcoes.map((op) => ({ value: op, label: op }))}
                  placeholder="Valor"
                  isSearchable
                  noOptionsMessage={() => "Não encontrado"}
                />
              </li>
              <li className="p-2">
                <Select
                  id="choicePeca"
                  options={opcoes.map((op) => ({ value: op, label: op }))}
                  placeholder="Selecione a peça"
                  isSearchable
                  noOptionsMessage={() => "Não encontrado"}
                />
              </li>
              <li className="p-2">
                <textarea
                  className="form-control"
                  placeholder="Observações"
                  id="observacoesDropdown"
                  style={{ resize: "none" }}
                  rows="2"
                ></textarea>
              </li>
              <li className="p-2">
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="substituiPeca"
                  ></input>
                  <label className="form-check-label" for="checkDefault">
                    Substituir Peça Original
                  </label>
                </div>
              </li>
              <li className="p-2">
                <button className="btn btn-primary">Adicionar Peça defeituosa</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-2 text-center row justify-content-center p-1">
        <div className="text-start">
          Descrição do problema:{" "}
          <span id="descricaoProblema">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            blanditiis ex unde, sit, at adipisci tempora, non obcaecati numquam
            maiores dicta accusamus nisi modi et? Quasi nihil veritatis
            explicabo odio.
          </span>
        </div>
        <hr className="my-4 border-top border-secondary" />
        <div className="text-start">
          <h1 className="display-7 mb-5">Peças defeituosas:</h1>
        </div>
        <hr className="my-4 border-top border-secondary" />
        <div className="d-flex align-items-start">
          <label
            className="form-check-label fs-5 me-2 "
            htmlFor="switchTesteRealizado"
          >
            Teste realizado?
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchTesteRealizado"
            />
          </div>
        </div>
        <div className="d-flex align-items-start">
          <label
            className="form-check-label fs-5 me-2 "
            htmlFor="encaminharPara"
          >
            Encaminhar para:
          </label>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="encaminharPara"
              id="estoque"
              value="entrada"
            />
            <label class="form-check-label" for="encaminharPara">
              Estoque
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="encaminharPara"
              id="reciclagem"
              value="reciclagem"
            />
            <label class="form-check-label" for="encaminharPara">
              Reciclagem
            </label>
          </div>
        </div>
        <button className="btn btn-success rounded w-25 mt-3 mb-2 p-1">
          Enviar
        </button>
      </div>
    </div>
  );
};

const AddPecasDefeituosas = () => {
  const [selects, setSelects] = useState([""]); // começa com 1 select vazio

  const opcoes = ["Peça 1", "Peça 2", "Peça 3"];

  const handleAddSelect = () => {
    setSelects([...selects, ""]); // adiciona mais um select vazio
  };

  const handleChange = (index, value) => {
    const novosSelects = [...selects];
    novosSelects[index] = value;
    setSelects(novosSelects);
  };

  return (
    <div className="container-fluid mb-3">
      <p className="fs-5 text-start">Selecione suas opções:</p>
      {selects.map((valor, index) => (
        <div key={`${valor}-${index}`} className="row align-items-center mb-2">
          <div className="col-11">
            <Select
              id="selectPeca"
              options={opcoes.map((op) => ({ value: op, label: op }))}
              className="w-100"
              placeholder="Selecionar Peça Defeituosa"
              isSearchable
              noOptionsMessage={() => "Peça não encontrada"}
              value={valor}
              onChange={(selectedOption) =>
                handleChange(index, selectedOption?.value)
              }
            />
          </div>
          <div className="col-1 text-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                const novosSelects = selects.filter((_, i) => i !== index);
                setSelects(novosSelects);
              }}
            >
              <HiMiniXMark />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn color-blue mt-2"
        onClick={handleAddSelect}
      >
        <GoPlus /> Adicionar opção
      </button>
    </div>
  );
};

const FormCriarDemanda = () => {
  const options = [
    { value: "pc-X", label: "Computador X" },
    { value: "tablet-y", label: "Tablet Y" },
    { value: "tv-z", label: "TV Z" },
  ];

  return (
    <div>
      <div className="mb-3">
        <Select
          id="selectInsumo"
          options={options}
          className="w-100"
          placeholder="Selecionar Insumo"
          isSearchable
          noOptionsMessage={() => "Nada encontrado 😕"}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="problemDescription"
          style={{ resize: "none" }}
          rows="3"
          placeholder="Descrição do problema"
        ></textarea>
      </div>
      <AddPecasDefeituosas />
      <div className="mb-3">
        <textarea
          className="form-control"
          id="problemDescription"
          style={{ resize: "none" }}
          rows="2"
          placeholder="Observações:"
        ></textarea>
      </div>
    </div>
  );
};

export default function Producao() {
  const [showCriarDemanda, setShowCriarDemanda] = useState(false);

  return (
    <PageLayout>
      <div className="container text-center">
        <h1 className="display-5 text-start">Produção</h1>

        <div className="row g-4">
          {/* Coluna da esquerda */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="p-3 card h-100">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-6 text-start">
                    <p className="fs-4 mb-0">Demandas</p>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary btn-sm">
                      Filtrar
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm ms-2"
                      onClick={() => setShowCriarDemanda(true)}
                    >
                      <GoPlus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                {/* Conteúdo adicional pode ser adicionado aqui */}
              </div>
            </div>
          </div>

          {/* Coluna da direita */}
          <div className="col-lg-8 col-md-6 col-12">
            <div className="p-3 card h-100">
              <div className="card-body">
                {showCriarDemanda ? (
                  <div className="border p-3 bg-lightgray">
                    <div className="d-flex justify-content-between align-items-center">
                      <h1 className="fs-4 text-start">Criar nova Demanda</h1>
                      <button
                        type="button"
                        className="btn btn-close"
                        onClick={() => setShowCriarDemanda(false)}
                      ></button>
                    </div>
                    <div className="text-start m-1">
                      <p>
                        Criado por: <small id="createdBy">João Marcos</small> -{" "}
                        <small id="createdTime">00:00</small> -{" "}
                        <small id="createdDate">01/01/2025</small>
                      </p>
                    </div>
                    <div className="mt-3">
                      <FormCriarDemanda />
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button type="button" className="btn color-blue">
                        <FaSave /> <small>Salvar</small>
                      </button>
                    </div>
                  </div>
                ) : (
                  <DemandaAberta />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
