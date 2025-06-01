import React, { useEffect, useState } from "react";

function RequestList() {
  const [requests, setRequests] = useState([]);
  const [resposta, setResposta] = useState("");
  const [respondendoId, setRespondendoId] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      const token = localStorage.getItem("token");
      const response = await fetch("https://chamados-eyag.onrender.com/api/requests", {
        headers: {
          Authorization: token
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    }
    fetchRequests();
  }, []);

  async function handleEnviarResposta(id) {
    const token = localStorage.getItem("token");
    await fetch(`https://chamados-eyag.onrender.com/api/requests/${id}/responder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ resposta })
    });
    setRequests(requests.map(r => r._id === id ? { ...r, resposta } : r));
    setRespondendoId(null);
    setResposta("");
  }

  return (
    <div>
      <h3>Solicitações Recebidas</h3>
      {requests.length === 0 && <p>Nenhuma solicitação encontrada.</p>}
      {requests.map(r => (
        <div key={r._id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
          <p><b>Nome:</b> {r.nome}</p>
          <p><b>CPF:</b> {r.cpf}</p>
          <p><b>Telefone:</b> {r.telefone}</p>
          <p><b>Solicitação:</b> {r.solicitacao}</p>
          <p><b>Resposta:</b> {r.resposta || "Sem resposta"}</p>
          <button onClick={() => {
            setRespondendoId(r._id);
            setResposta("");
          }}>
            Responder
          </button>
          {respondendoId === r._id && (
            <div style={{ marginTop: 10 }}>
              <textarea
                value={resposta}
                onChange={e => setResposta(e.target.value)}
                placeholder="Digite a resposta..."
                rows={3}
                style={{ width: "100%", borderRadius: 8, padding: 8 }}
              />
              <button
                onClick={() => handleEnviarResposta(r._id)}
                style={{ marginTop: 8 }}
              >
                Enviar Resposta
              </button>
            </div>
          )}
          <select
            value={r.status}
            onChange={async e => {
              const status = e.target.value;
              const token = localStorage.getItem("token");
              await fetch(`https://chamados-eyag.onrender.com/api/requests/${r._id}/status`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token
                },
                body: JSON.stringify({ status })
              });
              setRequests(requests.map(req => req._id === r._id ? { ...req, status } : req));
            }}
          >
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default RequestList;
