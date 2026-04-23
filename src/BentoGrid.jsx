import { useEffect, useState } from "react";
import { Users, DollarSign } from "lucide-react";
import { getAllMembers } from "./DataAccess";  // <-- IMPORTANT
import { IndianRupee } from "lucide-react";



import "./BentoGrid.css";

const Card = ({ className = "", children }) => (
  <div className={`card ${className}`}>{children}</div>
);

export default function BentoGrid() {
  const [members, setMembers] = useState([]);

  // 1️⃣ Fetch all members from DataAccess file
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMembers();
      setMembers(data);
    };

    fetchData();
  }, []);

  // 2️⃣ Compute all values
  const totalMembers = members.length;

  const today = new Date();

  const activeMembers = members.filter(
    (m) => new Date(m.endingDate) >= today
  ).length;

  const totalDueAmount = members.reduce(
    (sum, m) => sum + (m.dueAmount || 0),
  0);

  return (
    <div
      className="bento-grid"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
      }}
    >
      {/* Total Members */}
      <Card className="card-members">
        <div className="members-container">
          <div className="title-row">
            <div className="icon-box blue-bg">
              <Users className="icon-blue" />
            </div>
            <h3 className="sub-title">Total Members</h3>
          </div>

          <div className="content-box" style={{ marginTop: "20px" }}>
            <p className="big-number">{totalMembers}</p>
          </div>
        </div>
      </Card>

      {/* Active Members */}
      <Card className="card-active">
        <div className="members-container">
          <div className="title-row">
            <div className="icon-box green-bg">
              <Users className="icon-green" />
            </div>
            <h3 className="sub-title">Active Members</h3>
          </div>

          <div className="content-box" style={{ marginTop: "20px" }}>
            <p className="big-number">{activeMembers}</p>
          </div>
        </div>
      </Card>

      {/* Total Due Amount */}
      <Card className="card-dues">
        <div className="dues-container">
          <div className="title-row">
            <div className="icon-box red-bg">
          <IndianRupee className="icon-red" />

            </div>
            <h3 className="sub-title">Due Amount</h3>
          </div>

          <div className="due-total" style={{ marginTop: "20px" }}>
            <p className="big-number">₹{totalDueAmount}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
