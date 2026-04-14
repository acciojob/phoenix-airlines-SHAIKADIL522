import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripType: "one-way",        // "one-way" | "round-trip"
  source: "",
  destination: "",
  departureDate: "",
  returnDate: "",
  searchResults: [],
  selectedFlight: null,
  booking: {
    name: "",
    email: "",
    phone: "",
  },
  confirmation: null,
};

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setTripType(state, action) {
      state.tripType = action.payload;
      if (action.payload === "one-way") {
        state.returnDate = "";
      }
    },
    setSource(state, action) {
      state.source = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setDepartureDate(state, action) {
      state.departureDate = action.payload;
    },
    setReturnDate(state, action) {
      state.returnDate = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload || [];
    },
    selectFlight(state, action) {
      state.selectedFlight = action.payload;
    },
    setBookingDetails(state, action) {
      state.booking = { ...state.booking, ...action.payload };
    },
    confirmBooking(state) {
      state.confirmation = {
        flight: state.selectedFlight,
        passenger: { ...state.booking },
        tripType: state.tripType,
        source: state.source,
        destination: state.destination,
        departureDate: state.departureDate,
        returnDate: state.returnDate,
        bookingId: `PX-${Date.now()}`,
        bookedAt: new Date().toISOString(),
      };
    },
    resetBooking(state) {
      return { ...initialState };
    },
  },
});

export const {
  setTripType,
  setSource,
  setDestination,
  setDepartureDate,
  setReturnDate,
  setSearchResults,
  selectFlight,
  setBookingDetails,
  confirmBooking,
  resetBooking,
} = flightSlice.actions;

export default flightSlice.reducer;