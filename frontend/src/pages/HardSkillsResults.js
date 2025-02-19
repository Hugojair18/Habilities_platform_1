// src/pages/HardSkillsResults.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsDown, FaMeh, FaSmile, FaGrinStars, FaAngry } from 'react-icons/fa'; // Importa los íconos necesarios
import "../styles/HardSkillsResults.css";

const HardSkillsResults = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const getClassAndIcon = (level) => {
      switch (level) {
        case "Nivel muy bajo":
          return { icon: <FaThumbsDown className="icon" /> };
        case "Nivel bajo":
          return { icon: <FaAngry className="icon" /> };
        case "Nivel medio":
          return { icon: <FaMeh className="icon" /> };
        case "Nivel alto":
          return { icon: <FaSmile className="icon" /> };
        case "Nivel muy alto":
          return { icon: <FaGrinStars className="icon" /> };
        default:
          return { className: "", icon: null };
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
        setResults(response.data.hardSkillsResults || {});
      } catch (error) {
        console.error("Error al obtener resultados de Hard Skills:", error);
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
    return <div>No se encontraron resultados de Inteligencias Multiples .</div>;
  }

  return (
    <div className="results-container">
      <div className="top-container">
        <h2 className="results-title">Resultados de Inteligencias Multiples</h2>
      </div>

      <div className="bottom-container">
      <div className="results-card">
      <ul className="results-list">
        {Object.entries(results)
          .filter(([skill]) => skill === "Inteligencia Comunicativa")
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
          .filter(([skill]) => skill === "Inteligencia Matemática")
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
          .filter(([skill]) => skill === "Inteligencia Visual")
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
          .filter(([skill]) => skill === "Inteligencia Motriz")
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
          .filter(([skill]) => skill === "Inteligencia Rítmica")
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
          .filter(([skill]) => skill === "Inteligencia de Autoconocimiento")
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
          .filter(([skill]) => skill === "Inteligencia Social")
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


export default HardSkillsResults;
