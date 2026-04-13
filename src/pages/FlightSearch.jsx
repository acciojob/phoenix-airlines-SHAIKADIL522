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

  const validate = () => {
    const newErrors = {};

    if (!source.trim()) {
      newErrors.source = "Please enter a source city.";
    }

    if (!destination.trim()) {
      newErrors.destination = "Please enter a destination city.";
    }

    if (
      source.trim() &&
      destination.trim() &&
      source.trim().toLowerCase() === destination.trim().toLowerCase()
    ) {
      newErrors.destination = "Source and destination cannot be the same.";
    }

    if (!departureDate) {
      newErrors.departureDate = "Please select a departure date.";
    }

    if (tripType === "round-trip") {
      if (!returnDate) {
        newErrors.returnDate = "Please select a return date.";
      } else if (departureDate && new Date(returnDate) < new Date(departureDate)) {
        newErrors.returnDate = "Return date must be after departure date.";
      }
    }

    return newErrors;
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSearched(false);
      dispatch(setSearchResults([]));
      return;
    }

    const results = searchFlights(source, destination);
    setErrors({});
    setSearched(true);
    dispatch(setSearchResults(results));
  };

  const handleBookFlight = (flight) => {
    dispatch(selectFlight(flight));
    history.push("/flight-booking");
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h2 className="page-title">Search Flights</h2>

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
                onChange={(event) => {
                  dispatch(setSource(event.target.value));
                  setErrors((prev) => ({ ...prev, source: undefined }));
                }}
                className={errors.source ? "input-error" : ""}
              />
              {errors.source && <span className="error-msg">{errors.source}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="destination">To</label>
              <input
                type="text"
                id="destination"
                placeholder="e.g. Delhi"
                value={destination}
                onChange={(event) => {
                  dispatch(setDestination(event.target.value));
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
                value={departureDate}
                onChange={(event) => {
                  dispatch(setDepartureDate(event.target.value));
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
                  value={returnDate}
                  onChange={(event) => {
                    dispatch(setReturnDate(event.target.value));
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

        {searched && (
          <div className="results-section">
            <ul className="flights-list">
              {searchResults.map((flight) => (
                <li key={flight.id} className="flight-card">
                  <div className="flight-info">
                    <div className="flight-route">
                      <span className="city">{flight.source}</span>
                      <span className="flight-arrow"> -> </span>
                      <span className="city">{flight.destination}</span>
                    </div>
                    <div className="flight-meta">
                      <span>{flight.flightNumber}</span>
                      <span>
                        {flight.departure} to {flight.arrival}
                      </span>
                      <span>{flight.duration}</span>
                      <span className="seats-left">{flight.seats} seats left</span>
                    </div>
                  </div>

                  <div className="flight-price-block">
                    <span className="price">Rs. {flight.price}</span>
                    <button
                      type="button"
                      className="book-flight"
                      onClick={() => handleBookFlight(flight)}
                    >
                      Book Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {searchResults.length === 0 && (
              <p className="no-results">No flights found for this route.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
