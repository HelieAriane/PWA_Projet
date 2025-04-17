import { Link } from "react-router-dom";
import { toDateWithDayString, toTimeString } from "../utils/date";
import calendarIcon from "../assets/calendar_icon.svg"
import timeIcon from "../assets/time_icon.svg"

// Extraire la date de l'url
export const extractDateFromUrl = (url) => {
  const regex = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/; //(YYYY)(MM)(DD)(hh)(mm)(ss)
  const match = url.match(regex);
  if (match) {
    const dateStr = `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}`
    return new Date(dateStr);
  }
  return null;
}

function AlertList({ alerts }) {
  return (
    <div className="alert-list">
      {alerts.length > 0 ? (
        alerts.map((alert) => {
          const dateFromLink = extractDateFromUrl(alert.lien);
          const formattedDate = dateFromLink ? toDateWithDayString(dateFromLink) : "Date inconnue";
          const formattedTime = dateFromLink ? toTimeString(dateFromLink) : "Heure inconnue";

          return (
            <Link key={alert._id} to={`/alertDetail/${alert._id}`} className="alert">
              <h2>{alert.titre}</h2>
              <div className="alert-info">
                <div className="subject">{alert.type}</div>
                <div className="date-time">
                  <span className="calendar">
                    <img src={calendarIcon} className="calendar-icon-image" />
                    {formattedDate}
                  </span>
                  <span className="time">
                    <img src={timeIcon} className="time-icon-image" />
                    {formattedTime}
                  </span>
                </div>
              </div>
            </Link>
          )
        })
      ) : (
        <div className="alert-list-empty">
          <p className="alert">Votre recherche ne donne aucun résultat.</p>
        </div>
      )}
    </div>
  )
}

export default AlertList;