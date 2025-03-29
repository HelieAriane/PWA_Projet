import SearchBar from "../components/SearchBar";
import searchIcon from '../assets/search_icon.svg';

function SearchSection() {
  return (
    <div className="searchSection">
      <h1>Avis et alertes</h1>
      <p>Trouver un avis</p>
      <SearchBar icon={searchIcon} />
    </div>
  )
}

export default SearchSection;