import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../components/Header.css";

function MyRequestsPage({ user, onBack, onShowSobre, onShowAjuda }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyRequests() {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/my-requests", {
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
      <div>
        <h2>Meus Chamados</h2>
        <button onClick={onBack}>Voltar</button>
        {loading ? (
          <p>Carregando...</p>
        ) : requests.length === 0 ? (
          <p>Você ainda não enviou nenhum chamado.</p>
        ) : (
          requests.map(r => (
            <div key={r._id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
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