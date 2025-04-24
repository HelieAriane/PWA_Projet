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
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

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

    if (selectedDistricts.length > 0) {
      filtered = filtered.filter((alert) =>
        selectedDistricts.includes(alert.arrondissement)
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

    if (selectedSubjects.length > 0) {
      filtered = filtered.filter((alert) =>
        selectedSubjects.includes(alert.type)
      );
    }

    console.log("Filtering with criteria:", {
      searchQuery,
      selectedDistricts,
      selectedStartDate,
      selectedEndDate,
      selectedSubjects
    });

    setFilteredAlerts(filtered);
  }, [searchQuery, selectedDistricts, selectedStartDate, selectedEndDate, selectedSubjects, alerts]);

  const handleDistrictUpdate = (newDistricts) => {
    setSelectedDistricts(newDistricts);
  }

  const handleSubjectUpdate = (newSubjects) => {
    setSelectedSubjects(newSubjects);
  };
  return (
    <>
      <SearchSection onSearch={setSearchQuery} />
      <FilterSection 
        onDistrictChange={setSelectedDistricts} 
        onStartDateChange={setSelectedStartDate} 
        onEndDateChange={setSelectedEndDate} 
        onSubjectChange={setSelectedSubjects} 
        selectedDistricts={selectedDistricts}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        selectedSubjects={selectedSubjects}
      />
      <ActiveSearchAndFiltersSection
        activeQuery={searchQuery}
        activeDistrict={selectedDistricts}
        activeStartDate={selectedStartDate}
        activeEndDate={selectedEndDate}
        activeSubject={selectedSubjects}
        clearQuery={() => setSearchQuery("")}
        clearDistrict={handleDistrictUpdate}
        clearStartDate={() => setSelectedStartDate("")}
        clearEndDate={() => setSelectedEndDate("")}
        clearSubject={handleSubjectUpdate}
        clearAll={() => {
          setSearchQuery("");
          setSelectedDistricts([]);
          setSelectedStartDate("");
          setSelectedEndDate("");
          setSelectedSubjects([]);
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