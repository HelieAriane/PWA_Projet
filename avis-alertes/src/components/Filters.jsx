import { useState } from "react";

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

function Filters({ onDistrictChange, onStartDateChange, onEndDateChange, onSubjectChange }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="filters">
      <div className="filter-options">
        <select id="districts" onChange={(e) => onDistrictChange(e.target.value)}>
          <option value={""}>Arrondissement</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
      </div>

      <div className="filter-dates">
        <label htmlFor="">
          De: <input type="date" name="startDate" id="startDate" onChange={(e) => { setStartDate(e.target.value); onStartDateChange(e.target.value) }} value={startDate} />
        </label>
      </div>

      <div className="filter-dates">
        <label htmlFor="">
          À: <input type="date" name="endDate" id="endDate" onChange={(e) => { setEndDate(e.target.value); onEndDateChange(e.target.value) }} value={endDate} />
        </label>
      </div>

      <div className="filter-options">
        <select id="subjects" onChange={(e) => onSubjectChange(e.target.value)}>
          <option value={""}>Sujet</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </div>
    </div >
  )
}

export default Filters;