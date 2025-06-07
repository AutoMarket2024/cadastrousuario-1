import Home from "./Home";
import SignIn from "./Login/Login";
import SignUp from "./Login/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Protected Route component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token'); // or your auth logic
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function RoutesComponent() {
  return (
    <Router>
      <div>
        <h1>Seja bem vindo ao Sistema de Gestao de Carros da A3D</h1>
        <br />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/home" 
            element={
              
                <Home />
              
            } 
          />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default RoutesComponent;