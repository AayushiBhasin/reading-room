import React, { useState } from "react";
import EditMemberModal from "./EditMemberModal";
import "./membercard.css";

export default function MemberCard({ members }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d)) return "Invalid Date";
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openEdit = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  return (
    <>
      <div className="member-list">
        {members.map((member, index) => {
          const expiry = new Date(member.endingDate);
          const isExpired = expiry < today;
          const statusColor =
            member.dueAmount > 0 || isExpired ? "red-border" : "green-border";

          return (
            <div key={member.phone} className={`member-card ${statusColor}`}>
              {/* ===== HEADER ===== */}
              <div className="mc-header">
                <div>
                  <h2 className="mc-name">
                    {member.name} <span className="mc-dot"></span>
                  </h2>
                  <p className="mc-phone">+91 {member.phone}</p>
                </div>

                <div>
                  <div className="mc-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* ===== INFO GRID ===== */}
              <div className="mc-info-grid">
                <div>
                  <p className="mc-label">Joined</p>
                  <p className="mc-value">{formatDate(member.joiningDate)}</p>
                </div>

                <div>
                  <p className="mc-label">Expires</p>
                  <p className="mc-value">{formatDate(member.endingDate)}</p>
                </div>

                <div>
                  <p className="mc-label">Shift</p>
                  <p className="mc-value">{member.shift}</p>
                </div>
              </div>

              {/* ===== DUE + EDIT BUTTON ===== */}
              <div className="mc-due-row">
                <span className="mc-due">
                  Amount Due: ₹{member.dueAmount}
                </span>

                <button className="edit-btn" onClick={() => openEdit(member)}>
                  ✏️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <EditMemberModal member={selectedMember} onClose={closeModal} />
      )}
    </>
  );
}
