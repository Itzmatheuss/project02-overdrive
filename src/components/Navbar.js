import "../styles/Navbar.css";
import Logo from "../assets/logo.png";
import ReorderIcon from "@mui/icons-material/Reorder";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg nav-custom">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" id="navbarNavAltMarkup">
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close"
              style={{ color: "#fff;" }}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div class="navbar-nav">
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
