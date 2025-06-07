import "./style.css";
import Trash from "../../assets/trash.gif";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
function Home() {
  //let users = [];
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
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
      age: parseInt(inputAge.current.value, 10),
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
          type="number"
          placeholder="Digite a sua idade"
          name="age"
          min={1}
          max={120}
          ref={inputAge}
        />
        <br />
        <input
          type="email"
          placeholder="Digite o seu e-mail"
          name="email"
          ref={inputEmail}
        />
        <br />
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
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
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

export default Home;
