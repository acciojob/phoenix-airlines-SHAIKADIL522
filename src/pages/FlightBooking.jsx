import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBookingDetails, confirmBooking } from "../store/flightSlice";

const FlightBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { selectedFlight } = useSelector((state) => state.flights);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      return { general: "All Fields are mandatory" };
    }
    return {};
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (validationErrors.general) {
      setErrorMsg(validationErrors.general);
      return;
    }

    setErrorMsg("");

    dispatch(setBookingDetails(form));
    dispatch(confirmBooking());
    history.push("/confirmation");
  };

  if (!selectedFlight) {
    return <div>No flight selected</div>;
  }

  return (
    <div>
      <h2>Complete Booking</h2>

      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <button type="submit" className="book_flight">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default FlightBooking;