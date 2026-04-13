import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="airline-badge">✈ Phoenix Airlines</div>
          {/* Cypress test looks for this exact text */}
          <h1 className="hero-title">Flight Booking App</h1>
          <p className="hero-subtitle">
            Book domestic flights with ease. Seamless journeys, exceptional value.
          </p>
          <button
            className="cta-button"
            onClick={() => history.push("/flight-search")}
          >
            Book a Flight
          </button>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🛫</span>
            <h3>One-Way &amp; Round Trips</h3>
            <p>Flexible booking for every travel plan.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💺</span>
            <h3>Instant Confirmation</h3>
            <p>Get your booking ID in seconds.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Secure Booking</h3>
            <p>Your data is always protected.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;