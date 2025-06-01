import React, { useState } from "react";
import RequestList from "../components/RequestList";

function AdminPage({ user, setUser }) {
  return (
    <div>
      <h2>Admin: {user.name}</h2>
      <button onClick={() => setUser(null)}>Sair</button>
      <RequestList />
    </div>
  );
}

export default AdminPage;