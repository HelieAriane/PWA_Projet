import Filters from "../components/Filters";

function FilterSection({
  onDistrictChange,
  onStartDateChange,
  onEndDateChange,
  onSubjectChange,
  selectedDistrict,
  selectedStartDate,
  selectedEndDate,
  selectedSubject
}) {
  return (
    <div className="filterSection">
      <Filters
        onDistrictChange={onDistrictChange}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onSubjectChange={onSubjectChange}
        selectedDistrict={selectedDistrict}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        selectedSubject={selectedSubject}
      />
    </div>
  )
}

export default FilterSection;