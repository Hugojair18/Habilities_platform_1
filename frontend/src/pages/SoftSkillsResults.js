// src/pages/SoftSkillsResults.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsDown, FaMeh, FaSmile, FaGrinStars, FaAngry } from 'react-icons/fa'; // Importa los íconos necesarios
import "../styles/SoftSkillsResults.css";

const SoftSkillsResults = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const getClassAndIcon = (level) => {
    switch (level) {
      case "Nivel muy bajo":
        return { icon: <FaThumbsDown className="icon" />};
      case "Nivel bajo":
        return { icon: <FaAngry className="icon" />};
      case "Nivel medio":
        return { icon: <FaMeh className="icon" /> };
      case "Nivel alto":
        return { icon: <FaSmile className="icon" />};
      case "Nivel muy alto":
        return { icon: <FaGrinStars className="icon" />};
      default:
        return { className: "", icon: null , cardClassName: ""};  
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:20352/api/users/me", {
          headers: { Authorization: token },
        });
        // "softSkillsResults" lo guardaste en el backend como user.softSkillsResults
        setResults(response.data.softSkillsResults || {});
      } catch (error) {
        console.error("Error al obtener resultados de Soft Skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <div>Cargando resultados...</div>;
  }

  // Si no hay nada en results, mostrar un mensaje
  if (!results || Object.keys(results).length === 0) {
    return <div>No se encontraron resultados de Habilidades Blandas.</div>;
  }

  return (
    <div className="results-container">
      <div className="top-container">
        <h2 className="results-title">Resultados de Habilidades Blandas</h2>
      </div>

      <div className="bottom-container">
      <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Pensamiento Analítico")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Respuesta ante los problemas")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Iniciativa")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Autodominio")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Afrontamiento al estrés")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Socialización")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Contribución")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Habilidad verbal")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Principios morales")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>

    <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Compromiso")
          .map(([skill, data]) => {
            const { className, icon } = getClassAndIcon(data.level);
            return (
              <li key={skill} className={`results-skill ${className}`}>
                <span className="results-skill-name">{skill}</span>:{" "}
                <span className="results-skill-score">
                  {data.level}
                  {icon}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  </div>

      {/* Ejemplo de botón para volver al dashboard */}
      <a href="/dashboard" className="btn btn-primary">Regresar</a>
    </div>
  );
};

export default SoftSkillsResults;
