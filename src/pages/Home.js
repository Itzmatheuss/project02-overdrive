import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="main-content">
        <h1>Bem vindo ao Register</h1>
        <h2>Cadastre sua empresa ou colaborador aqui.</h2>

        <div className="botao">
          <Link to="/signupcomp">
            <button>Cadastrar Empresa </button>
          </Link>
          <Link to="/signupuser">
            <button>Cadastrar Colaborador </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
