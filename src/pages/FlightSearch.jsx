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
    setSearched(true);
  };

  const handleBookFlight = (flight) => {
    dispatch(selectFlight(flight));
    history.push("/flight-booking");
  };

  const displayedFlights = searched ? searchResults : FLIGHTS;

  return (
    <div>
      <h1>Flight Booking App</h1>

      <h2>Search Flights</h2>

      {/* ✅ ADD RADIO BUTTONS */}
      <div>
        <label>
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={() => dispatch(setTripType("oneway"))}
          />
          One Way
        </label>

        <label>
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={tripType === "roundtrip"}
            onChange={() => dispatch(setTripType("roundtrip"))}
          />
          Round Trip
        </label>
      </div>

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

        {/* ✅ ADD DATE INPUT */}
        <input
          type="date"
          value={departureDate}
          onChange={(e) => dispatch(setDepartureDate(e.target.value))}
        />

        {/* ✅ ADD RETURN DATE (for round trip test) */}
        {tripType === "roundtrip" && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) => dispatch(setReturnDate(e.target.value))}
          />
        )}

        {/* ✅ ONLY ONE MAIN BUTTON */}
        <button type="submit" disabled={isSearchDisabled}>
          Search Flights
        </button>
      </form>

      <ul>
        {displayedFlights.map((flight) => (
          <li key={flight.id}>
            {flight.source} → {flight.destination}

            {/* ✅ KEEP BUT DISABLED BEFORE SEARCH */}
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
  );
};

export default FlightSearch;