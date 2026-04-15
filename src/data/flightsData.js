export const FLIGHTS = [
  { id: "PX101", airline: "Phoenix Airlines", flightNumber: "PX 101", source: "Mumbai", destination: "New Delhi", departure: "06:00", arrival: "08:15", duration: "2h 15m", price: 4599, seats: 42, class: "Economy" },
  { id: "PX102", airline: "Phoenix Airlines", flightNumber: "PX 102", source: "New Delhi", destination: "Mumbai", departure: "09:30", arrival: "11:45", duration: "2h 15m", price: 4799, seats: 38, class: "Economy" },
  { id: "PX103", airline: "Phoenix Airlines", flightNumber: "PX 103", source: "Bengaluru", destination: "Chennai", departure: "07:45", arrival: "09:00", duration: "1h 15m", price: 2999, seats: 55, class: "Economy" },
  { id: "PX104", airline: "Phoenix Airlines", flightNumber: "PX 104", source: "Chennai", destination: "Bengaluru", departure: "14:00", arrival: "15:20", duration: "1h 20m", price: 3199, seats: 30, class: "Economy" },
  { id: "PX105", airline: "Phoenix Airlines", flightNumber: "PX 105", source: "Hyderabad", destination: "Kolkata", departure: "10:15", arrival: "12:45", duration: "2h 30m", price: 5299, seats: 22, class: "Economy" },
  { id: "PX106", airline: "Phoenix Airlines", flightNumber: "PX 106", source: "Kolkata", destination: "Hyderabad", departure: "16:30", arrival: "19:00", duration: "2h 30m", price: 5099, seats: 18, class: "Economy" },
  { id: "PX107", airline: "Phoenix Airlines", flightNumber: "PX 107", source: "Mumbai", destination: "Bengaluru", departure: "08:00", arrival: "09:45", duration: "1h 45m", price: 3799, seats: 60, class: "Economy" },
  { id: "PX108", airline: "Phoenix Airlines", flightNumber: "PX 108", source: "New Delhi", destination: "Hyderabad", departure: "11:00", arrival: "13:30", duration: "2h 30m", price: 4899, seats: 35, class: "Economy" },
];

export function searchFlights(source, destination) {
  const norm = (s) => (s || "").trim().toLowerCase();
  const filtered = FLIGHTS.filter(
    (f) => norm(f.source) === norm(source) && norm(f.destination) === norm(destination)
  );
  return filtered.length > 0 ? filtered : FLIGHTS;
}