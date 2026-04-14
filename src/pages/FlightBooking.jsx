import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBookingDetails, confirmBooking } from "../store/flightSlice";

// ─── Validators (pure functions — easy to unit-test) ──────────────
const isValidName = (value) => /^[A-Za-z\s]{2,60}$/.test(value.trim());
const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value.trim());

const FlightBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const navigate = (path) => history.push(path);

  const { selectedFlight, booking, tripType, source, destination, departureDate, returnDate } =
    useSelector((state) => state.flights);

  const [form, setForm] = useState({
    name: booking.name || "",
    email: booking.email || "",
    phone: booking.phone || "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Guard: redirect if no flight was selected
  if (!selectedFlight) {
    navigate("/flight-search");
    return null;
  }

  // ─── Per-field validation ──────────────────────────────────────
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required.";
        if (!isValidName(value))
          return "Name must contain only letters and spaces (2–60 chars).";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!isValidEmail(value)) return "Enter a valid email address.";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required.";
        if (!isValidPhone(value))
          return "Enter a valid 10-digit Indian mobile number.";
        return "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  // ─── Handlers ────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true };
    setTouched(allTouched);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    dispatch(setBookingDetails(form));
    dispatch(confirmBooking());
    navigate("/confirmation");
  };

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2 className="page-title">Complete Your Booking</h2>

        {/* Flight Summary Card */}
        <div className="flight-summary-card">
          <div className="summary-header">
            <span className="trip-badge">
              {tripType === "round-trip" ? "Round-Trip" : "One-Way"}
            </span>
            <span className="flight-number">{selectedFlight.flightNumber}</span>
          </div>
          <div className="summary-route">
            <div className="summary-city">
              <strong>{source || selectedFlight.source}</strong>
              <span>{selectedFlight.departure}</span>
            </div>
            <div className="summary-mid">
              <span className="summary-duration">{selectedFlight.duration}</span>
              <div className="summary-line">✈</div>
            </div>
            <div className="summary-city">
              <strong>{destination || selectedFlight.destination}</strong>
              <span>{selectedFlight.arrival}</span>
            </div>
          </div>
          <div className="summary-dates">
            <span>🗓 Depart: {formatDate(departureDate)}</span>
            {tripType === "round-trip" && returnDate && (
              <span>🗓 Return: {formatDate(returnDate)}</span>
            )}
          </div>
          <div className="summary-price">
            <span>Total Fare</span>
            <strong>₹{selectedFlight.price.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* Passenger Details Form */}
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <h3 className="form-section-title">Passenger Details</h3>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name && touched.name ? "input-error" : ""}
              autoComplete="name"
            />
            {errors.name && touched.name && (
              <span className="error-msg">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="e.g. rahul@example.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error" : ""}
              autoComplete="email"
            />
            {errors.email && touched.email && (
              <span className="error-msg">{errors.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="e.g. 9876543210"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone && touched.phone ? "input-error" : ""}
              autoComplete="tel"
            />
            {errors.phone && touched.phone && (
              <span className="error-msg">{errors.phone}</span>
            )}
          </div>

          <button type="submit" className="confirm-btn">
            Confirm Booking (1)
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightBooking;