import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
export default function Estoque() {
  return (
    <PageLayout>
      <div className="container text-center" style={{ maxWidth: "50%" }}>
        <h1 className="display-4 mb-4">Depósito</h1>
        <div className="card card-body bg-light bg-gradient shadow-sm p-5">
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3 p-2">
              <Link to="/estoque/entradaInsumos">
                <button type="button" className="btn btn-estoque rounded-pill">
                  Entrada de Insumos
                </button>
              </Link>
            </div>
            <div className="mb-3 p-2">
              <Link to="/estoque/fastInOut">
                <button type="button" className="btn btn-estoque rounded-pill">
                  Fast In/Out
                </button>
              </Link>
            </div>
            <div className="mb-3 p-2">
              <Link to="/estoque/cadastro">
                <button type="button" className="btn btn-estoque rounded-pill">
                  Cadastro Insumo
                </button>
              </Link>
            </div>

            <div className="mb-3 p-2">
              <Link to="/estoque/pesquisa">
                <button type="button" className="btn btn-estoque rounded-pill">
                  Pesquisa
                </button>
              </Link>
            </div>
            <div className="mb-3 p-2">
              <Link to="/estoque/compras">
                <button type="button" className="btn btn-estoque rounded-pill">
                  Compras
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
