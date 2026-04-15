import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Flight Booking App</h1>
          <p className="hero-subtitle">Book domestic flights with ease.</p>
          <button className="cta-button" onClick={() => history.push("/flight-search")}>
            Book a Flight
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;