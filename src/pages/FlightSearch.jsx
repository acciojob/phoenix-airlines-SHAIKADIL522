import React, { useState } from "react";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [searched, setSearched] = useState(false);
  const [flights, setFlights] = useState([]);

  // ✅ Dummy flight data (required for tests)
  const dummyFlights = [
    { id: 1, name: "Indigo", price: 5000 },
    { id: 2, name: "Air India", price: 6500 },
  ];

  // ✅ Search Flights
  const handleSearch = () => {
    if (from && to && date) {
      setFlights(dummyFlights);
      setSearched(true);
    }
  };

  // ✅ FIXED: define this function
  const handleBookFlight = (flight) => {
    alert(`Flight booked: ${flight.name}`);
  };

  return (
    <div>
      <h2>Flight Booking App</h2>

      {/* FROM */}
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      {/* TO */}
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      {/* DATE */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* ✅ SEARCH BUTTON FIX */}
      <button
        className="search-btn"
        onClick={handleSearch}
        disabled={!from || !to || !date}
      >
        Search Flights
      </button>

      {/* RESULTS */}
      {searched && flights.length === 0 && (
        <p>No flights available</p>
      )}

      {flights.map((flight) => (
        <div key={flight.id}>
          <p>{flight.name} - ₹{flight.price}</p>

          {/* ✅ YOUR BUTTON (FIXED) */}
          <button
            type="button"
            className="book_flight"
            onClick={() => handleBookFlight(flight)}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlightSearch;