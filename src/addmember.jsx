import React, { useState } from "react";
import { db } from "./firebase";
import { ref as dbRef, set } from "firebase/database";
import "./addMember.css"; // IMPORT CSS

export default function AddMember() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shift, setShift] = useState("morning");
  const [dueAmount, setDueAmount] = useState(0);
  const [joiningDate, setJoiningDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberRef = dbRef(db, "Members/" + phone);

    await set(memberRef, {
      name,
      phone,
      shift,
      dueAmount: Number(dueAmount),
      joiningDate,
      endingDate,
    });

    alert("Member added successfully!");

    setName("");
    setPhone("");
    setShift("morning");
    setDueAmount(0);
    setJoiningDate("");
    setEndingDate("");
  };

  return <>
    <div className="center-container">
    <div className="form-wrapper">
      
      {/* SVG LOGO */}
      <div className="logo-box">
        <svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  className="book-icon"
  stroke="#3b82f6"
  fill="none"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M3 4h5a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H3z" />
  <path d="M21 4h-5a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h5z" />
</svg>
      </div>

      <h2 className="Add-title">Add Library Member</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter member name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            maxLength="10"
            placeholder="10-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Ending Date</label>
            <input
              type="date"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Due Amount (₹)</label>
          <input
            type="number"
            min="0"
            placeholder="Enter due amount"
            value={dueAmount}
            onChange={(e) => setDueAmount(e.target.value)}
          />
        </div>

        {/* SHIFT RADIO */}
        <div className="form-group">
          <label>Shift</label>
          <div className="radio-group">

            <label className="radio-item">
              <input
                type="radio"
                name="shift"
                value="morning"
                checked={shift === "morning"}
                onChange={() => setShift("morning")}
              />
              <span>Morning</span>
            </label>

            <label className="radio-item">
              <input
                type="radio"
                name="shift"
                value="evening"
                checked={shift === "evening"}
                onChange={() => setShift("evening")}
              />
              <span>Evening</span>
            </label>

            <label className="radio-item">
              <input
                type="radio"
                name="shift"
                value="full"
                checked={shift === "full"}
                onChange={() => setShift("full")}
              />
              <span>Full</span>
            </label>
          </div>
        </div>

        <button className="submit-btn">Add Member</button>
      </form>
    </div>
    </div>
 </>
}
