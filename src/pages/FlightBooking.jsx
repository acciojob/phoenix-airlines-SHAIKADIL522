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
  const [errorMsg, setErrorMsg] = useState(""); // ✅ REQUIRED

  const validate = () => {
    const errors = {};

    if (!form.name.trim()) errors.name = "Name required";
    if (!form.email.trim()) errors.email = "Email required";
    if (!form.phone.trim()) errors.phone = "Phone required";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    // ✅ REQUIRED FOR TEST
    if (Object.keys(validationErrors).length > 0) {
      setErrorMsg("All Fields are mandatory");
      return;
    }

    setErrorMsg(""); // clear error if valid

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
        {/* ✅ GLOBAL ERROR MESSAGE */}
        {errorMsg && <p>{errorMsg}</p>}

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        {errors.name && <p>{errors.name}</p>}

        <input
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        {errors.email && <p>{errors.email}</p>}

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        {errors.phone && <p>{errors.phone}</p>}

        <button type="submit" className="book_flight">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default FlightBooking;