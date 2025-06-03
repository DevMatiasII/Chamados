import React from "react";
import RequestList from "../components/RequestList";
import "./AdminDashboard.css";

function AdminDashboard({ user, onLogout }) {
  return (
    <div className="admin-container">
      <h2 className="admin-title">Bem-vindo, {user.nome} (Admin)</h2>
      <div className="admin-table-box">
        <button className="admin-logout-btn" onClick={onLogout}>Sair</button>
        <RequestList />
      </div>
    </div>
  );
}

export default AdminDashboard;