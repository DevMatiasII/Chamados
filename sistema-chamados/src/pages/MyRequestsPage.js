import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../components/Header.css";
import "./MyRequestsPage.css"; // adicione este import

function MyRequestsPage({ user, onBack, onShowSobre, onShowAjuda }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyRequests() {
      const token = localStorage.getItem("token");
      const response = await fetch("https://chamados-eyag.onrender.com/api/my-requests", {
        headers: { Authorization: token }
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
      setLoading(false);
    }
    fetchMyRequests();
  }, []);

  return (
    <>
      <Header onShowSobre={onShowSobre} onShowAjuda={onShowAjuda} />
      <div className="my-requests-container">
        <h2 className="my-requests-title">Meus Chamados</h2>
        <button className="my-requests-back-btn" onClick={onBack}>Voltar</button>
        {loading ? (
          <p>Carregando...</p>
        ) : requests.length === 0 ? (
          <p>Você ainda não enviou nenhum chamado.</p>
        ) : (
          requests.map(r => (
            <div key={r._id} className="my-request-card">
              <p><b>Solicitação:</b> {r.solicitacao}</p>
              <p><b>Resposta:</b> {r.resposta ? r.resposta : "Ainda não respondido"}</p>
              <p><b>Status:</b> {r.status}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyRequestsPage;