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

  const [searched, setSearched] = useState(false);

  const isSearchDisabled = !source.trim() || !destination.trim();

  const handleSearch = (e) => {
    e.preventDefault();

    const results = searchFlights(source, destination);
    dispatch(setSearchResults(results));

    // IMPORTANT: make sure this runs instantly
    setSearched(true);
  };

  const handleBookFlight = (flight) => {
    dispatch(selectFlight(flight));
    history.push("/flight-booking");
  };

  // ✅ FIX: show flights initially
  const displayedFlights = searched ? searchResults : FLIGHTS;

  return (
    <div>
      <h2>Search Flights</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={source}
          onChange={(e) => dispatch(setSource(e.target.value))}
          placeholder="From"
        />

        <input
          type="text"
          value={destination}
          onChange={(e) => dispatch(setDestination(e.target.value))}
          placeholder="To"
        />

        <button type="submit" disabled={isSearchDisabled}>
          Search Flights
        </button>
      </form>

      {/* ✅ li MUST always exist */}
      <ul>
        {displayedFlights.map((flight) => (
          <li key={flight.id}>
            {flight.source} → {flight.destination}

            <button
              type="button"
              className="book_flight"
              disabled={!searched}   // ✅ KEY FIX
              onClick={() => handleBookFlight(flight)}
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSearch;