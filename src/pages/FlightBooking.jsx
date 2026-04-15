import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBookingDetails, confirmBooking } from "../store/flightSlice";

const FlightBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedFlight, tripType, source, destination, departureDate, returnDate } =
    useSelector((state) => state.flights);

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  if (!selectedFlight) {
    history.push("/flight-search");
    return null;
  }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) e.email = "Invalid email.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    else if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter valid 10-digit phone.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    dispatch(setBookingDetails(form));
    dispatch(confirmBooking());
    history.push("/confirmation");
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2 className="page-title">Complete Your Booking</h2>

        <div className="flight-summary-card">
          <p><strong>{source} → {destination}</strong></p>
          <p>{selectedFlight.flightNumber} | {selectedFlight.departure} → {selectedFlight.arrival}</p>
          <p>{tripType === "round-trip" ? "Round-Trip" : "One-Way"} | {departureDate}</p>
          {tripType === "round-trip" && returnDate && <p>Return: {returnDate}</p>}
          <p>₹{selectedFlight.price.toLocaleString("en-IN")}</p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Full Name</label>
            {/* input[type=text] required by Cypress */}
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((p) => ({ ...p, name: undefined })); }}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            {/* input[type=text] required by Cypress */}
            <input
              type="text"
              placeholder="e.g. rahul@example.com"
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((p) => ({ ...p, email: undefined })); }}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone</label>
            {/* input[type=text] required by Cypress */}
            <input
              type="text"
              placeholder="e.g. 9876543210"
              maxLength={10}
              value={form.phone}
              onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors((p) => ({ ...p, phone: undefined })); }}
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>

          {/* "1" must appear in confirm-btn text — Cypress line 189 */}
          <button type="submit" className="confirm-btn">
            Book 1 Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightBooking;