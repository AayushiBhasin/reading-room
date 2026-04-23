import "./reportsection.css";
import { Search, Filter, Mic } from "lucide-react";
import { useState } from "react";
import Searching from "./Searching";
import FilterData from "./FilterData";

export default function Report() {
  const [isOpen, setIsOpen] = useState(false);

  // FILTER SELECTED
  const [selected, setSelected] = useState("Active Members");

  // SEARCH TEXT
  const [searchText, setSearchText] = useState("");

  // DROPDOWN TOGGLE
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // SELECT OPTION
  const selectOption = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="report-section">
        <div className="search-container">
        {/* SEARCH BOX */}
        <div className="search">
          <Search className="icon-left" />
          <input
            type="text"
            placeholder="Search members..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Mic className="icon-right" />
        </div>
      </div>
        {/* FILTER SECTION */}
        <div className="filter">
          <Filter className="filter-icon" />

          <div className="dropdown-custom">
            <button className="dropdown-btn" onClick={toggleDropdown}>
              {selected}
            </button>

            {isOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => selectOption("Active Members")}>
                  Active Members
                </li>
                <li className="dropdown-item" onClick={() => selectOption("Inactive Members")}>
                  Inactive Members
                </li>
                <li className="dropdown-item" onClick={() => selectOption("Due Amount")}>
                  Due Amount
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* DATA OUTPUT */}
      {searchText.length > 0 ? (
        <Searching query={searchText} />
      ) : (
        <FilterData selectedFilter={selected} />
      )}
    </>
  );
}
