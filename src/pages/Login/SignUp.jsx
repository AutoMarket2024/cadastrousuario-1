import "../Home/style.css";
import Trash from "../../assets/trash.gif";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
function SignUp() {
  //let users = [];
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputRepeatePassword = useRef();
  const inputAddress = useRef();
  //comando para buscar os usuários
  async function getUsers() {
    const usersFromApi = await api.get("/usuario");
    setUsers(usersFromApi.data);
    //console.log(users);
  }
  //comando para criar um usuário
  async function createUsers() {
    await api.post("/usuario", {
      email: inputEmail.current.value,
      name: inputName.current.value,
      address: inputAddress.current.value,
      password: inputPassword.current.value,
      repeatPassword: inputRepeatePassword.current.value,
    });

    getUsers();
  }

  //comando para deletar um usuário
  async function deleteUser(id) {
    await api.delete(`/usuario/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  /*const users = [
    {
      id: "123abc",
      nome: "João Silva",
      idade: 30,
      email: "joaoxavier@gmail.com",
    },
    {
      id: "456def",
      nome: "Maria Oliveira",
      idade: 25,
      email: "mariaoliveira@outlook.com",
    },
    {
      id: "789ghi",
      nome: "Carlos Pereira",
      idade: 28,
      email: "carlospereira@icloud.com",
    },
  ];*/

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuário</h1>
        <input
          type="text"
          placeholder="Digite o seu nome"
          name="name"
          ref={inputName}
        />
        <br />
        <input
          type="text"
          placeholder="Digite a sua morada"
          name="address"
          ref={inputAddress}
        />
        <br />
        <input
          type="email"
          placeholder="Digite o seu e-mail"
          name="email"
          ref={inputEmail}
        />
        <br />
        <input
          type="password"
          placeholder="Digite a palavra passe"
          name="password"
          ref={inputPassword}
        />
        <br />
        <input
          type="password"
          placeholder="Repete a palavra passe"
          name="password"
          ref={inputRepeatePassword}
        />
        <br/>
        
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>
      <br />

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Morada: <span>{user.address}</span>
            </p>
            <p>
              Criar palavra passe: <span>{user.address}</span>
            </p>
            <p>
              Repetir a palavra passe: <span>{user.address}</span>
            </p>
          </div>
          <button>
            <img
              src={Trash}
              onClick={() => deleteUser(user.id)}
              alt="Lixeira"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignUp;
