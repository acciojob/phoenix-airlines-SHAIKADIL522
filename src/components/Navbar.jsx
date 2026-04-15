import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => history.push("/")} role="button" tabIndex={0}>
        <span className="nav-logo">✈</span>
        <span className="nav-name">Phoenix Airlines</span>
      </div>
      <div className="nav-links">
        <span
          className={`nav-link ${pathname === "/" ? "active" : ""}`}
          onClick={() => history.push("/")}
          role="button"
          tabIndex={0}
        >
          Home
        </span>
        <span
          className={`nav-link ${pathname === "/flight-search" ? "active" : ""}`}
          onClick={() => history.push("/flight-search")}
          role="button"
          tabIndex={0}
        >
          Search Flights
        </span>
      </div>
    </nav>
  );
};

export default Navbar;