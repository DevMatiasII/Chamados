import React, { useState } from "react";
import "./LoginPage.css"; // Certifique-se de que o caminho está correto
import Header from "../components/Header";
import "../components/Header.css"; // Não esqueça do CSS!

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });
      if (!response.ok) {
        alert("Login inválido!");
        return;
      }
      const data = await response.json();
      console.log("Dados recebidos do backend:", data); // <-- Adicione esta linha
      localStorage.setItem("token", data.token);
      props.setUser({
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        telefone: data.telefone,
        role: data.role,
        token: data.token
      });
    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <>
      <Header onShowSobre={props.onShowSobre} onShowAjuda={props.onShowAjuda} />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">Login</button>
          <hr style={{ margin: "30px 0" }} />
          <button
            className="login-button"
            type="button"
            onClick={() => props.setShowRegister(true)}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;