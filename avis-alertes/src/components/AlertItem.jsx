import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchAlerts from "../data/api";

function AlertItem({ alerts }) {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const data = await fetchAlerts();
      console.log('Fetch alerts:', data);

      const foundAlert = data.find(item => item.id === id);

      console.log('Found alert:', foundAlert);
      setAlert(foundAlert);
    }
    fetchData();
  }, [id]);
  
  if (!alert) {
    return <h2>Aucune alerte trouvée</h2>
  }

  return (
    <div className="alert-item">
      <div className="alert-info">
        <h1>{alert.titre}</h1>
        <strong>Date: {alert.date_debut}</strong> <br />
        <strong>Type: {alert.type}</strong> <br />
      </div>
    </div>
  )
}

export default AlertItem;