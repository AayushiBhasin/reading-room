import React, { useState } from "react";
import "./EditMemberModal.css";

import { db } from "./firebase";
import { ref, update, remove } from "firebase/database";

export default function EditMemberModal({ member, onClose }) {

  const formatForInput = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";

  const [form, setForm] = useState({
    ...member,
    joiningDate: formatForInput(member.joiningDate),
    endingDate: formatForInput(member.endingDate),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateMember = async () => {
    try {
      const memberRef = ref(db, `Members/${member.phone}`);

      await update(memberRef, {
        name: form.name,
        phone: form.phone,
        joiningDate: form.joiningDate,
        endingDate: form.endingDate,
        shift: form.shift,
        dueAmount: Number(form.dueAmount),
      });

      alert("Member updated successfully!");
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating member.");
    }
  };

  const deleteMember = async () => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const memberRef = ref(db, `Members/${member.phone}`);
      await remove(memberRef);

      alert("Member deleted successfully!");
      onClose();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting member.");
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-box small-box">

        <div className="edit-modal-header">
          <h2>Edit Member</h2>
          <button className="edit-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="edit-modal-body">

          <div className="edit-input-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="edit-input-group">
            <label>Phone</label>
            <input name="phone" value={form.phone}   readOnly onChange={handleChange} className="readonly-input" />
          </div>

          <div className="edit-input-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="edit-input-group">
            <label>Ending Date</label>
            <input
              type="date"
              name="endingDate"
              value={form.endingDate}
              onChange={handleChange}
            />
          </div>

          <div className="edit-input-group">
            <label>Shift</label>
            <input name="shift" value={form.shift} onChange={handleChange} />
          </div>

          <div className="edit-input-group">
            <label>Due Amount</label>
            <input
              name="dueAmount"
              value={form.dueAmount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="edit-modal-actions">
          <button className="save-btn" onClick={updateMember}>Update</button>
          <button className="delete-btn" onClick={deleteMember}>Delete</button>
        </div>

      </div>
    </div>
  );
}
