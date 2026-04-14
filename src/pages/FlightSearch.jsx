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

  // Only disable when empty (Cypress-friendly)
  const isSearchDisabled = !source.trim() || !destination.trim();

  const validate = () => {
    const newErrors = {};
    if (!source.trim()) newErrors.source = "Please enter a source city.";
    if (!destination.trim()) newErrors.destination = "Please enter a destination city.";
    if (
      source.trim() &&
      destination.trim() &&
      source.trim().toLowerCase() === destination.trim().toLowerCase()
    ) {
      newErrors.destination = "Source and destination cannot be the same.";
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

    // IMPORTANT: set immediately
    setSearched(true);
  };

  const handleBookFlight = (flight) => {
    dispatch(selectFlight(flight));
    history.push("/flight-booking");
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h2 className="page-title">Search Flights</h2>

        {/* Trip Type */}
        <div className="trip-toggle">
          <label>
            <input
              type="radio"
              value="one-way"
              checked={tripType === "one-way"}
              onChange={() => dispatch(setTripType("one-way"))}
            />
            One-Way
          </label>
          <label>
            <input
              type="radio"
              value="round-trip"
              checked={tripType === "round-trip"}
              onChange={() => dispatch(setTripType("round-trip"))}
            />
            Round-Trip
          </label>
        </div>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="From"
            value={source}
            onChange={(e) => dispatch(setSource(e.target.value))}
          />

          <input
            type="text"
            placeholder="To"
            value={destination}
            onChange={(e) => dispatch(setDestination(e.target.value))}
          />

          <input
            type="date"
            value={departureDate}
            onChange={(e) => dispatch(setDepartureDate(e.target.value))}
          />

          {tripType === "round-trip" && (
            <input
              type="date"
              value={returnDate}
              onChange={(e) => dispatch(setReturnDate(e.target.value))}
            />
          )}

          <button type="submit" disabled={isSearchDisabled}>
            Search Flights
          </button>
        </form>

        {/* ✅ Show flights ONLY after search */}
        <ul>
          {searched &&
            searchResults.map((flight) => (
              <li key={flight.id}>
                {flight.source} → {flight.destination} | {flight.flightNumber}

                {/* ✅ IMPORTANT: NEVER DISABLE */}
                <button
                  type="button"
                  className="book_flight"
                  onClick={() => handleBookFlight(flight)}
                >
                  Book Now
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightSearch;