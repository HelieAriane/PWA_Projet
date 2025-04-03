import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchAlerts from "../data/api";
import { toDateString, toTimeString } from "../utils/date";
import { extractDateFromUrl } from "./AlertList";

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

  const dateFromLink = extractDateFromUrl(alert.lien);
  const formattedDate = dateFromLink ? toDateString(dateFromLink) : "Date inconnue";
  const formattedTime = dateFromLink ? toTimeString(dateFromLink) : "Heure inconnue";

  return (
    <div className="alert-item">
      <h1>{alert.titre}</h1>
      <strong>Publié le {formattedDate} à {formattedTime}</strong> <br />
      <strong>{alert.type}</strong> <br />
    </div>
  )
}

export default AlertItem;