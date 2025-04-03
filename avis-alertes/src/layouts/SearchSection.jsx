import { useState } from "react";
import SearchBar from "../components/SearchBar";
import searchIcon from '../assets/search_icon.svg';

function SearchSection({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("")

  function handleSearch(query) {
    setSearchQuery(query);
    onSearch(query)
    console.log("Recherche: ", query)
  }

  return (
    <div className="searchSection">
      <h1>Avis et alertes</h1>
      <p>Trouver un avis</p>
      <SearchBar icon={searchIcon} onSearch={handleSearch} />
    </div>
  )
}

export default SearchSection;