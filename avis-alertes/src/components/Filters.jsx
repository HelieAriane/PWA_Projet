import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

function Filters() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  
  return (
    <div className="filters">
      <div className="filter-options">
        <select id="districts" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
          <option value={""}>Arrondissement</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <div className="filter-options">
        <DatePicker selected={selectedDate} placeholderText="Date" onChange={(date) => setSelectedDate(date)}></DatePicker>
      </div>
      <div className="filter-options">
        <select id="subjects" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value={""}>Sujet</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filters;