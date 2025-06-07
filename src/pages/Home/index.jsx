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
  const [cars, setCars] = useState([]);
  const inputMatricula = useRef();
  const inputMarca = useRef();
  const inputModelo = useRef();
  const inputCor = useRef();
  const inputCilindrada = useRef();
 
  //comando para buscar os carros
  async function getCars() {
    const carsFromApi = await api.get("/carro");
    setCars(carsFromApi.data);
    //console.log(cars);
  }
  //comando para cadastrar carro
  async function createCars() {
    await api.post("/carro", {
      matricula: inputMatricula.current.value,
      marca: inputMarca.current.value,
      modelo: inputModelo.current.value,
      cor: inputCor.current.value,
      cilindrada: parseInt(inputCilindrada.current.value, 10),
    });

    getCars();
  }

  //comando para deletar um carro
  async function deleteCar(id) {
    await api.delete(`/carro/${id}`);
    getCars();
  }

  useEffect(() => {
    getCars();
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
        <h1>Cadastro de Carros</h1>
        <input
          type="text"
          placeholder="Digite a matricula do carro"
          name="matricula"
          ref={inputMatricula}
        />
        <br />
        <input
          type="text"
          placeholder="Digite a marca do carro"
          name="marca"
          ref={inputMarca}
        />
        <br />
        <input
          type="text"
          placeholder="Digite o modelo do seu carro"
          name="modelo"
          ref={inputModelo}
        />
        <br />
        <input
          type="text"
          placeholder="Digite a cor do seu carro"
          name="cor"
          ref={inputCor}
        />
        <br/>
        <input
          type="number"
          placeholder="Digite a cilindrada do seu carro"
          name="cilindrada"
          ref={inputCilindrada}
        />
        <button type="button" onClick={createCars}>
          Cadastrar
        </button>
      </form>
      <br />

      {cars.map((cars) => (
        <div key={cars.id} className="card">
          <div>
            <p>
              Matricula: <span>{cars.matricula}</span>
            </p>
            <p>
              Marca: <span>{cars.marca}</span>
            </p>
            <p>
              Modelo: <span>{cars.modelo}</span>
            </p>
            <p>
              Cor: <span>{cars.cor}</span>
            </p>
            <p>
              Cilindrada: <span>{cars.cilindrada}</span>
            </p>
          </div>
          <button>
            <img
              src={Trash}
              onClick={() => deleteUser(cars.id)}
              alt="Lixeira"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
