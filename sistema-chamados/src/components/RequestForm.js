import React, { useState, useEffect } from "react";
import "./RequestForm.css"; // Crie este arquivo

function RequestForm({ user }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [solicitacao, setSolicitacao] = useState("");

  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setCpf(user.cpf || "");
      setTelefone(user.telefone || "");
    }
  }, [user]);

  function formatCpf(cpf) {
    if (!cpf) return "";
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function formatTelefone(telefone) {
    if (!telefone) return "";
    return telefone
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        nome,
        cpf,
        telefone,
        solicitacao
      })
    });
    setSolicitacao("");
    alert("Solicitação enviada!");
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="request-row">
        <label>Nome</label>
        <input value={nome} readOnly />
      </div>
      <div className="request-row">
        <label>Cpf</label>
        <input value={formatCpf(cpf)} readOnly />
      </div>
      <div className="request-row">
        <label>Telefone</label>
        <input value={formatTelefone(telefone)} readOnly />
      </div>
      <div style={{ marginTop: "30px", marginBottom: "6px" }}>
        <label htmlFor="solicitacao"><b>Solicitação:</b></label>
      </div>
      <div className="request-row" style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <textarea
          id="solicitacao"
          value={solicitacao}
          onChange={e => setSolicitacao(e.target.value)}
          required
        />
      </div>
      <button className="request-btn" type="submit">Enviar</button>
    </form>
  );
}

export default RequestForm;