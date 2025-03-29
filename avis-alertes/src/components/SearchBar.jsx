import React, { useState} from "react";

function SearchBar({ onSearch, icon }) {
  const [query, setQuery] = useState("");

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleSearch(event) {
    if (event.key === "Enter") {
      onSearch(query)
    }
  }

  return (
    <div className="search-bar">
      <img src={icon} alt="Rechercher" className="search-bar-icon" />
      <input type="text" placeholder="Que cherchez-vous?" value={query} onChange={handleInputChange} onKeyDown={handleSearch}/>
    </div>
  );
}

export default SearchBar;