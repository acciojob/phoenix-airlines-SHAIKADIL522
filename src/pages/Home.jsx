import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Welcome to Flight Booking App</h1>
      <button onClick={() => history.push("/flight-search")}>
        Book a Flight
      </button>
    </div>
  );
};

export default Home;