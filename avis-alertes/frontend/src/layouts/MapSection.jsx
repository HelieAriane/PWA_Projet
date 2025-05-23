import Map from "../components/Map";

function MapSection({ geometry }) {
  return (
    <div className="map-section">
      <h1>Emplacement</h1>
      <div className="map-container">
        <Map geometry={geometry} />
      </div>
    </div>
  );
}

export default MapSection;