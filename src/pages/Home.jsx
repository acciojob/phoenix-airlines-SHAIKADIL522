import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const navigate = (path) => history.push(path);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="airline-badge">✈ Phoenix Airlines</div>
          <h1 className="hero-title">
            Fly Beyond
            <br />
            <span className="hero-accent">Every Horizon</span>
          </h1>
          <p className="hero-subtitle">
            Book domestic flights with ease. Seamless journeys, exceptional
            value.
          </p>
          <button
            className="cta-button"
            onClick={() => navigate("/flight-search")}
          >
            Book a Flight
          </button>
        </div>
      </section>

      {/* Features */}
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