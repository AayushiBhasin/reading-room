import React from "react";
import "./GreetingCard.css";

export default function GreetingCard() {
  return (
    <div className="greeting-card">
      <div className="greeting-content">
        <div className="gold-bar"></div>

        <div className="text-content">
          <p className="hello-text">Hello</p>
          <h1 className="morning-text">Good Morning</h1>
          {/* <p className="welcome-text">
            Welcome to <span className="institute-name">Oxford Academy</span>
          </p> */}
        </div>
      </div>
    </div>
  );
}
