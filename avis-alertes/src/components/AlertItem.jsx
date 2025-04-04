import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchAlerts from "../data/api";
import { toDateString, toTimeString } from "../utils/date";
import { extractDateFromUrl } from "./AlertList";
import SubscribeSection from "../layouts/SubscribeSection";
import Nav from "../layouts/Nav";

function AlertItem() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAlerts();
      console.log('Fetch alerts:', data);

      const foundAlert = data.find(item => item._id === Number(id));

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
      <div className="alert-item-header-subscribe">
        <div className="alert-item-header-nav">
          <div className="alert-item-nav">
            <Nav></Nav>
          </div>

          <div className="alert-item-header">
            <h1>{alert.titre}</h1>
            <p>Publié le {formattedDate} à {formattedTime}</p>
          </div>
        </div>

        <div className="alert-item-subscribe">
          <SubscribeSection></SubscribeSection>
        </div>
      </div>
      <div className="alert-item-info">
        <li>Sujet : {alert.type}</li>
        <li>À partir de {alert.date_debut}</li>
        <li>Retour à la normale prévue à {alert.date_fin}</li>
      </div>
    </div>
  )
}

export default AlertItem;