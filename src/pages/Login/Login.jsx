import React from "react";
import Home from "../Home";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useState } from "react";





function Login() {
  const [userName, setUserName] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();
      // Aqui você pode adicionar a lógica de autenticação
      console.log("Usuário:", userName);
      console.log("Senha:", password);
      //alert("Enviando os dados para o servidor..."+userName+" "+password);
      // Simulando um redirecionamento para a página Home após o login
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-group">
          <FaUser className="icon" />
          <input type="email" name="email" placeholder="Digite o seu email" onChange={(event)=>(setUserName(event.target.value))} required />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input type="password" name="password" placeholder="Digite o palavra passe" onChange={(event)=>setPassword(event.target.value)} required/>
        </div>
          <button type="submit" onClick={<Home />}>
             Login
           </button>
          <div>
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember">Lembrar-me</label>
          <a href="/forgot-password">Esqueci a palavra passe</a>
          </div>
      </form>
      <p>
        Não tem uma conta? <a href="/signup">Registre-se</a>
      </p>
    </div>
  );
}

export default Login;
