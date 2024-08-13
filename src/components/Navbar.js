import "../styles/Navbar.css";
import Logo from "../assets/logo.png";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg nav-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </a>
        <button
          className="navbar-toggler bt-open"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" id="navbarNavAltMarkup">
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close bt"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="navbar-nav">
            <Link to="/company">
              <h5>Empresas</h5>
            </Link>

            <Link to="/users">
              <h5>Usúarios</h5>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
