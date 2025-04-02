import { saveInCache } from "../utils/cache";

const API_URL = "https://donnees.montreal.ca/api/3/action/datastore_search"
const RESOURCE_ID = "fc6e5f85-7eba-451c-8243-bdf35c2ab336"

let DATA = [];

async function fetchAlerts(limit = 20) {
  const url = `${API_URL}?resource_id=${RESOURCE_ID}&limit=${limit}`;
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      saveInCache('data', json.result.records);

      DATA = json.result.records;

      return json.result.records;
  } catch (error) {
      console.error(error);
      return [];
  }
}

export default fetchAlerts;