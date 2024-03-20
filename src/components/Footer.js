import "../styles/Footer.css";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import LinkedIn from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="socialMedia">
        <Instagram />
        <Twitter />
        <Facebook />
        <LinkedIn />
      </div>
      <p>&copy; 2024</p>
    </footer>
  );
};

export default Footer;
