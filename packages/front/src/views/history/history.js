import "./styles.css";
import Header from "../header/header";
import getLocalUser from "../../utils/getLocalUser";
import Footer from "../footer/footer";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../utils/constans";
import dateCoder from "../../utils/date-coder";

function History() {
  const { localUser, isLogged } = getLocalUser();
  const [value, onChange] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }

    const fetchData = async () => {
      const params = {
        filter: {
          offset: 0,
          limit: 100,
          skip: 0,
          order: "string",
          fields: {
            id: true,
            username: true,
            password: true,
            token: true,
          },
          include: [{ relation: "bookings" }],
        },
      };
      const response = await axios.get(apiURL + "users/" + localUser.id, {
        params,
      });
      if (response.data) {
        const { data } = response;
        if (data.bookings) {
          localStorage.setItem("user", JSON.stringify(data));
          setBookings(data.bookings);
        }
      }
    };

    fetchData().then();
  }, [setBookings]);
  return (
    <div className="bookingContainer">
      <Header />
      <div className="historyBody">
        <p className="titleHistory">$2500/hora</p>
        <table>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Ubicacion</th>
          </tr>
          {bookings.map((booking) => {
            return (
              <tr>
                <td>{dateCoder(booking.datetime)}</td>
                <td>{booking.time}</td>
                <td>{booking.location}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="buttonsWrapper">
        <Link to="/booking">
          <button>Reservar</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default History;
