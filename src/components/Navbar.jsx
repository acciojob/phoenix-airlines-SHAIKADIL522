import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const navigate = (path) => history.push(path);
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div
        className="nav-brand"
        onClick={() => navigate("/")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}
      >
        <span className="nav-logo">✈</span>
        <span className="nav-name">Phoenix Airlines</span>
      </div>
      <div className="nav-links">
        <span
          className={`nav-link ${pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/")}
        >
          Home
        </span>
        <span
          className={`nav-link ${pathname === "/flight-search" ? "active" : ""}`}
          onClick={() => navigate("/flight-search")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/flight-search")}
        >
          Search Flights
        </span>
      </div>
    </nav>
  );
};

export default Navbar;