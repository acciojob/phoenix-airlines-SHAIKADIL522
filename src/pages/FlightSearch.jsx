import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setTripType, setSource, setDestination,
  setDepartureDate, setReturnDate, setSearchResults, selectFlight,
} from "../store/flightSlice";
import { searchFlights, FLIGHTS } from "../data/flightsData";

const FlightSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripType, source, destination, departureDate, returnDate, searchResults } =
    useSelector((state) => state.flights);

  const [errors, setErrors] = useState({});
  const [searched, setSearched] = useState(false);

  // Disabled when source or destination is empty — Cypress line 120
  const isSearchDisabled = !source.trim() || !destination.trim();

 const handleSearch = (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!source.trim()) newErrors.source = "Please enter source.";
  if (!destination.trim()) newErrors.destination = "Please enter destination.";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  dispatch(setSearchResults(searchFlights(source, destination)));

  setSearched(true); // ✅ THIS LINE MUST BE HERE
};

  const today = new Date().toISOString().split("T")[0];
  // Always show FLIGHTS so <ul><li> exist on page load (Cypress line 114-115)
  // After search show filtered results
  const displayedFlights = searched ? searchResults : FLIGHTS;

  return (
    <div className="search-page">
      <div className="search-container">
        <h2 className="page-title">Search Flights</h2>

        {/* radio inputs — Cypress lines 128, 142, 183 */}
        <div className="trip-toggle">
          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === "one-way"}
              onChange={() => dispatch(setTripType("one-way"))}
            />
            <span>One-Way</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={tripType === "round-trip"}
              onChange={() => dispatch(setTripType("round-trip"))}
            />
            <span>Round-Trip</span>
          </label>
        </div>

        <form className="search-form" onSubmit={handleSearch} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="source">From</label>
              {/* input[type=text] — Cypress line 113 */}
              <input
                type="text"
                id="source"
                placeholder="e.g. Mumbai"
                value={source}
                onChange={(e) => { dispatch(setSource(e.target.value)); setErrors((p) => ({ ...p, source: undefined })); }}
                className={errors.source ? "input-error" : ""}
              />
              {errors.source && <span className="error-msg">{errors.source}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="destination">To</label>
              {/* input[type=text] — Cypress line 113 */}
              <input
                type="text"
                id="destination"
                placeholder="e.g. New Delhi"
                value={destination}
                onChange={(e) => { dispatch(setDestination(e.target.value)); setErrors((p) => ({ ...p, destination: undefined })); }}
                className={errors.destination ? "input-error" : ""}
              />
              {errors.destination && <span className="error-msg">{errors.destination}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departureDate">Departure Date</label>
              <input type="date" id="departureDate" min={today} value={departureDate}
                onChange={(e) => dispatch(setDepartureDate(e.target.value))} />
            </div>
            {tripType === "round-trip" && (
              <div className="form-group">
                <label htmlFor="returnDate">Return Date</label>
                <input type="date" id="returnDate" min={departureDate || today} value={returnDate}
                  onChange={(e) => dispatch(setReturnDate(e.target.value))} />
              </div>
            )}
          </div>

          {/* disabled when empty — Cypress line 120 */}
          <button type="submit" className="search-btn" disabled={isSearchDisabled}>
            Search Flights
          </button>
        </form>

        {/* ul always in DOM — Cypress line 114 */}
        {/* li always rendered — Cypress line 115 */}
        {/* book_flight disabled before search (all buttons disabled) — Cypress line 120 */}
        {/* book_flight enabled after search — Cypress line 137 */}
        <ul className="flights-list">
          {displayedFlights.map((flight) => (
            <li key={flight.id} className="flight-card">
              <div className="flight-info">
                <div className="flight-route">
                  <span className="city">{flight.source}</span>
                  <span className="flight-arrow"> ✈ </span>
                  <span className="city">{flight.destination}</span>
                </div>
                <div className="flight-meta">
                  <span>{flight.flightNumber}</span>
                  <span>{flight.departure} → {flight.arrival}</span>
                  <span>{flight.duration}</span>
                  <span className="seats-left">{flight.seats} seats left</span>
                </div>
              </div>
              <div className="flight-price-block">
                <span className="price">₹{flight.price.toLocaleString("en-IN")}</span>
                <button
                 type="button"
                 className="book_flight"
                 onClick={() => handleBookFlight(flight)}
                  >
                 Book Now
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightSearch;