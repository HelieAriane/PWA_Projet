import { Link } from "react-router-dom";

function AlertList({ alerts }) {
  return (
    <div className="alert-list">
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <div key={alert._id}>
            <h2>{alert.titre}</h2>
            <Link to={`/alert/${alert._id}`}>Voir plus</Link>
          </div>
        ))
      ) :(
        <p>Aucune alerte trouvée</p>
      )}
    </div>
  )
}

export default AlertList;