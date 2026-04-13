import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetBooking } from "../store/flightSlice";

const Confirmation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const navigate = (path) => history.push(path);
  const { confirmation } = useSelector((state) => state.flights);

  // Guard: redirect if accessed directly without a booking
  if (!confirmation) {
    navigate("/");
    return null;
  }

  const { flight, passenger, bookingId, tripType, source, destination, departureDate, returnDate } =
    confirmation;

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

  const handleGoHome = () => {
    dispatch(resetBooking());
    navigate("/");
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        {/* Success Header */}
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <p className="booking-id">Booking ID: <strong>{bookingId}</strong></p>
        </div>

        {/* Details Grid */}
        <div className="confirmation-card">
          <div className="detail-section">
            <h3>Flight Details</h3>
            <div className="detail-row">
              <span>Flight</span>
              <span>{flight.flightNumber}</span>
            </div>
            <div className="detail-row">
              <span>Trip Type</span>
              <span>{tripType === "round-trip" ? "Round-Trip" : "One-Way"}</span>
            </div>
            <div className="detail-row">
              <span>From</span>
              <span>{source}</span>
            </div>
            <div className="detail-row">
              <span>To</span>
              <span>{destination}</span>
            </div>
            <div className="detail-row">
              <span>Departure</span>
              <span>{formatDate(departureDate)}</span>
            </div>
            {tripType === "round-trip" && returnDate && (
              <div className="detail-row">
                <span>Return</span>
                <span>{formatDate(returnDate)}</span>
              </div>
            )}
            <div className="detail-row">
              <span>Departure Time</span>
              <span>{flight.departure}</span>
            </div>
            <div className="detail-row">
              <span>Arrival Time</span>
              <span>{flight.arrival}</span>
            </div>
            <div className="detail-row">
              <span>Duration</span>
              <span>{flight.duration}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Passenger Details</h3>
            <div className="detail-row">
              <span>Name</span>
              <span>{passenger.name}</span>
            </div>
            <div className="detail-row">
              <span>Email</span>
              <span>{passenger.email}</span>
            </div>
            <div className="detail-row">
              <span>Phone</span>
              <span>{passenger.phone}</span>
            </div>
          </div>

          <div className="detail-section fare-section">
            <div className="detail-row fare-row">
              <span>Total Fare Paid</span>
              <strong>₹{flight.price.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="home-btn" onClick={handleGoHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;