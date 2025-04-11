import React from "react";
import { Link } from "react-router-dom";
import { FaTools } from "react-icons/fa";
import { MdPrecisionManufacturing } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
export default function Home() {
  return (
    <>
      <div className="container text-center py-5">
        <h1 className="display-2 mb-5 text-blue">Bem vindo a Sensor Fix</h1>
        <div className="d-flex flex-column align-items-center">
          <ul class="nav p-5">
            <div className="m-2 btn btn-light">
                <Link className="nav-link" to="/producao">
                  <MdPrecisionManufacturing size={30} color="color-blue" /> Produção{" "}
                  <span className="badge text-bg-primary">New</span>
                </Link>
            </div>
            <div className="m-2 btn btn-light">
              <li class="nav-item">
                <Link className="nav-link" to="/estoque">
                  <BsBoxSeam size={30} color="color-blue" /> Estoque{" "}
                  <span className="badge text-bg-primary">New</span>
                </Link>
              </li>
            </div>
            <div className="m-2 btn btn-light">
              <li class="nav-item">
                <Link className="nav-link" to="/manutencao">
                  <FaTools size={30} color="color-blue" /> Manutenção{" "}
                  <span className="badge text-bg-danger">Não implementado</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
