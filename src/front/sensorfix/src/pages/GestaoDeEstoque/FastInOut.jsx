import PageLayout from "../../components/PageLayout";
export default function FastInOut() {
  return (
    <PageLayout>
      <div className="container text-center" style={{ maxWidth: "50%" }}>
        <div className="card card-body bg-light bg-gradient shadow-sm p-5">
          <h1 className="display-6">Fast In/Out</h1>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3 text-center row">
              <label
                htmlFor="idInsumoEquipamento"
                className="form-label  fw-semibold"
              >
                Digite o ID do insumo/equipamento
              </label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control rounded-pill px-1 "
                  id="idInsumoEquipamento"
                />
              </div>
              <div className="col-2">
                <button
                  className="btn btn-warning rounded-pill px-4 "
                  id="buscaIdInsumoEquipamento"
                >
                  Buscar
                </button>
              </div>
            </div>
            <div class="alert alert-danger fw-semibold" role="alert">
              ID NÃO ENCONTRADO
            </div>
          </div>

          <div className="mb-2 text-center d-flex flex-column align-items-center">
            <label
              htmlFor="idInsumoEquipamento"
              className="form-label fw-semibold"
            >
              Quantidade
            </label>
            <input
              type="text"
              className="form-control rounded-pill w-25  "
              id="idInsumoEquipamento"
            />
          </div>

          <div className="mb-2 text-center d-flex flex-column align-items-center">
            <label
              htmlFor="idInsumoEquipamento"
              className="form-label fw-semibold"
            >
              Descrição
            </label>
            <textarea
              className="form-control rounded-pill py-2 px-4"
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ resize: "none" }}
            ></textarea>
          </div>

          <div className="mb-2 text-center row justify-content-center">
            <div className="col-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="entradaEsaida"
                  id="entrada"
                  value="entrada"
                />
                <label class="form-check-label" for="entradaEsaida">
                Entrada
                </label>
              </div>
            </div>
            <div className="col-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="entradaEsaida"
                  id="saida"
                  value="saida"
                />
                <label class="form-check-label" for="inlineRentradaEsaidaadio1">
                  Saída
                </label>
              </div>
            </div>
          </div>

          <div className="mb-2 text-center d-flex flex-column align-items-center">
            <label
              htmlFor="idInsumoEquipamento"
              className="form-label fw-semibold"
            >
              Deposito
            </label>
            <input
              type="text"
              className="form-control rounded-pill w-25  "
              id="idInsumoEquipamento"
            />
          </div>

          <div className="mt-3 text-center d-flex flex-column align-items-center">
            <button className="btn btn-success rounded-pill">Agregar</button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
