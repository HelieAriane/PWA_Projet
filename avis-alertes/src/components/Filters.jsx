import { useState, useEffect } from "react";

const districts = [
  "Ahuntsic-Cartierville",
  "Anjou",
  "Côte-des-Neiges–Notre-Dame-de-Grâce",
  "L'Île-Bizard–Sainte-Geneviève",
  "Lachine",
  "LaSalle",
  "Le Plateau-Mont-Royal",
  "Le Sud-Ouest",
  "Mercier–Hochelaga-Maisonneuve",
  "Montréal-Nord",
  "Outremont",
  "Pierrefonds-Roxboro",
  "Rivière-des-Prairies–Pointe-aux-Trembles",
  "Rosemont–La Petite-Patrie",
  "Saint-Laurent",
  "Saint-Léonard",
  "Verdun",
  "Ville-Marie",
  "Villeray–Saint-Michel–Parc-Extension"
];

const subjects = [
  "Circulation et transport",
  "Complexes sportifs",
  "Déchets et recyclage",
  "Déneigement",
  "Eau et aqueduc",
  "Parcs et bâtiments municipaux",
  "Séances publiques",
  "Stationnement",
  "Urgence"
];

function Filters({
  onDistrictChange,
  onStartDateChange,
  onEndDateChange,
  onSubjectChange,
  selectedDistricts = [],
  selectedStartDate = "",
  selectedEndDate = "",
  selectedSubjects = []
}) {
  const [districtOpen, setDistrictOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  const districtCount = selectedDistricts.length;
  const subjectCount = selectedSubjects.length;

  const handleDistrictChange = (district) => {
    const updatedDistricts = selectedDistricts.includes(district) ? selectedDistricts.filter(d => d !== district) : [...selectedDistricts, district];
    console.log("Updated districts:", updatedDistricts);
    onDistrictChange(updatedDistricts);
  };

  const handleSubjectChange = (subject) => {
    const updatedSubjects = selectedSubjects.includes(subject) ? selectedSubjects.filter(s => s !== subject) : [...selectedSubjects, subject];
    console.log("Updated subjects:", updatedSubjects);
    onSubjectChange(updatedSubjects);
  };

  const toggleDistrictDropdown = () => {
    setDistrictOpen(!districtOpen);
  };

  const toggleSubjectDropdown = () => {
    setSubjectOpen(!subjectOpen);
  };

  return (
    <div className="filters">
      <div className={`filter-options-dropdown ${districtCount > 0 ? "filter-selected" : ""}`}>
        <div className="filter-options-dropdown-button" onClick={toggleDistrictDropdown}>
          {districtCount > 0 ? `${districtCount ===1 ? "Arrondissement" : "Arrondissements"} (${districtCount})` : "Arrondissement"}
          <span className="arrow">{districtOpen ? "⮝" : "⮟"}</span>
        </div>
        {districtOpen && (
          <div className="filter-options-dropdown-list">
            {districts.map((district, index) => (
              <div key={index} className="filter-options-dropdown-item">
                <input type="checkbox" id={`district-${index}`} checked={selectedDistricts.includes(district)} onChange={() => handleDistrictChange(district)} />
                <label htmlFor={`district-${index}`}>{district}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`filter-dates ${selectedStartDate ? "filter-selected" : ""}`}>
        <label htmlFor="">
          De: <input type="date" name="startDate" id="startDate" onChange={(e) => onStartDateChange(e.target.value)} value={selectedStartDate} />
        </label>
      </div>

      <div className={`filter-dates ${selectedEndDate ? "filter-selected" : ""}`}>
        <label htmlFor="">
          À: <input type="date" name="endDate" id="endDate" onChange={(e) => onEndDateChange(e.target.value)} value={selectedEndDate} />
        </label>
      </div>

      <div className={`filter-options-dropdown ${subjectCount > 0 ? "filter-selected" : ""}`}>
        <div className="filter-options-dropdown-button" onClick={toggleSubjectDropdown}>
          {subjectCount > 0 ? `${subjectCount ===1 ? "Sujet" : "Sujets"} (${subjectCount})` : "Sujet"}

          <span className="arrow">{subjectOpen ? "⮝" : "⮟"}</span>
        </div>
        {subjectOpen && (
          <div className="filter-options-dropdown-list">
            {subjects.map((subject, index) => (
              <div key={index} className="filter-options-dropdown-item">
                <input type="checkbox" id={`subject-${index}`} checked={selectedSubjects.includes(subject)} onChange={() => handleSubjectChange(subject)} />
                <label htmlFor={`subject-${index}`}>{subject}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Filters;