import React from "react";
import "./MembersHeader.css";

export default function MembersHeader() {
  return (
    <div className="header-container">
      
      {/* Analytics Badge */}
      <div className="analytics-badge">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" x2="12" y1="20" y2="10"></line>
          <line x1="18" x2="18" y1="20" y2="4"></line>
          <line x1="6" x2="6" y1="20" y2="16"></line>
        </svg>
        <span>Analytics Dashboard</span>
      </div>

      {/* Main Heading */}
      <h1 className="main-heading">Members Report</h1>

      {/* Subheading */}
      <p className="subheading">Manage and filter Members</p>
    </div>
  );
}
