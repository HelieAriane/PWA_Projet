import { useEffect, useState } from "react";
import AlertList from "../components/AlertList";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import fetchAlerts from "../data/api";
import { parseDate, isWithin, isAfter, isBefore } from "../utils/date";
import SubscribeSection from "./SubscribeSection";
import ActiveSearchAndFiltersSection from "./ActiveSearchAndFiltersSection";
import PaginationSection from "./PaginationSection";

function AlertSection() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [displayedAlerts, setDisplayedAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function getAlerts() {
      setLoading(true);
      const data = await fetchAlerts();
      console.log('Fetch alerts:', data);

      if (data.length > 0) {
        setAlerts(data);
        setFilteredAlerts(data)
      }
      setLoading(true);
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
      filtered = filtered.filter((alert) =>{
        const alertTitle = alert.titre.toLowerCase();
        return selectedDistricts.some((district) =>
          alertTitle.includes(district.toLowerCase())
        );
      });
    }

    if (selectedStartDate && selectedEndDate) {
      const parseStartDate = parseDate(selectedStartDate);
      const parseEndDate = parseDate(selectedEndDate);

      if (isAfter(parseStartDate, parseEndDate)) {
        alert("Assurez-vous que la date de fin est supérieure à la date de début");
      } else {
        filtered = filtered.filter((alert) =>
          isWithin(alert.date_debut, parseStartDate, parseEndDate)
        );
      }
    }

    if (selectedSubjects.length > 0) {
      filtered = filtered.filter((alert) =>
        selectedSubjects.includes(alert.type)
      );
    }

    setFilteredAlerts(filtered);
    
    setCurrentPage(1);
  }, [searchQuery, selectedDistricts, selectedStartDate, selectedEndDate, selectedSubjects, alerts]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedAlerts(filteredAlerts.slice(startIndex, endIndex));
  }, [filteredAlerts, currentPage]);

  const handleDistrictUpdate = (newDistricts) => {
    setSelectedDistricts(newDistricts);
  }

  const handleSubjectUpdate = (newSubjects) => {
    setSelectedSubjects(newSubjects);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.documentElement.scrollTop = 0;
  };

  const totalItems = filteredAlerts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const firstAlertIndex = totalItems === 0 ? 0: (currentPage - 1) * itemsPerPage + 1;
  const lastAlertIndex = Math.min(currentPage * itemsPerPage, totalItems);

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
            <div className="alert-per-page-and-total">
              {firstAlertIndex} à {lastAlertIndex} sur {totalItems} résultats
            </div>
            {loading ? (
              <div className="loading">Chargement des alertes...</div>
            ) : (
              <div>
                <AlertList alerts={displayedAlerts} />
                {filteredAlerts.length > 0 && (
                  <PaginationSection
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={totalItems}
                  />
                )}
              </div>
            )}
          </div>
          <SubscribeSection />
        </section>
      </div>
    </>
  )
}

export default AlertSection;