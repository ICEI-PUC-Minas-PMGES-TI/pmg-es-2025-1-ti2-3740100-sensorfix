import PageLayout from "../../components/PageLayout";
export default function EntradaInsumos() {
  return (
    <PageLayout>
      <div className="container text-center" style={{ maxWidth: "50%" }}>
        <div className="card card-body bg-light bg-gradient shadow-sm ">
        <h1 className="display-6">Entrada de Insumos</h1>
          <div className="d-flex flex-column align-items-center ">
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
            <button
              className="mb-2 btn btn-warning rounded-pill px-4  "
              id="cadastrarInsumoEquipamento"
            >
              Cadastrar
            </button>
          </div>

          <div className="mb-2 text-center d-flex flex-column align-items-center">
            <label
              htmlFor="idInsumoEquipamento"
              className="form-label fw-semibold"
            >
              Descrição
            </label>
            <input
              type="text"
              className="form-control rounded-pill w-75  "
              id="idInsumoEquipamento"
            />
          </div>

          <div className="mb-2 text-center row justify-content-center">
            <div className="col-5">
              <label htmlFor="pesoInsumo" className="form-label fw-semibold">
                Peso (g)
              </label>
              <input
                type="text"
                className="form-control rounded-pill text-center"
                id="pesoInsumo"
              />
            </div>
            <div className="col-5">
              <label htmlFor="estoqueMin" className="form-label fw-semibold">
                Estoque mínimo
              </label>
              <input
                type="text"
                className="form-control rounded-pill text-center"
                id="estoqueMin"
              />
            </div>
          </div>

          <div className="mb-2 text-center row justify-content-center">
            <div className="col-5">
              <label htmlFor="endereco" className="form-label fw-semibold">
                Endereço
              </label>
              <input
                type="text"
                className="form-control rounded-pill text-center"
                id="endereco"
              />
            </div>
            <div className="col-5">
              <label htmlFor="qtdEstoque" className="form-label  fw-semibold">
                Quantidade em estoque
              </label>
              <input
                type="text"
                className="form-control rounded-pill text-center"
                id="qtdEstoque"
              />
            </div>
          </div>

          <div className="mb-2 text-center d-flex flex-column align-items-center">
            <label
              htmlFor="idInsumoEquipamento"
              className="form-label fw-semibold"
            >
              Quantidade em entrada
            </label>
            <input
              type="text"
              className="form-control rounded-pill w-25  "
              id="idInsumoEquipamento"
            />
          </div>

          <div className="mt-3 text-center d-flex flex-column align-items-center">
            <button className="btn btn-success rounded-pill">Cadastrar</button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
