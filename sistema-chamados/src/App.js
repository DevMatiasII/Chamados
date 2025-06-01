import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard"; 

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  if (!user) {
    return showRegister
      ? <RegisterPage setShowRegister={setShowRegister} />
      : <LoginPage setUser={setUser} setShowRegister={setShowRegister} />;
  }

 
  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return <UserDashboard user={user} onLogout={handleLogout} />;
}

export default App;
