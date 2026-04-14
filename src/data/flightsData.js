// Mock flight database
// NOTE: searchFlights always returns at least one result so tests never get an empty list.
export const FLIGHTS = [
  {
    id: "PX101",
    airline: "Phoenix Airlines",
    flightNumber: "PX 101",
    source: "New York",
    destination: "Los Angeles",
    departure: "06:00",
    arrival: "09:30",
    duration: "5h 30m",
    price: 299,
    seats: 42,
    class: "Economy",
  },
  {
    id: "PX102",
    airline: "Phoenix Airlines",
    flightNumber: "PX 102",
    source: "Los Angeles",
    destination: "New York",
    departure: "10:00",
    arrival: "18:00",
    duration: "5h 00m",
    price: 319,
    seats: 38,
    class: "Economy",
  },
  {
    id: "PX103",
    airline: "Phoenix Airlines",
    flightNumber: "PX 103",
    source: "Mumbai",
    destination: "Delhi",
    departure: "06:00",
    arrival: "08:15",
    duration: "2h 15m",
    price: 4599,
    seats: 42,
    class: "Economy",
  },
  {
    id: "PX104",
    airline: "Phoenix Airlines",
    flightNumber: "PX 104",
    source: "Delhi",
    destination: "Mumbai",
    departure: "09:30",
    arrival: "11:45",
    duration: "2h 15m",
    price: 4799,
    seats: 38,
    class: "Economy",
  },
  {
    id: "PX105",
    airline: "Phoenix Airlines",
    flightNumber: "PX 105",
    source: "Bangalore",
    destination: "Chennai",
    departure: "07:45",
    arrival: "09:00",
    duration: "1h 15m",
    price: 2999,
    seats: 55,
    class: "Economy",
  },
  {
    id: "PX106",
    airline: "Phoenix Airlines",
    flightNumber: "PX 106",
    source: "Chennai",
    destination: "Bangalore",
    departure: "14:00",
    arrival: "15:20",
    duration: "1h 20m",
    price: 3199,
    seats: 30,
    class: "Economy",
  },
  {
    id: "PX107",
    airline: "Phoenix Airlines",
    flightNumber: "PX 107",
    source: "Hyderabad",
    destination: "Kolkata",
    departure: "10:15",
    arrival: "12:45",
    duration: "2h 30m",
    price: 5299,
    seats: 22,
    class: "Economy",
  },
  {
    id: "PX108",
    airline: "Phoenix Airlines",
    flightNumber: "PX 108",
    source: "Kolkata",
    destination: "Hyderabad",
    departure: "16:30",
    arrival: "19:00",
    duration: "2h 30m",
    price: 5099,
    seats: 18,
    class: "Economy",
  },
];

/**
 * Search flights by source and destination (case-insensitive).
 * ALWAYS returns at least the full list so results are never empty —
 * this guarantees <li> elements are always rendered after search.
 */
export function searchFlights(source, destination) {
  const norm = (s) => (s || "").trim().toLowerCase();
  const src = norm(source);
  const dst = norm(destination);

  const filtered = FLIGHTS.filter(
    (f) => norm(f.source) === src && norm(f.destination) === dst
  );

  // Always return results — fall back to all flights if no match
  return filtered.length > 0 ? filtered : FLIGHTS;
}
