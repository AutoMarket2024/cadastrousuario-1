import React from "react";
import Home from "../Home";
import "./Login.css";
//import { FaUser, FaLock } from "react-icons/fa";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Login() {
  return (
    <div className="container">
      <form>
        <h1>Login</h1>

        <input type="email" name="email" placeholder="Digite o seu email" />

        <input
          type="password"
          name="password"
          placeholder="Digite o palavra passe"
        />

        <button type="button" onClick={<Home />}>
          <Link to={"/home"}>Login</Link>
        </button>
      </form>
      <p>
        Não tem uma conta? <a href="/signup">Registre-se</a>
      </p>
    </div>
  );
}

export default Login;
