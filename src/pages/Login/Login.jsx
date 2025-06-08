import React from "react";
import Home from "../Home";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [erro, setErro] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Clear previous errors
    setErro("");

    //console.log("Usuário:", userName);
    //console.log("Senha:", password);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        userName,
        password,
      });

      if (response.data.success) {
        // Armazenar token ou dados do usuário (ex: localStorage)
        localStorage.setItem("token", response.data.token);
        navigate("/home"); // Redirecionar para a tela Home
      } else {
        setErro("Credenciais inválidas");
      }
    } catch (error) {
      setErro("Erro ao fazer login");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Digite o seu email"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Digite a palavra passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">
          <Link to={"/home"}>Login</Link>
        </button>
        {erro && <p className="error">{erro}</p>}
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
