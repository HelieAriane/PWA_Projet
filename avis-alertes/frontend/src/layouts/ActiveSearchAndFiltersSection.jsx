import { useState } from "react";
import ActiveSearchAndFilters from "../components/ActiveSearchAndFilters";

function ActiveSearchAndFiltersSection({
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
  clearAll,
}) {

  return (
    <div className="active-search-and-filters-section">
      <ActiveSearchAndFilters
        activeQuery={activeQuery}
        activeDistrict={activeDistrict}
        activeStartDate={activeStartDate}
        activeEndDate={activeEndDate}
        activeSubject={activeSubject}
        clearQuery={clearQuery}
        clearDistrict={clearDistrict}
        clearStartDate={clearStartDate}
        clearEndDate={clearEndDate}
        clearSubject={clearSubject}
        clearAll={clearAll}
      />
    </div>
  );
}

export default ActiveSearchAndFiltersSection;