import Filters from "../components/Filters";

function FilterSection({
  onDistrictChange,
  onStartDateChange,
  onEndDateChange,
  onSubjectChange,
  selectedDistricts = [],
  selectedStartDate,
  selectedEndDate,
  selectedSubjects = [],
}) {

  return (
    <div className="filterSection">
      <Filters
        onDistrictChange={onDistrictChange}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onSubjectChange={onSubjectChange}
        selectedDistricts={selectedDistricts}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        selectedSubjects={selectedSubjects}
      />
    </div>
  )
}

export default FilterSection;