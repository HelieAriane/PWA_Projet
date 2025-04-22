import { toDateString } from "../utils/date";

function ActiveSearchAndFilters({
  activeQuery,
  activeDistrict,
  activeStartDate,
  activeEndDate,
  activeSubject,
  clearQuery,
  clearDistrict,
  clearStartDate,
  clearEndDate,
  clearSubject,
  clearAll
}) {
  const hasActiveFilters = activeQuery || activeDistrict || activeStartDate || activeEndDate || activeSubject;

  if (!hasActiveFilters) {
    return null;
  }

  const formatDateRange = () => {
    if (activeStartDate && activeEndDate) {
      return `Du ${toDateString(activeStartDate)} au ${toDateString(activeEndDate)}`;
    }
    return "";
  };

  const dateRange = formatDateRange();

  return (
    <div className="active-search-and-filters">
      <div className="active-search-and-filters-item">
        {activeQuery && (
          <div className="active-item">
            <span>{activeQuery}</span>
            <button onClick={clearQuery} className="remove-button">x</button>
          </div>
        )}
        {activeDistrict && (
          <div className="active-item">
            <span>{activeDistrict}</span>
            <button onClick={clearDistrict} className="remove-button">x</button>
          </div>
        )}
        {dateRange && (
          <div className="active-item">
            <span>{dateRange}</span>
            <button onClick={() => { clearStartDate(), clearEndDate() }} className="remove-button">x</button>
          </div>
        )}
        {activeSubject && (
          <div className="active-item">
            <span>{activeSubject}</span>
            <button onClick={clearSubject} className="remove-button">x</button>
          </div>
        )}
        <button onClick={clearAll} className="remove-all-button">Tout effacer</button>
      </div>
    </div>
  );
};

export default ActiveSearchAndFilters;