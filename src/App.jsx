import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3000";

const MOCK_COLLABORATORS = [
  { id: 1, name: "Colaborador 1" },
  { id: 2, name: "Colaborador 2" },
];

const MOCK_JOURNEYS = [
  { id: 1, name: "Email - alteração de dados" },
  { id: 2, name: "Email - Lembrete semanal" },
];

export default function App() {
  const [selectedCollaborator, setSelectedCollaborator] = useState("");
  const [selectedJourney, setSelectedJourney] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async (endpoint, setState, mockData) => {
      try {
        const response = await fetch(`${API_URL}/${endpoint}`);
        if (!response.ok)
          throw new Error(`Erro ao buscar ${endpoint}: ${response.status}`);
        const data = await response.json();
        setState(data.length > 0 ? data : mockData);
      } catch (err) {
        console.warn(`Usando mock para ${endpoint}:`, err.message);
        setState(mockData);
      }
    };

    fetchData("colaboradores", setCollaborators, MOCK_COLLABORATORS);
    fetchData("journeys", setJourneys, MOCK_JOURNEYS);
    setLoading(false);
  }, []);

  
  const handleSubmit = async () => {
    if (!selectedCollaborator || !selectedJourney || !startDateTime) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const requestData = {
      colaborador: Number(selectedCollaborator),
      jornada: Number(selectedJourney),
      data: startDateTime,
    };

    try {
      const response = await fetch(`${API_URL}/agendar-jornada`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar dados: ${response.status}`);
      }

      const result = await response.json();
      console.log("Sucesso:", result);
      setSuccessMessage("Agendamento realizado com sucesso!");

      // Limpar os campos após o envio
      setSelectedCollaborator("");
      setSelectedJourney("");
      setStartDateTime("");
    } catch (err) {
      console.error("Erro ao enviar requisição:", err.message);
      setError("Erro ao enviar os dados. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <div className="welcome-box">
        <h1>Agendamento de Jornada</h1>
        <p>1º Selecione um Colaborador</p>
        <p>2º Selecione a Jornada</p>
        <p>3º Selecione a data para o agendamento da jornada</p>
      </div>

      <div className="login-box">
        <h2 className="login-title">Agendamento de Jornadas</h2>

        <div className="input-group">
          <label>Colaborador</label>
          <select
            value={selectedCollaborator}
            onChange={(e) => setSelectedCollaborator(e.target.value)}
          >
            <option value="">Selecione um colaborador</option>
            {collaborators.map((collab) => (
              <option key={collab.id} value={collab.id}>
                {collab.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Jornada</label>
          <select
            value={selectedJourney}
            onChange={(e) => setSelectedJourney(e.target.value)}
          >
            <option value="">Selecione uma jornada</option>
            {journeys.map((journey) => (
              <option key={journey.id} value={journey.id}>
                {journey.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Data e Hora de Início</label>
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Agendar
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
