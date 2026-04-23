import { useEffect, useState } from "react";
import { getAllMembers } from "./DataAccess"; 
import MemberCard from "./membercard";

export default function Searching({ query }) {
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    async function fetchAndFilter() {
      const allMembers = await getAllMembers();

      const result = allMembers.filter((member) =>
        member.name.toLowerCase().startsWith(query.toLowerCase())
      );

      setFilteredMembers(result);
    }

    fetchAndFilter();
  }, [query]);

  return <>
  <br />
  <MemberCard members={filteredMembers} />;
  </>
}
