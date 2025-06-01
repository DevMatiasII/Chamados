import React, { useEffect, useState } from "react";

function AdminDashboard({ user, onLogout }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/requests", {
        headers: { Authorization: token }
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    }
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Bem-vindo, {user.nome} (Admin)</h2>
      <button onClick={onLogout}>Sair</button>
      <h3>Todos os Chamados</h3>
      {requests.map(request => (
        <div key={request._id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
          <p><b>Nome:</b> {request.nome}</p>
          <p><b>CPF:</b> {request.cpf}</p>
          <p><b>Telefone:</b> {request.telefone}</p>
          <p><b>Solicitação:</b> {request.solicitacao}</p>
          <p><b>Resposta:</b> {request.resposta ? request.resposta : "Sem resposta"}</p>
          <p><b>Status:</b> {request.status}</p> {/* <-- Aqui você exibe o status */}
          {/* Aqui pode colocar o select para alterar o status */}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;