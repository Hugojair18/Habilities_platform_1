import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import { FaHome, FaChartBar, FaAtom, FaTools } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="d-flex">
      {/* Sidebar fija */}
      <div className="sidebar bg-dark text-white p-3">
        <h3>Menú</h3>
        <ul className="list-unstyled">
          <li>
            <Link to="/dashboard" className="text-white text-decoration-none d-flex align-items-center mt-4 mb-4">
              <FaHome className="me-2" /> General
            </Link>
          </li>
          <li>
            <Link to="/soft-skills-results" className="text-white text-decoration-none d-flex align-items-center mb-4">
              <FaChartBar className="me-2" /> Resultados de Habilidades Blandas
            </Link>
          </li>
          <li>
            <Link to="/hard-skills-results" className="text-white text-decoration-none d-flex align-items-center mb-4">
              <FaAtom className="me-2" /> Resultados de Inteligencias Multiples
            </Link>
          </li>
          <li>
            <Link to="" className="text-white text-decoration-none d-flex align-items-center mb-4">
              <FaTools className="me-2" /> Configuración
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenedor principal */}
      <div className="dashboard-container flex-grow-1 p-4">
        <Outlet /> {/* Renderiza las páginas hijas */}
      </div>
    </div>
  );
};

export default Sidebar;
