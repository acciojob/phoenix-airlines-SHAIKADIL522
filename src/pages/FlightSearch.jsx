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
import { searchFlights, FLIGHTS } from "../data/flightsData";

const FlightSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  // Search button is disabled when source or destination is empty
  // Cypress test line 120: expects button to be disabled when fields empty
  const isSearchDisabled = !source.trim() || !destination.trim();

  const validate = () => {
    const newErrors = {};
    if (!source.trim()) newErrors.source = "Please enter a source city.";
    if (!destination.trim())
      newErrors.destination = "Please enter a destination city.";
    if (
      source.trim() &&
      destination.trim() &&
      source.trim().toLowerCase() === destination.trim().toLowerCase()
    ) {
      newErrors.destination = "Source and destination cannot be the same.";
    }
    if (tripType === "round-trip" && returnDate && departureDate) {
      if (new Date(returnDate) < new Date(departureDate))
        newErrors.returnDate = "Return date must be after departure date.";
    }
    return newErrors;
  };

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
    history.push("/flight-booking");
  };

  const today = new Date().toISOString().split("T")[0];

  // Always show flights — default all, after search show filtered results
  const displayedFlights = searched ? searchResults : FLIGHTS;

  return (
    <div className="search-page">
      <div className="search-container">
        <h2 className="page-title">Search Flights</h2>

        {/* Trip Type — radio inputs required by Cypress */}
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
              <input
                type="text"
                id="source"
                placeholder="e.g. Mumbai"
                value={source}
                onChange={(e) => {
                  dispatch(setSource(e.target.value));
                  setErrors((prev) => ({ ...prev, source: undefined }));
                }}
                className={errors.source ? "input-error" : ""}
              />
              {errors.source && (
                <span className="error-msg">{errors.source}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="destination">To</label>
              <input
                type="text"
                id="destination"
                placeholder="e.g. New Delhi"
                value={destination}
                onChange={(e) => {
                  dispatch(setDestination(e.target.value));
                  setErrors((prev) => ({ ...prev, destination: undefined }));
                }}
                className={errors.destination ? "input-error" : ""}
              />
              {errors.destination && (
                <span className="error-msg">{errors.destination}</span>
              )}
            </div>
          </div>

          <div className="form-row">
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

          {/*
            CRITICAL: disabled when source or destination is empty.
            Cypress test line 120 expects button to be disabled.
          */}
          <button
            type="submit"
            className="search-btn"
            disabled={isSearchDisabled}
          >
            Search Flights
          </button>
        </form>

        {/*
          ul and li always in DOM from page load.
          CRITICAL: className must be "book_flight" (underscore) not "book-flight".
          Cypress test line 137 looks for .book_flight
        */}
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
                <span className="price">
                  ₹{flight.price.toLocaleString("en-IN")}
                </span>
                {/* CRITICAL: class must be book_flight (underscore) */}
                <button
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
}; //one-way and round-trip search form with validation, flight listing, and navigation to booking page on "Book Now" click.

export default FlightSearch;