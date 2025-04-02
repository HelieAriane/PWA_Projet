import { useEffect, useState } from "react";
import AlertList from "../components/AlertList";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import fetchAlerts from "../data/api";
import { parseDate, isWithin, isAfter, isBefore } from "../utils/date";

function AlertSection() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
/*   const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState(""); */
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    async function getAlerts() {
      const data = await fetchAlerts();
      console.log('Fetch alerts:', data);
      console.log('Date:', data[0].date_debut);
      if (data.length > 0) {
        setAlerts(data);
        setFilteredAlerts(data)
      }
    }
    getAlerts();
  }, []);

  useEffect(() => {
    let filtered = alerts;

    if (searchQuery) {
      filtered = filtered.filter((alert) =>
        alert.titre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDistrict) {
      filtered = filtered.filter((alert) =>
        alert.titre.toLowerCase().includes(selectedDistrict.toLowerCase())
      );
    }

    /* const parseStartDate = parseDate(selectedStartDate);
    const parseEndDate = parseDate(selectedEndDate);

    if (selectedStartDate && selectedEndDate) {
      filtered = filtered.filter((alert) =>
        isWithin(alert.date_debut, parseStartDate, parseEndDate)
      );
    } else if (selectedStartDate) {
      filtered = filtered.filter((alert) =>
        isAfter(alert.date_debut, parseStartDate)
      );
    } else if (selectedEndDate) {
      filtered = filtered.filter((alert) =>
        isBefore(alert.date_debut, parseEndDate)
      );
    }
 */
    if (selectedSubject) {
      filtered = filtered.filter((alert) =>
        alert.type === selectedSubject
      );
    }

    setFilteredAlerts(filtered);
  }, [searchQuery, selectedDistrict, /* selectedStartDate, selectedEndDate, */ selectedSubject, alerts]);

  return (
    <div className="alertSection">
      <SearchSection onSearch={setSearchQuery} />
      <FilterSection onDistrictChange={setSelectedDistrict} /* onStartDateChange={setSelectedStartDate} onEndDateChange={setSelectedEndDate} */ onSubjectChange={setSelectedSubject} />
      <AlertList alerts={filteredAlerts} />
    </div>
  )
}

export default AlertSection;