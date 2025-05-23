import { useState} from "react";

function SearchBar({ icon, onSearch }) {
  const [query, setQuery] = useState("");

  function handleInputChange(event) {
    setQuery(event.target.value);
    onSearch(event.target.value);
  }


  return (
    <div className="search-bar">
      <img src={icon} alt="Rechercher" className="search-bar-icon" />
      <input type="text" placeholder="Que cherchez-vous?" value={query} onChange={handleInputChange} />
    </div>
  );
}

export default SearchBar;