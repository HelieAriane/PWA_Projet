import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchAlerts from "../data/api";
import { toDateWithDayString, toDateString, toTimeString } from "../utils/date";
import { extractDateFromUrl } from "./AlertList";
import SubscribeSection from "../layouts/SubscribeSection";
import Nav from "../layouts/Nav";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function AlertItem() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAlerts();
      console.log('Fetch alerts:', data);

      const foundAlert = data.find(item => item.id === Number(id));

      console.log('Found alert:', foundAlert);
      setAlert(foundAlert);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (!alert) {
    return <div className="error">Alerte introuvable</div>;
  }

  const dateFromLink = extractDateFromUrl(alert.lien);
  const formattedDate = dateFromLink ? toDateString(dateFromLink) : "Date inconnue";
  const formattedTime = dateFromLink ? toTimeString(dateFromLink) : "Heure inconnue";

  const formattedDateDebut = alert.date_debut ? toDateString(alert.date_debut) : "Date inconnue";
  const formattedTimeDebut = alert.date_debut ? toTimeString(alert.date_debut) : "Heure inconnue";

  const formattedDateFin = alert.date_fin ? toDateString(alert.date_fin) : "Date inconnue";
  const formattedTimeFin = alert.date_fin ? toTimeString(alert.date_fin) : "Heure inconnue";

  console.log('Formatted dates and times:', formattedDate, formattedTime, formattedDateDebut, formattedTimeDebut, formattedDateFin, formattedTimeFin);

  

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

          <div className="alert-item-info">
            <ul>
              <li>Sujet : {alert.type}</li>
              <li>À partir du {formattedDateDebut} à {formattedTimeDebut}</li>
              <li>Retour à la normale prévue le {formattedDateFin} à {formattedTimeFin}</li>
            </ul>
          </div>

          <div className="alert-item-map">
            <h1>Emplacement</h1>
             <MapContainer center={latLng} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker key={alert.id} position={latLng}>
                <Popup>
                  <h2>{alert.titre}</h2>
                  <p>{alert.description}</p>
                  <p>Publié le {formattedDate} à {formattedTime}</p>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="alert-item-subscribe">
          <SubscribeSection></SubscribeSection>
        </div>
      </div>

    </div>
  )
}

export default AlertItem;