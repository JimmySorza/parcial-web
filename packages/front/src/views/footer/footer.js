import { Link, useNavigate } from "react-router-dom";
import yellowLogo from "../../assets/yellow-logo.svg";
import fbLogo from "../../assets/facebook-brands 1.svg";
import userIcon from "../../assets/circle-user-solid 1.svg";
import phoneIcon from "../../assets/phone-flip-solid 1.svg";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>Contacto:</p>
        <img src={yellowLogo} alt="yellow-logo" />
      </div>
      <div>
        <a className="footer-links" href="https://facebook.com">
          <img src={fbLogo} alt="logo-face" />
          automaticPL
        </a>
        <a className="footer-links" href="mailto:contact@automaticPL.com">
          <img src={userIcon} alt="icon-user" />
          contact@automaticPL.com
        </a>
        <a className="footer-links" href="tel:576043344455">
          <img src={phoneIcon} alt="phone-icon" />
          604-334-4455
        </a>
      </div>
      <div>
        <Link to="login">
          <p className="footer-internal-link">Login</p>
        </Link>
        <Link to="new-account">
          <p className="footer-internal-link">Registrate</p>
        </Link>
        <Link to="login">
          <p className="footer-internal-link">Reserva</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
