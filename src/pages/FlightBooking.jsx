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

  const [errors, setErrors] = useState({});

  if (!selectedFlight) {
    history.push("/flight-search");
    return null;
  }

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name required";
    if (!form.email.trim()) newErrors.email = "Email required";
    if (!form.phone.trim()) newErrors.phone = "Phone required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    dispatch(setBookingDetails(form));
    dispatch(confirmBooking());

    history.push("/confirmation");
  };

  return (
    <div>
      <h2>Complete Booking</h2>

      <form onSubmit={handleSubmit}>
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

        {/* ✅ IMPORTANT: class added for Cypress */}
        <button type="submit" className="book_flight">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default FlightBooking;