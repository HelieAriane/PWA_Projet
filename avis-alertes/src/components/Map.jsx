import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ geometry }) {
  let latLng = [45.5017, -73.5673]; // Coordonnées par défaut (Montréal)

  if (geometry) {
    const { type, coordinates } = geometry;
    switch (type) {
      case 'Point':
        latLng = [coordinates[1], coordinates[0]];
        break;
      case 'LineString':
        latLng = [coordinates[0][1], coordinates[0][0]];
        break;
      case 'Polygon':
        latLng = [coordinates[0][0][1], coordinates[0][0][0]];
        break;
      default:
        break;
    }
  }
  console.log("GeoJSON geometry:", geometry);

  return (
    <div className="alert-item-map">
      <MapContainer center={latLng} zoom={16} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={{ type: "Feature", geometry: geometry }} style={{ color: '#e30003', weight: 3 }} />
      </MapContainer>
    </div>
  )
}

export default Map;