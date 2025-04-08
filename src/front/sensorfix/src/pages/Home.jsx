import React from 'react';
import { FaTools } from 'react-icons/fa';
import { MdPrecisionManufacturing } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
export default function Home() {
    return (
        <>
            <div className="container-fluid">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <Link className="nav-link text-white" to="/producao"><MdPrecisionManufacturing /> Produção</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link text-white" to="/estoque"><BsBoxSeam /> Estoque</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link text-white" to="/manutencao"><FaTools /> Manutenção</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}