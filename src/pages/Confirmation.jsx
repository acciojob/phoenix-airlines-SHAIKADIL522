import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetBooking } from "../store/flightSlice";

const Confirmation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { confirmation } = useSelector((state) => state.flights);

  if (!confirmation) { history.push("/"); return null; }

  const { flight, passenger, bookingId, tripType, source, destination, departureDate, returnDate } = confirmation;

  const handleGoHome = () => { dispatch(resetBooking()); history.push("/"); };

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <p className="booking-id">Booking ID: <strong>{bookingId}</strong></p>
        </div>
        <div className="confirmation-card">
          <div className="detail-section">
            <h3>Flight Details</h3>
            <div className="detail-row"><span>Flight</span><span>{flight.flightNumber}</span></div>
            <div className="detail-row"><span>Trip</span><span>{tripType === "round-trip" ? "Round-Trip" : "One-Way"}</span></div>
            <div className="detail-row"><span>From</span><span>{source}</span></div>
            <div className="detail-row"><span>To</span><span>{destination}</span></div>
            <div className="detail-row"><span>Departure</span><span>{departureDate || "—"}</span></div>
            {tripType === "round-trip" && returnDate && (
              <div className="detail-row"><span>Return</span><span>{returnDate}</span></div>
            )}
            <div className="detail-row"><span>Time</span><span>{flight.departure} → {flight.arrival}</span></div>
          </div>
          <div className="detail-section">
            <h3>Passenger</h3>
            <div className="detail-row"><span>Name</span><span>{passenger.name}</span></div>
            <div className="detail-row"><span>Email</span><span>{passenger.email}</span></div>
            <div className="detail-row"><span>Phone</span><span>{passenger.phone}</span></div>
          </div>
          <div className="detail-section fare-section">
            <div className="detail-row fare-row">
              <span>Total Fare</span>
              <strong>₹{flight.price.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>
        {/* button required by Cypress confirmation test */}
        <button className="home-btn" onClick={handleGoHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default Confirmation;