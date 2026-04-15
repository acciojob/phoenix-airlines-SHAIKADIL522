import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import store from "../store/store";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import FlightSearch from "../pages/FlightSearch";
import FlightBooking from "../pages/FlightBooking";
import Confirmation from "../pages/Confirmation";
import "./../styles/App.css";
import { applyMiddleware } from "@reduxjs/toolkit";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Navbar />
          <main className="main-content">
            <Switch>

              {/* ✅ FIXED DEFAULT ROUTE */}
              <Route exact path="/" component={Home} />

              <Route path="/flight-search" component={FlightSearch} />
              <Route path="/flight-booking" component={FlightBooking} />
              <Route path="/confirmation" component={Confirmation} />

              {/* fallback (important for Cypress stability) */}
              <Redirect to="/" />

            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
  );
};

export default App;