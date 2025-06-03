import React, { useState } from "react";
import MyRequestsPage from "./MyRequestsPage";
import RequestForm from "../components/RequestForm";
import "./UserDashboard.css";

function UserDashboard({ user, onLogout }) {
  const [showMyRequests, setShowMyRequests] = useState(false);

  if (showMyRequests) {
    return <MyRequestsPage user={user} onBack={() => setShowMyRequests(false)} />;
  }

  return (
    <div className="dashboard-bg">
      <div className="dashboard-header">
        <button className="dashboard-btn" onClick={() => setShowMyRequests(true)}>Meus Chamados</button>
        <button className="dashboard-btn" onClick={onLogout}>Sair</button>
      </div>
      <div className="dashboard-center">
        <RequestForm user={user} />
      </div>
    </div>
  );
}

export default UserDashboard;