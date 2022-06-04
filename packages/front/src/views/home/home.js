import signal from "../../assets/signal.svg";
import graphic1 from "../../assets/graphic-1.svg";
import graphic2 from "../../assets/graphic-2.svg";
import graphic3 from "../../assets/graphic-3.svg";
import "./styles.css";
import Header from "../header/header";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";

function Home() {
  return (
    <div>
      <Header />
      <div id="carousel-wrapper">
        <img
          id="bg-carousel"
          src={require("../../assets/carousel-picture.png")}
          alt="carousel"
        />
        <div id="menu-header">
          <Link to="new-account">
            <p>Registrate</p>
          </Link>
        </div>
        <Link to="/booking">
          <button>Reserva</button>
        </Link>
      </div>
      <div id="graphics-wrapper">
        <div className="wrapper-graphic">
          <p className="title-graphic">Ocupacion parquedero</p>
          <img src={graphic1} alt="graphic-parking-1" />
        </div>
        <div className="wrapper-graphic">
          <p className="title-graphic">Ahorro mensual </p>
          <img src={graphic2} alt="graphic-parking-2" />
        </div>
        <div className="wrapper-graphic">
          <p className="title-graphic">Ocupación de motos</p>
          <img src={graphic3} alt="graphic-parking-3" />
        </div>
      </div>
      <div id="wrapper-banner-parking">
        <img
          id="bg-parking"
          src={require("../../assets/bg-banner-parking.png")}
          alt="bg-banner-parking"
        />
        <img id="signal" src={signal} alt="signal" />
        <div id="text-banner-parking">
          <h2>Tu parqueadero</h2>
          <p>
            Podras gestionar tu reserva desde cualquier lugar Aprovecha los
            descuentos de lanzamiento No te quedes sin cupo para tu vehiculo
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
