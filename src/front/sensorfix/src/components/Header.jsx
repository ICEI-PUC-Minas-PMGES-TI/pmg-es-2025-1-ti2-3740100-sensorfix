import { Link } from 'react-router-dom';
import { FaHome, FaTools } from 'react-icons/fa';
import { MdPrecisionManufacturing } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark color-blue" style={{ height: '100px' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="img-fluid" src="/sensorfix.png" alt="" width={256} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/"><FaHome /> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/producao"><MdPrecisionManufacturing /> Produção</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/estoque"><BsBoxSeam /> Estoque</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/manutencao"><FaTools /> Manutenção</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/profile"><FaUser /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/logout"><IoLogOutOutline /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
