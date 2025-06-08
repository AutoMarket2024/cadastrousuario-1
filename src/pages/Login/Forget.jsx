import "../Home/style.css";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Forget() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1); // 1: email verification, 2: password reset
  
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputRepeatePassword = useRef();
  const navigate = useNavigate();

  // Comando para buscar os usuários
  async function getUsers() {
    try {
      const usersFromApi = await api.get("/usuario");
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Erro ao buscar usuários");
    }
  }

  // Verificar se o email existe
  const verifyEmail = async (e) => {
    e.preventDefault();
    setError("");
    
    const emailValue = inputEmail.current.value;
    
    if (!emailValue) {
      setError("Por favor, digite seu email");
      return;
    }

    try {
      // Verificar se o email existe na lista de usuários
      const user = users.find(u => u.email === emailValue);
      
      if (user) {
        setUserId(user.id);
        setEmail(emailValue);
        setStep(2);
        setSuccess("Email verificado! Agora defina sua nova senha.");
      } else {
        setError("Email não encontrado");
      }
    } catch (error) {
      setError("Erro ao verificar email");
    }
  };

  // Comando para atualizar a senha do usuário
  async function updateUserPassword(e) {
    e.preventDefault();
    setError("");
    
    const password = inputPassword.current.value;
    const repeatPassword = inputRepeatePassword.current.value;

    if (!password || !repeatPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (password !== repeatPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      await api.put(`/usuario/${userId}`, {
        password: password,
        repeatPassword: repeatPassword,
      });
      
      setSuccess("Senha alterada com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Erro ao atualizar senha");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      {step === 1 ? (
        <form onSubmit={verifyEmail}>
          <h1>Recuperar a senha</h1>
          <p>Digite seu email para verificação:</p>
          <input
            type="email"
            placeholder="Digite seu email"
            name="email"
            ref={inputEmail}
            required
          />
          <br />
          <button type="submit">
            Verificar Email
          </button>
          {error && <p className="error" style={{color: 'red'}}>{error}</p>}
        </form>
      ) : (
        <form onSubmit={updateUserPassword}>
          <h1>Definir Nova Senha</h1>
          <p>Email: {email}</p>
          <input
            type="password"
            placeholder="Digite a nova senha"
            name="password"
            ref={inputPassword}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Repita a nova senha"
            name="repeatPassword"
            ref={inputRepeatePassword}
            required
          />
          <br />
          <button type="submit">
            Alterar Senha
          </button>
          <button 
            type="button" 
            onClick={() => setStep(1)}
            style={{marginLeft: '10px'}}
          >
            Voltar
          </button>
          {error && <p className="error" style={{color: 'red'}}>{error}</p>}
        </form>
      )}
      
      {success && <p className="success" style={{color: 'green'}}>{success}</p>}
      
      <p>
        Lembrou da senha? <a href="/login">Fazer Login</a>
      </p>
    </div>
  );
}

export default Forget;