import React from "react";
import { GoPlus } from "react-icons/go";


export default function Producao() {
    return (
        <>
            <div className="container text-center mt-4">
                <h1 className="display-5 text-start">Produção</h1>
                <div className="row g-4">
                    {/* Coluna da esquerda */}
                    <div className="col-lg-4 col-md-6">
                        <div className="p-3 card h-100">
                            <div className="container-fluid">
                                <div className="row align-items-center">
                                    <div className="col-6 text-start">
                                        <p className="fs-5 mb-0">Demandas</p>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end">
                                        <button type="button" className="btn btn-secondary btn-sm">
                                            Filtrar
                                        </button>
                                        <button type="button" className="btn btn-outline-primary btn-sm ms-2">
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
                    <div className="col-lg-8 col-md-6">
                        <div className="p-3 card h-100">
                            <div className="card-body">
                                {/* Conteúdo da coluna direita */}
                                <p className="text-muted">Conteúdo da coluna direita</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
