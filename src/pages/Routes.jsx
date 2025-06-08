import Home from "./Home";
import SignIn from "./Login/Login";
import SignUp from "./Login/SignUp";
import ForgetPassword from "./Login/Forget";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

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
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default RoutesComponent;