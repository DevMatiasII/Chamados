import React, { useState } from "react";
import "./RegisterPage.css";
import Header from "../components/Header";
import "../components/Header.css";

function RegisterPage(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [role, setRole] = useState("user");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://chamados-eyag.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha: password, cpf, telefone, role }),
      });
      if (!response.ok) {
        alert("Erro ao cadastrar!");
        return;
      }
      alert("Cadastro realizado! Faça login.");
      props.setShowRegister(false);
    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <>
      <Header onShowSobre={props.onShowSobre} onShowAjuda={props.onShowAjuda} />
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Cadastro</h2>
          <input className="register-input nome" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
          <input className="register-input email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="register-input senha" placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <input className="register-input cpf" placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required />
          <input className="register-input telefone" placeholder="Telefone + DDD" value={telefone} onChange={e => setTelefone(e.target.value)} required />
          <div className="register-radio-group">
            <label className="register-radio-label">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              Usuário
            </label>
            <label className="register-radio-label" style={{ marginLeft: 10 }}>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              Admin
            </label>
          </div>
          <button className="register-btn" type="submit">Cadastrar</button>
          <p>
            Já tem conta?{" "}
            <a href="#" onClick={e => { e.preventDefault(); props.setShowRegister(false); }}>
              Voltar para login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;