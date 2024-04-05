import "../styles/Navbar.css";
import Logo from "../assets/logo.png";
import ReorderIcon from "@mui/icons-material/Reorder";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setOpenLinks(false); // Fecha o menu quando a largura da tela for maior ou igual a 600px
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="hiddenLinks">
          <Link to="/">
            <HomeIcon />
          </Link>
          <Link to="/company">
            <BusinessIcon />
          </Link>
          <Link to="/users">
            <PeopleAltIcon />
          </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">
          <HomeIcon />
        </Link>
        <Link to="/company">
          <BusinessIcon />
        </Link>
        <Link to="/users">
          <PeopleAltIcon />
        </Link>
        <button onClick={openNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
