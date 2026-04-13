import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setTripType,
  setSource,
  setDestination,
  setDepartureDate,
  setReturnDate,
  setSearchResults,
  selectFlight,
} from "../store/flightSlice";
import { searchFlights } from "../data/flightsData";

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
];

const FlightSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const navigate = (path) => history.push(path);

  const {
    tripType,
    source,
    destination,
    departureDate,
    returnDate,
    searchResults,
  } = useSelector((state) => state.flights);

  const [errors, setErrors] = useState({});
  const [searched, setSearched] = useState(false);

  // ─── Validation ───────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!source.trim()) newErrors.source = "Please select a source city.";
    if (!destination.trim())
      newErrors.destination = "Please select a destination city.";
    if (source && destination && source === destination)
      newErrors.destination = "Source and destination cannot be the same.";
    if (!departureDate)
      newErrors.departureDate = "Please select a departure date.";
    else if (new Date(departureDate) < today)
      newErrors.departureDate = "Departure date cannot be in the past.";

    if (tripType === "round-trip") {
      if (!returnDate) newErrors.returnDate = "Please select a return date.";
      else if (departureDate && new Date(returnDate) < new Date(departureDate))
        newErrors.returnDate = "Return date must be after departure date.";
    }

    return newErrors;
  };

  // ─── Handlers ────────────────────────────────────────────────────
  const handleSearch = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const results = searchFlights(source, destination);
    dispatch(setSearchResults(results));
    setSearched(true);
  };

  const handleBookFlight = (flight) => {
    dispatch(selectFlight(flight));
    navigate("/flight-booking");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="search-page">
      <div className="search-container">
        <h2 className="page-title">Search Flights</h2>

        {/* Trip Type Toggle */}
        <div className="trip-toggle">
          <button
            className={`toggle-btn ${tripType === "one-way" ? "active" : ""}`}
            onClick={() => dispatch(setTripType("one-way"))}
          >
            One-Way
          </button>
          <button
            className={`toggle-btn ${
              tripType === "round-trip" ? "active" : ""
            }`}
            onClick={() => dispatch(setTripType("round-trip"))}
          >
            Round-Trip
          </button>
        </div>

        {/* Search Form */}
        <form className="search-form" onSubmit={handleSearch} noValidate>
          <div className="form-row">
            {/* Source */}
            <div className="form-group">
              <label htmlFor="source">From</label>
              <select
                id="source"
                value={source}
                onChange={(e) => {
                  dispatch(setSource(e.target.value));
                  setErrors((prev) => ({ ...prev, source: undefined }));
                }}
                className={errors.source ? "input-error" : ""}
              >
                <option value="">Select city</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.source && (
                <span className="error-msg">{errors.source}</span>
              )}
            </div>

            {/* Destination */}
            <div className="form-group">
              <label htmlFor="destination">To</label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => {
                  dispatch(setDestination(e.target.value));
                  setErrors((prev) => ({ ...prev, destination: undefined }));
                }}
                className={errors.destination ? "input-error" : ""}
              >
                <option value="">Select city</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.destination && (
                <span className="error-msg">{errors.destination}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            {/* Departure Date */}
            <div className="form-group">
              <label htmlFor="departureDate">Departure Date</label>
              <input
                type="date"
                id="departureDate"
                min={today}
                value={departureDate}
                onChange={(e) => {
                  dispatch(setDepartureDate(e.target.value));
                  setErrors((prev) => ({ ...prev, departureDate: undefined }));
                }}
                className={errors.departureDate ? "input-error" : ""}
              />
              {errors.departureDate && (
                <span className="error-msg">{errors.departureDate}</span>
              )}
            </div>

            {/* Return Date — visible only for round-trip */}
            {tripType === "round-trip" && (
              <div className="form-group">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  min={departureDate || today}
                  value={returnDate}
                  onChange={(e) => {
                    dispatch(setReturnDate(e.target.value));
                    setErrors((prev) => ({ ...prev, returnDate: undefined }));
                  }}
                  className={errors.returnDate ? "input-error" : ""}
                />
                {errors.returnDate && (
                  <span className="error-msg">{errors.returnDate}</span>
                )}
              </div>
            )}
          </div>

          <button type="submit" className="search-btn">
            Search Flights
          </button>
        </form>

        {/* Results */}
        {searched && (
          <div className="results-section">
            <h3 className="results-title">
              {searchResults.length > 0
                ? `${searchResults.length} Flight${searchResults.length > 1 ? "s" : ""} Found`
                : "No flights found for this route."}
            </h3>

            <div className="flights-list">
              {searchResults.map((flight) => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-info">
                    <div className="flight-route">
                      <span className="city">{flight.source}</span>
                      <span className="flight-arrow">✈</span>
                      <span className="city">{flight.destination}</span>
                    </div>
                    <div className="flight-meta">
                      <span>{flight.flightNumber}</span>
                      <span>{flight.departure} → {flight.arrival}</span>
                      <span>{flight.duration}</span>
                      <span className="seats-left">
                        {flight.seats} seats left
                      </span>
                    </div>
                  </div>
                  <div className="flight-price-block">
                    <span className="price">₹{flight.price.toLocaleString("en-IN")}</span>
                    <button
                      className="book-flight"
                      onClick={() => handleBookFlight(flight)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;