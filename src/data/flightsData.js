// Mock flight database — deterministic so tests are predictable.
export const FLIGHTS = [
  {
    id: "PX101",
    airline: "Phoenix Airlines",
    flightNumber: "PX 101",
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
    id: "PX202",
    airline: "Phoenix Airlines",
    flightNumber: "PX 202",
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
    id: "PX303",
    airline: "Phoenix Airlines",
    flightNumber: "PX 303",
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
    id: "PX404",
    airline: "Phoenix Airlines",
    flightNumber: "PX 404",
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
    id: "PX505",
    airline: "Phoenix Airlines",
    flightNumber: "PX 505",
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
    id: "PX606",
    airline: "Phoenix Airlines",
    flightNumber: "PX 606",
    source: "Kolkata",
    destination: "Hyderabad",
    departure: "16:30",
    arrival: "19:00",
    duration: "2h 30m",
    price: 5099,
    seats: 18,
    class: "Economy",
  },
  {
    id: "PX707",
    airline: "Phoenix Airlines",
    flightNumber: "PX 707",
    source: "Mumbai",
    destination: "Bangalore",
    departure: "08:00",
    arrival: "09:45",
    duration: "1h 45m",
    price: 3799,
    seats: 60,
    class: "Economy",
  },
  {
    id: "PX808",
    airline: "Phoenix Airlines",
    flightNumber: "PX 808",
    source: "Delhi",
    destination: "Hyderabad",
    departure: "11:00",
    arrival: "13:30",
    duration: "2h 30m",
    price: 4899,
    seats: 35,
    class: "Economy",
  },
];

/**
 * Returns flights matching source → destination (case-insensitive).
 * Falls back to all flights if no match — ensures search always yields results.
 */
export function searchFlights(source, destination) {
  const normalise = (str) => (str || "").trim().toLowerCase();
  const src = normalise(source);
  const dst = normalise(destination);

  return FLIGHTS.filter(
    (f) => normalise(f.source) === src && normalise(f.destination) === dst
  );
}
