import AlertItem from "./AlertItem";

function AlertList({ alerts }) {
  return (
    <div className="alert-list">
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <AlertItem key={alert._id} alert={alert}></AlertItem>
        ))
      ) :(
        <p>Aucune alerte trouvée</p>
      )}
    </div>
  )
}

export default AlertList;