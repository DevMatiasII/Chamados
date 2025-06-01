import React from "react";

function Header({ onShowSobre, onShowAjuda }) {
  return (
    <header className="main-header">
      <span className="logo">CHAMAKI</span>
      <nav>
        <button className="header-link" onClick={onShowSobre}>SOBRE NOS</button>
        <button className="header-link" onClick={onShowAjuda}>AJUDA</button>
      </nav>
    </header>
  );
}

export default Header;