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
  const hasActiveFilters = activeQuery || (activeDistrict && activeDistrict.length > 0) || activeStartDate || activeEndDate || (activeSubject && activeSubject.length > 0);

  if (!hasActiveFilters) {
    return null;
  }

  const removeDistrict = (district) => {
    const updatedDistricts = activeDistrict.filter((d) => d !== district);
    onDistricChange(updatedDistricts);
  };

  const removeSubject = (subject) => {
    const updatedSubjects = activeSubject.filter((s) => s !== subject); 
    onSubjectChange(updatedSubjects);
  };

  const formatDateRange = () => {
    if (activeStartDate && activeEndDate) {
      return `Du ${(activeStartDate)} au ${(activeEndDate)}`;
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
            <button onClick={clearQuery} className="remove-button">✕</button>
          </div>
        )}
        {activeDistrict && activeDistrict.map((district, index) => (
          <div key={`district-${index}`} className="active-item">
            <span>
              {district}
            </span>
            <button 
              onClick={() => {
                const newDistricts = activeDistrict.filter(d => d !== district);
                clearDistrict(newDistricts);
              }} 
              className="remove-button"
            >
              ✕
            </button>
          </div>
        ))}
        {dateRange && (
          <div className="active-item">
            <span>{dateRange}</span>
            <button onClick={() => { clearStartDate(), clearEndDate() }} className="remove-button">✕</button>
          </div>
        )}
        {activeSubject && activeSubject.map((subject, index) => (
          <div key={`subject-${index}`} className="active-item">
            <span>
              {subject}
            </span>
            <button 
              onClick={() => {
                const newSubjects = activeSubject.filter(d => d !== subject);
                clearSubject(newSubjects);
              }} 
              className="remove-button"
            >
              ✕
            </button>
          </div>
        ))}
        <button onClick={clearAll} className="remove-all-button">Tout effacer</button>
      </div>
    </div>
  );
};

export default ActiveSearchAndFilters;