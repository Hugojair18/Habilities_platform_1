import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#00C49F", "#FFBB28"];

const renderChart = (progress) => (
  <PieChart width={100} height={100}>
    <Pie
      data={[
        { name: "Completado", value: progress },
        { name: "Pendiente", value: 100 - progress },
      ]}
      cx="50%"
      cy="50%"
      innerRadius={30}
      outerRadius={40}
      fill="#8884d8"
      dataKey="value"
    >
      <Cell fill={COLORS[0]} />
      <Cell fill={COLORS[1]} />
    </Pie>
  </PieChart>
);

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Estado para la imagen de perfil
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Obtener datos del usuario
        const userResponse = await axios.get("http://localhost:20352/api/users/me", {
          headers: { Authorization: token },
        });
        setUser(userResponse.data);

        // Obtener estado del usuario
        const statusResponse = await axios.get("http://localhost:20352/api/users/status", {
          headers: { Authorization: token },
        });
        setStatus(statusResponse.data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Selecciona un archivo PDF.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:20352/api/users/upload-cv", formData, {
        headers: { "Authorization": token, "Content-Type": "multipart/form-data" },
      });
      setMessage("CV subido con éxito.");
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      setMessage("Error al subir el archivo.");
    }
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const calculateProfileCompletion = () => {
    if (!status) return 0;
    let completion = 0;
    // if (status.profileImage) completion += 20;
    if (status.cvUploaded) completion += 25;
    if (status.cvAnalyzed) completion += 25;
    if (status.softSkillsSurvey) completion += 25;
    if (status.hardSkillsSurvey) completion += 25;
    return completion;
  };
  
  const profileCompletion = calculateProfileCompletion();
  


  return (

// Contenedor Superior
    <div className="dashboard-container">

{/* Contenedor Inicial para el Título */}
      <div className="top-container">
      {user && status ? (
        <h2 className="dashboard-title">¡Que gusto verte, {user.name}!</h2>
      ) : (
        <p className="text-muted">Cargando datos...</p>
      )}
      </div>

{/* Indicador de Perfil Completado */}
<div className="dashboard-card perfil-completado">
        <p><strong>Perfil Completado:</strong></p>
        <div className="perfil-chart-container">
       {renderChart(profileCompletion)}
        </div>
        <p>{profileCompletion}%</p>
    </div>


{/* Contenedor Central */}
      <div className="middle-container">
        {/* Tarjeta de imagen de perfil */}
        <div className="profile-image-card">
        {profileImage ? (
          <img src={profileImage} alt="Imagen de Perfil" className="profile-image" />
        ) : (
          <p>No se ha adjuntado ninguna imagen.</p>
        )}
        <input type="file" accept="image/*" onChange={handleProfileImageChange} />
        </div>

        {/* Tarjeta de datos personales */}
        <div className="dashboard-card">
          {user && status ? (
            <div className="dashboard-info-person">
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Nacionalidad:</strong> {user.nationality}</p>  
              <p><strong>Email:</strong> {user.email}</p> 
              <p><strong>Institución:</strong> {user.institution}</p>     
              <p><strong>Título:</strong> {user.title}</p>     
              <p><strong>Area de Investigación:</strong> {user.research_area}</p>            
            </div>
         ) : (
           <p className="text-muted">Cargando datos...</p>
        )}
        </div>
      </div>

{/* Contenedor Inferior */}
    <div className="bottom-container">

      {/* Segundo Bloque */}
      <div className="dashboard-card-cv">
        {user && status ? (
          <div className="dashboard-info">
            {/* Estado del CV con Modal de Carga */}
            <p><strong>CV:</strong> {status.cvUploaded ? "✅ Subido" : "❌ No subido"}</p>
            <div className="chart-container">
              {renderChart(status.cvUploaded ? 100 : 0)}
            </div>
            {!status.cvUploaded && (
              <button className="btn btn-warning w-100" onClick={() => setShowModal(true)}>
                Subir CV
              </button>
            )}

            {/* Estado de la Entrevista Personalizada */}
            <p><strong>Entrevista Personalizada:</strong> {status.cvAnalyzed ? "✅ Realizado" : "❌ No realizado"}</p>
            {status.cvAnalyzed ? (
              <a href="/interview-results" className="btn btn-secondary w-100">
                Ver Resultados de la Entrevista
              </a>
            ) : (
              <a href="/analyze-cv" className="btn btn-info w-100">
                Analizar CV y generar Entrevista
              </a>
            )}
          </div>
        ) : (
          <p className="text-muted">Cargando datos...</p>
        )}
      </div>

      {/* Tercer Bloque */}
      <div className="dashboard-card">
        {user && status ? (
          <div className="dashboard-info">
            {/* Estado de la Encuesta de Habilidades Blandas */}
            <p>
              <strong>Encuesta de Habilidades Blandas:</strong>{" "}<br></br>
              <div className="chart-container">
                {renderChart(status.softSkillsSurvey ? 100 : 0)}
              </div>
              {status.softSkillsSurvey ? "✅ Completada" : "❌ No completada"}
            </p>
            {status.softSkillsSurvey ? (
              <a href="/soft-skills-results" className="btn btn-secondary w-100">
                Ver Resultados
              </a>
            ) : (
              <a href="/soft-skills" className="btn btn-success w-100">
                Completar Encuesta
              </a>
            )}
          </div>
        ) : (
          <p className="text-muted">Cargando datos...</p>
        )}
      </div>

      {/* Cuarto Bloque */}
      <div className="dashboard-card">
        {user && status ? (
          <div className="dashboard-info">
            {/* Estado de la Encuesta de Habilidades Duras */}
            <p>
              <strong>Encuesta de Inteligencias Multiples:</strong>{" "}
              <div className="chart-container">
                {renderChart(status.hardSkillsSurvey ? 100 : 0)}
              </div>
              {status.hardSkillsSurvey ? "✅ Completada" : "❌ No completada"}
            </p>
            {status.hardSkillsSurvey ? (
              <a href="/hard-skills-results" className="btn btn-secondary w-100">
                Ver Resultados
              </a>
            ) : (
              <a href="/hard-skills" className="btn btn-success w-100">
                Completar Encuesta
              </a>
            )}
          </div>
        ) : (
          <p className="text-muted">Cargando datos...</p>
        )}
      </div>

    </div>
      
      {/* Boton de cerrar sesión */}
      <div className="dashboard-buttons">
        <button onClick={handleLogout} className="btn btn-danger w-100">
          Cerrar Sesión
        </button>
      </div>

      {/* Modal de Subida de CV */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Subir CV</h4>
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
            <button className="btn btn-primary w-100 mt-3" onClick={handleUpload}>
              Subir
            </button>
            <button className="btn btn-secondary w-100 mt-2" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
            {message && <p className="text-danger mt-2">{message}</p>}
          </div>
        </div>
      )}
    </div>    
  );
};




export default Dashboard;