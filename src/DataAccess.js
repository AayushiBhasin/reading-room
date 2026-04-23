// dataService.js
import { db } from "./firebase";
import { ref, get } from "firebase/database";

/**
 * Fetch all members
 * Clean conversion:
 * - Convert to array
 * - Convert dates to JS Date()
 * - Convert dueAmount to Number
 * - id = phone
 */
export const getAllMembers = async () => {
  const membersRef = ref(db, "Members/");
  const snapshot = await get(membersRef);

  if (!snapshot.exists()) return [];

  const rawData = snapshot.val();

  const membersArray = Object.entries(rawData).map(([phone, member]) => ({
    id: phone,
    name: member.name || "",
    phone: member.phone || "",
    shift: member.shift || "",
    dueAmount: Number(member.dueAmount) || 0,
    joiningDate: member.joiningDate ? new Date(member.joiningDate) : null,
    endingDate: member.endingDate ? new Date(member.endingDate) : null,
  }));

  return membersArray;
};
