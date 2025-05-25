import { saveInCache } from "../utils/cache";

const API_URL_JSON = "https://donnees.montreal.ca/api/3/action/datastore_search"
const RESOURCE_ID = "fc6e5f85-7eba-451c-8243-bdf35c2ab336"

// On lit l'URL du backend à partir d'une variable d’environnement Vite
const API_URL_BACKEND = import.meta.env.VITE_BACKEND_URL + "/api/alerts";

let DATA = [];

async function fetchAlerts() {
  //const url = `${API_URL_JSON}?resource_id=${RESOURCE_ID}&limit=${limit}`;
  try {
    const response = await fetch(API_URL_BACKEND);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const alerts = await response.json();

    saveInCache('data', alerts);

    DATA = alerts;

    return alerts
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchAlerts;