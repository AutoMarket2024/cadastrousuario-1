import Home from "./Home";
import SignIn from "./Login/Login";
import SignUp from "./Login/SignUp";
//import "styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function RoutesComponent() {
  return (
    <Router>
      <div>
        <h1>Seja bem vindo ao Sistema de Registo funcionarios afectos a A3D</h1>
        <br />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

// Separate login form component
function LoginForm() {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px",
          }}
        >
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Digite o seu email"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label htmlFor="password">Palavra Passe</label>
            <input
              id="password"
              type="password"
              placeholder="Digite a sua palavra passe"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RoutesComponent;
