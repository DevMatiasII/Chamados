import React from "react";
import RequestList from "../components/RequestList";

function AdminDashboard({ user, onLogout }) {
  return (
    <div>
      <h2>Bem-vindo, {user.nome} (Admin)</h2>
      <button onClick={onLogout}>Sair</button>
      <RequestList />
    </div>
  );
}

export default AdminDashboard;