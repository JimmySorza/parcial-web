import "./styles.css";
import Header from "../header/header";
import getLocalUser from "../../utils/getLocalUser";
import Footer from "../footer/footer";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import dateCoder from "../../utils/date-coder";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { apiURL } from "../../utils/constans";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const schema = yup.object().shape({
  time: yup.string(),
  location: yup.string(),
});
function Booking() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { localUser, isLogged } = getLocalUser();
  const [error, setError] = useState(null);
  const [value, onChange] = useState(new Date());
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState(null);
  let navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState(null);
  const [dateCore, setCoreSelected] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  Modal.setAppElement("#root");

  const handleDayClick = (value, event) => {
    console.log(value);
    setCoreSelected(value);
    const dateSelected = dateCoder(value);
    setDateSelected(dateSelected);
    openModal();
  };
  const onSubmitHandler = async () => {
    console.log({ time, location });
    setError(null);
    const params = {
      datetime: dateCore,
      time,
      location,
      userId: localUser.id,
    };
    console.log(params);
    try {
      const createUser = await axios.post(
        apiURL + "users/" + localUser.id + "/bookings",
        {
          datetime: dateCore,
          time,
          location,
          userId: localUser.id,
        }
      );
      console.log(createUser.data);
      if (createUser.status === 200) {
        console.log("creado");
        navigate("/history");
      }
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  });
  return (
    <div className="bookingContainer">
      <Header />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="formNewBooking">
            <p className="formTitle">Reserva para el {dateSelected}</p>
            <label htmlFor="time">Hora </label>
            <input
              {...register("time")}
              type="time"
              id="appt"
              name="appt"
              onChange={(value) => setTime(value.target.value)}
              required
            />
            <p className="errorMessage">{errors.time?.message}</p>
            <label htmlFor="location">Ubicación</label>
            <select
              {...register("location")}
              defaultValue=""
              name="locations"
              id="location"
              onChange={(value) => setLocation(value.target.value)}
              required
            >
              <option disabled value="">
                Selecciona una opción
              </option>
              <option value="1-A">1-A</option>
              <option value="3-A">3-A</option>
              <option value="7-B">7-B</option>
              <option value="1-B">1-B</option>
            </select>
            <p className="errorMessage">{errors.location?.message}</p>
            {error && <p className="errorMessage">{error}</p>}
            <button type="submit">Reservar</button>
          </div>
        </form>
      </Modal>
      <div className="bookingBody">
        <div className="calWrapper">
          <Calendar
            minDate={new Date()}
            onClickDay={(value, event) => handleDayClick(value, event)}
            onChange={onChange}
            value={value}
            locale="es-ES"
          />
        </div>
      </div>
      <div className="buttonsWrapper">
        <Link to={"/history"}>
          <button>Historial reservas</button>
        </Link>
        <button>Realiza tu reserva</button>
      </div>
      <Footer />
    </div>
  );
}

export default Booking;
