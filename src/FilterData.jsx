import { useEffect, useState } from "react";
import { getAllMembers } from "./DataAccess";
import MemberCard from "./membercard";

export default function FilterData({ selectedFilter }) {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  // 1️⃣ FETCH MEMBERS FROM DATA ACCESS FILE 
  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getAllMembers();
      setMembers(data);
    };

    fetchMembers();
  }, []);

  // 2️⃣ FILTER MEMBERS BASED ON SELECTED FILTER
  useEffect(() => {
    if (members.length === 0) return;

    let filtered = [];

    switch (selectedFilter) {
      case "Active Members":
        filtered = members.filter(
          (m) => m.endingDate && new Date(m.endingDate) >= new Date()
        );
        break;

      case "Inactive Members":
        filtered = members.filter(
          (m) => m.endingDate && new Date(m.endingDate) < new Date()
        );
        break;

      case "Due Amount":
        filtered = members.filter((m) => m.dueAmount > 0);
        break;

      default:
        filtered = members;
    }

    setFilteredMembers(filtered);
  }, [selectedFilter, members]);

  return (
    <div style={{ marginTop: "20px" }}>
      <MemberCard members={filteredMembers} />
    </div>
  );
}
