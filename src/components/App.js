import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "../store/store";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import FlightSearch from "../pages/FlightSearch";
import FlightBooking from "../pages/FlightBooking";
import Confirmation from "../pages/Confirmation";
import "./../styles/App.css";

const App = () => {
  return (
    <Provider store={store}>
      {/* Do not remove the main div */}
      <div>
        <Router>
          <Navbar />
          <main className="main-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/flight-search" component={FlightSearch} />
              <Route path="/flight-booking" component={FlightBooking} />
              <Route path="/confirmation" component={Confirmation} />
            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
  );
};

export default App;