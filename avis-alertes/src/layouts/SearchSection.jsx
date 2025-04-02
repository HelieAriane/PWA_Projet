import { useState } from "react";
import SearchBar from "../components/SearchBar";
import searchIcon from '../assets/search_icon.svg';

function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")

  function handleSearch(query) {
    setSearchQuery(query);
    console.log("Recherche: ", query)
  }

  return (
    <div className="searchSection">
      <h1>Avis et alertes</h1>
      <p>Trouver un avis</p>
      <SearchBar icon={searchIcon} onSearch={handleSearch} />
      {searchQuery && <p>{searchQuery}</p>}
    </div>
  )
}

export default SearchSection;