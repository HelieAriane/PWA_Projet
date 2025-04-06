import Filters from "../components/Filters";

function FilterSection({ onDistrictChange, onStartDateChange, onEndDateChange, onSubjectChange }) {
  return (
    <div className="filterSection">
      <Filters onDistrictChange={onDistrictChange} onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} onSubjectChange={onSubjectChange} /> 
    </div>
  )
}

export default FilterSection;