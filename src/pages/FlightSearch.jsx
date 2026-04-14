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

const CITY_OPTIONS = Array.from(
  new Set(FLIGHTS.flatMap((flight) => [flight.source, flight.destination]))
).sort();

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

  const isSearchDisabled = !source.trim() || !destination.trim();

  const validate = () => {
    const newErrors = {};

    if (!source.trim()) newErrors.source = "Please select a source city.";
    if (!destination.trim()) {
      newErrors.destination = "Please select a destination city.";
    }
    if (
      source.trim() &&
      destination.trim() &&
      source.trim().toLowerCase() === destination.trim().toLowerCase()
    ) {
      newErrors.destination = "Source and destination cannot be the same.";
    }
    if (tripType === "round-trip" && returnDate && departureDate) {
      if (new Date(returnDate) < new Date(departureDate)) {
        newErrors.returnDate = "Return date must be after departure date.";
      }
    }

    return newErrors;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSearched(false);
      return;
    }

    setErrors({});
    dispatch(setSearchResults(searchFlights(source, destination)));
    setSearched(true);
  };

  const handleBookFlight = (flight) => {
    dispatch(selectFlight(flight));
    history.push("/flight-booking");
  };

  const updateField = (action, key, value) => {
    dispatch(action(value));
    setSearched(false);
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const today = new Date().toISOString().split("T")[0];
  const displayedFlights = searched ? searchResults : FLIGHTS;
  const showNoFlights = searched && displayedFlights.length === 0;

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
              onChange={() => {
                dispatch(setTripType("one-way"));
                setSearched(false);
              }}
            />
            <span>One-Way</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={tripType === "round-trip"}
              onChange={() => {
                dispatch(setTripType("round-trip"));
                setSearched(false);
              }}
            />
            <span>Round-Trip</span>
          </label>
        </div>

        <form className="search-form" onSubmit={handleSearch} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="source">From</label>
              <select
                id="source"
                value={source}
                onChange={(e) => updateField(setSource, "source", e.target.value)}
                className={errors.source ? "input-error" : ""}
              >
                <option value="">Select source</option>
                {CITY_OPTIONS.map((city) => (
                  <option key={`source-${city}`} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.source && <span className="error-msg">{errors.source}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="destination">To</label>
              <select
                id="destination"
                value={destination}
                onChange={(e) =>
                  updateField(setDestination, "destination", e.target.value)
                }
                className={errors.destination ? "input-error" : ""}
              >
                <option value="">Select destination</option>
                {CITY_OPTIONS.map((city) => (
                  <option key={`destination-${city}`} value={city}>
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
            <div className="form-group">
              <label htmlFor="departureDate">Departure Date</label>
              <input
                type="date"
                id="departureDate"
                min={today}
                value={departureDate}
                onChange={(e) =>
                  updateField(setDepartureDate, "departureDate", e.target.value)
                }
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
                  onChange={(e) =>
                    updateField(setReturnDate, "returnDate", e.target.value)
                  }
                  className={errors.returnDate ? "input-error" : ""}
                />
                {errors.returnDate && (
                  <span className="error-msg">{errors.returnDate}</span>
                )}
              </div>
            )}
          </div>

          <button type="submit" className="search-btn" disabled={isSearchDisabled}>
            Search Flights
          </button>
        </form>

        {showNoFlights ? (
          <div className="no-flights-message">No flights available for this route.</div>
        ) : (
          <ul className="flights-list">
            {displayedFlights.map((flight) => (
              <li key={flight.id} className="flight-card">
                <div className="flight-info">
                  <div className="flight-route">
                    <span className="city">{flight.source}</span>
                    <span className="flight-arrow"> -&gt; </span>
                    <span className="city">{flight.destination}</span>
                  </div>
                  <div className="flight-meta">
                    <span>{flight.flightNumber}</span>
                    <span>{flight.departure} - {flight.arrival}</span>
                    <span>{flight.duration}</span>
                    <span className="seats-left">{flight.seats} seats left</span>
                  </div>
                </div>
                <div className="flight-price-block">
                  <span className="price">
                    Rs {flight.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    type="button"
                    className="book_flight"
                    disabled={!searched}
                    onClick={() => handleBookFlight(flight)}
                  >
                    Book Now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
