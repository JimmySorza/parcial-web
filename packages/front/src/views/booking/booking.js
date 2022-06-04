import "./styles.css";
import Header from "../header/header";
import getLocalUser from "../../utils/getLocalUser";
import Footer from "../footer/footer";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const { localUser, isLogged } = getLocalUser();
  const [value, onChange] = useState(new Date());
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  });
  return (
    <div className="bookingContainer">
      <Header />
      <div className="bookingBody">
        <div className="calWrapper">
          <Calendar
            onClickDay={(value, event) => console.log("Clicked day: ", value)}
            onChange={onChange}
            value={value}
            locale="es-ES"
          />
        </div>
      </div>
      <div className="buttonsWrapper">
        <button>Historial reservas</button>
        <button>Realiza tu reserva</button>
      </div>
      <Footer />
    </div>
  );
}

export default Booking;
