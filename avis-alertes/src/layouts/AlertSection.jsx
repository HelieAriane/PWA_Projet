import { useEffect, useState } from "react";
import AlertList from "../components/AlertList";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import fetchAlerts from "../data/api";
import { parseDate, isWithin, isAfter, isBefore } from "../utils/date";
import SubscribeSection from "./SubscribeSection";

function AlertSection() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    async function getAlerts() {
      const data = await fetchAlerts();
      console.log('Fetch alerts:', data);

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

    if (selectedStartDate && selectedEndDate) {
      const parseStartDate = parseDate(selectedStartDate);
      const parseEndDate = parseDate(selectedEndDate);

      if (isBefore(parseStartDate, parseEndDate)) {
        alert("Assurez-vous que la date de fin est supérieure à la date de début");
      } else {
        filtered = filtered.filter((alert) =>
          isWithin(alert.date_debut, parseEndDate, parseStartDate)
        );
      }
    }

    if (selectedSubject) {
      filtered = filtered.filter((alert) =>
        alert.type === selectedSubject
      );
    }

    setFilteredAlerts(filtered);
  }, [searchQuery, selectedDistrict, selectedStartDate, selectedEndDate, selectedSubject, alerts]);

  return (
    <>
      <SearchSection onSearch={setSearchQuery} />
      <FilterSection onDistrictChange={setSelectedDistrict} onStartDateChange={setSelectedStartDate} onEndDateChange={setSelectedEndDate} onSubjectChange={setSelectedSubject} />

      <div className="alert-subscribe-section">
        <section className="alert-subscribe">
          <div className="alertSection">
            <AlertList alerts={filteredAlerts} />
          </div>
          <SubscribeSection />
        </section>
      </div>
    </>
  )
}

export default AlertSection;