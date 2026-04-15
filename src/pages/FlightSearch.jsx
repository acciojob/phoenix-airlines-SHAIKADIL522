import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSource,
  setDestination,
  setDepartureDate,
  setReturnDate,
  setTripType,
  setSearchResults,
  selectFlight,
} from "../store/flightSlice";
import { searchFlights } from "../data/flightsData";
import { useHistory } from "react-router-dom";

const FlightSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    source,
    destination,
    departureDate,
    returnDate,
    tripType,
    searchResults,
    selectedFlight,
  } = useSelector((state) => state.flights);

  const handleSearch = () => {
    const results = searchFlights(source, destination);
    dispatch(setSearchResults(results));
  };

  const handleBook = () => {
    if (!selectedFlight) return;
    history.push("/booking");
  };

  return (
    <div>
      <h2>Search Flights</h2>

      <select
        value={tripType}
        onChange={(e) => dispatch(setTripType(e.target.value))}
      >
        <option value="oneway">One Way</option>
        <option value="roundtrip">Round Trip</option>
      </select>

      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => dispatch(setSource(e.target.value))}
      />

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => dispatch(setDestination(e.target.value))}
      />

      <input
        type="date"
        value={departureDate}
        onChange={(e) => dispatch(setDepartureDate(e.target.value))}
      />

      {tripType === "roundtrip" && (
        <input
          type="date"
          value={returnDate}
          onChange={(e) => dispatch(setReturnDate(e.target.value))}
        />
      )}

      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.length === 0 && <p>No Flights Available</p>}

        {searchResults.map((flight) => (
          <div key={flight.id}>
            <p>
              {flight.source} → {flight.destination}
            </p>
            <button onClick={() => dispatch(selectFlight(flight))}>
              Select
            </button>
          </div>
        ))}
      </div>

      {/* ✅ IMPORTANT FIX */}
      <button
        type="button"
        className="book_flight"
        onClick={handleBook}
      >
        Book Now
      </button>
    </div>
  );
};

export default FlightSearch;