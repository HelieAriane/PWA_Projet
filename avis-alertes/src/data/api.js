import { saveInCache } from "../utils/cache";

const API_URL_JSON = "https://donnees.montreal.ca/api/3/action/datastore_search"
const RESOURCE_ID = "fc6e5f85-7eba-451c-8243-bdf35c2ab336"

const API_URL_GEOJSON = "https://donnees.montreal.ca/dataset/556c84af-aebf-4ca9-9a9c-2f246601674c/resource/d249e452-46f5-422f-91ae-898c98eea6cc/download/avis-alertes.geojson"

let DATA = [];

async function fetchAlerts(limit = 20) {
  //const url = `${API_URL_JSON}?resource_id=${RESOURCE_ID}&limit=${limit}`;
  try {
    const response = await fetch(API_URL_GEOJSON);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const alerts = json.features.map((feature, index) => ({
      ...feature.properties,
      geometry: feature.geometry,
      id: index
    }));

    saveInCache('data', alerts);

    DATA = alerts;

    return alerts.slice(0, limit);
  } catch (error) {
    console.error(error);
    return [];
  }
}

const API = {
  fetchAlerts,
  getAlerts() {
    return DATA;
  },
  find(id) {
    return DATA.find(item => item.id === id);
  }
}



export default fetchAlerts;