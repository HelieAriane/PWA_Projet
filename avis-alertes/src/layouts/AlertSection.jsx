import { useEffect, useState } from "react";
import AlertList from "../components/AlertList";
import fetchAlerts from "../data/api";

function AlertSection() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function getAlerts() {
      const data = await fetchAlerts();
      console.log('Fetch alerts:', data);
      if (data.length > 0) {
        setAlerts(data);
      }
    }
    getAlerts();
  }, []);

  return (
    <div className="alertSection">
      <AlertList alerts={alerts} />
    </div>
  )
}

export default AlertSection;