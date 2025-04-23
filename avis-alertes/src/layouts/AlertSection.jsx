import { useEffect, useState } from "react";
import AlertList from "../components/AlertList";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import fetchAlerts from "../data/api";
import { parseDate, isWithin, isAfter, isBefore } from "../utils/date";
import SubscribeSection from "./SubscribeSection";
import ActiveSearchAndFiltersSection from "./ActiveSearchAndFiltersSection";

function AlertSection() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    async function getAlerts() {
      setLoading(true);
      const data = await fetchAlerts();
      console.log('Fetch alerts:', data);

      if (data.length > 0) {
        setAlerts(data);
        setFilteredAlerts(data)
      }
      setLoading(false);
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
      <ActiveSearchAndFiltersSection
        activeQuery={searchQuery}
        activeDistrict={selectedDistrict}
        activeStartDate={selectedStartDate}
        activeEndDate={selectedEndDate}
        activeSubject={selectedSubject}
        clearQuery={() => setSearchQuery("")}
        clearDistrict={() => setSelectedDistrict("")}
        clearStartDate={() => setSelectedStartDate("")}
        clearEndDate={() => setSelectedEndDate("")}
        clearSubject={() => setSelectedSubject("")}
        clearAll={() => {
          setSearchQuery("");
          setSelectedDistrict("");
          setSelectedStartDate("");
          setSelectedEndDate("");
          setSelectedSubject("");
        }}
      />

      <div className="alert-subscribe-section">
        <section className="alert-subscribe">
          <div className="alertSection">
            {loading ? (
              <div className="loading">Chargement des alertes...</div>
            ) : (
              <AlertList alerts={filteredAlerts} />
            )}
          </div>
          <SubscribeSection />
        </section>
      </div>
    </>
  )
}

export default AlertSection;